import { enviarCorreo } from "../../lib/sendEmail";
import { getStripe } from "../../lib/stripe";
import { getSupabaseAdmin } from "../../lib/supabaseAdmin";

function isReservationStoreUnavailable(error) {
  return ["42P01", "PGRST205"].includes(error.code) ||
    error.message?.includes("Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
}

export const config = {
  api: { bodyParser: false },
};

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

function escapeHtml(value = "") {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function formatBookingDate(fecha, hora) {
  return new Date(`${fecha}T${hora.slice(0, 5)}:00-05:00`).toLocaleString("es-PE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Lima",
  });
}

async function confirmPayment(session) {
  if (session.payment_status !== "paid") return;

  let supabase = null;
  let booking = null;
  try {
    supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("reservas")
      .select("id, fecha, hora, nombre, correo, telefono, mensaje, status, confirmation_sent_at")
      .eq("stripe_session_id", session.id)
      .maybeSingle();
    if (error) throw error;
    booking = data;
  } catch (error) {
    if (!isReservationStoreUnavailable(error)) throw error;
  }

  if (booking && booking.status !== "paid") {
    const { error } = await supabase
      .from("reservas")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("id", booking.id);
    if (error) throw error;
  }

  const stripe = getStripe();
  const latestSession = await stripe.checkout.sessions.retrieve(session.id);
  if (latestSession.metadata.confirmation_sent === "true") return;

  booking = booking || {
    fecha: session.metadata.date,
    hora: session.metadata.hour,
    nombre: session.metadata.name,
    correo: session.metadata.email,
    telefono: session.metadata.telefono,
    mensaje: "",
  };
  if (!booking.fecha || !booking.hora || !booking.nombre || !booking.correo) {
    throw new Error("La sesión pagada no contiene los datos de la reserva.");
  }

  const nombre = escapeHtml(booking.nombre);
  const correo = escapeHtml(booking.correo);
  const telefono = escapeHtml(booking.telefono);
  const fecha = escapeHtml(formatBookingDate(booking.fecha, booking.hora));
  const mensaje = booking.mensaje ? `<p>Nota: ${escapeHtml(booking.mensaje)}</p>` : "";

  await Promise.all([
    enviarCorreo({
      to: booking.correo,
      subject: "Confirmación de tu cita en Virtual Flow",
      html: `<h2>Hola, ${nombre}</h2><p>Tu pago fue confirmado y tu cita quedó reservada para el <strong>${fecha}</strong>.</p><p>Teléfono registrado: ${telefono}</p>${mensaje}<p>Equipo de Virtual Flow</p>`,
    }),
    enviarCorreo({
      to: "automatizaciondenegocios@gmail.com",
      subject: "Nueva cita pagada en Virtual Flow",
      html: `<h2>Nueva reserva confirmada</h2><p>Fecha: <strong>${fecha}</strong></p><p>Nombre: ${nombre}</p><p>Correo: ${correo}</p><p>Teléfono: ${telefono}</p>${mensaje}`,
    }),
  ]);

  await stripe.checkout.sessions.update(session.id, {
    metadata: { ...latestSession.metadata, confirmation_sent: "true" },
  });

  if (booking.id && supabase) {
    const { error } = await supabase
      .from("reservas")
      .update({ confirmation_sent_at: new Date().toISOString() })
      .eq("id", booking.id);
    if (error) throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(500).json({ error: "Falta configurar STRIPE_WEBHOOK_SECRET." });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      await getRawBody(req),
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Firma de webhook Stripe inválida:", error.message);
    return res.status(400).json({ error: "Firma no válida" });
  }

  try {
    if (event.type === "checkout.session.expired") {
      try {
        const { error } = await getSupabaseAdmin()
          .from("reservas")
          .update({ status: "expired" })
          .eq("stripe_session_id", event.data.object.id)
          .eq("status", "pending");
        if (error) throw error;
      } catch (error) {
        if (!isReservationStoreUnavailable(error)) throw error;
      }
    }

    if (["checkout.session.completed", "checkout.session.async_payment_succeeded"].includes(event.type)) {
      await confirmPayment(event.data.object);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error al procesar webhook Stripe:", error.message);
    return res.status(500).json({ error: "No se pudo procesar el evento." });
  }
}