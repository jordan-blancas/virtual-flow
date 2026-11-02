import { getSupabaseAdmin } from "../../lib/supabaseAdmin";
import { getStripe } from "../../lib/stripe";
import { generarDisponibilidad } from "../../lib/disponibilidad";

function isReservationStoreUnavailable(error) {
  return ["42P01", "PGRST205"].includes(error.code) ||
    error.message?.includes("Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { date, hour, name, email, telefono, message = "" } = req.body || {};
    const reserva = {
      date: typeof date === "string" ? date : "",
      hour: typeof hour === "string" ? hour : "",
      name: typeof name === "string" ? name.trim() : "",
      email: typeof email === "string" ? email.trim().toLowerCase() : "",
      telefono: typeof telefono === "string" ? telefono.trim() : "",
      message: typeof message === "string" ? message.trim().slice(0, 2000) : "",
    };
    const digits = reserva.telefono.replace(/\D/g, "");
    const disponibilidad = generarDisponibilidad();

    if (!reserva.name || reserva.name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reserva.email)) {
      return res.status(400).json({ error: "Revisa tu nombre y correo electrónico." });
    }
    if (digits.length < 8 || digits.length > 15) {
      return res.status(400).json({ error: "Ingresa un teléfono válido." });
    }
    if (!disponibilidad[reserva.date]?.includes(reserva.hour)) {
      return res.status(400).json({ error: "Ese horario no está disponible." });
    }
    if (new Date(`${reserva.date}T${reserva.hour}:00-05:00`).getTime() <= Date.now()) {
      return res.status(400).json({ error: "Elige una fecha y hora futuras." });
    }

    const stripe = getStripe();
    const expiresAt = Math.ceil(Date.now() / 1000) + 30 * 60;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
      `${req.headers["x-forwarded-proto"] || (req.headers.host?.includes("localhost") ? "http" : "https")}://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID || "price_1RoxobITly8YghZ7Hf5o8knM",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?reserva=cancelada#formulario`,
      expires_at: expiresAt,
      customer_email: reserva.email,
      metadata: {
        name: reserva.name,
        date: reserva.date,
        hour: reserva.hour,
        telefono: reserva.telefono,
        email: reserva.email,
      },
    });

    try {
      const supabase = getSupabaseAdmin();
      await supabase
        .from("reservas")
        .update({ status: "expired" })
        .eq("status", "pending")
        .lte("expires_at", new Date().toISOString());

      const { error } = await supabase.from("reservas").insert({
        fecha: reserva.date,
        hora: reserva.hour,
        nombre: reserva.name,
        correo: reserva.email,
        telefono: reserva.telefono,
        mensaje: reserva.message,
        status: "pending",
        stripe_session_id: session.id,
        expires_at: new Date(expiresAt * 1000).toISOString(),
      });

      if (error) throw error;
    } catch (storeError) {
      if (storeError.code === "23505") {
        await stripe.checkout.sessions.expire(session.id).catch(() => {});
        return res.status(409).json({ error: "Ese horario acaba de ser reservado. Elige otro." });
      }
      if (!isReservationStoreUnavailable(storeError)) throw storeError;
      console.warn("Reserva sin bloqueo compartido: falta configurar la tabla reservas.");
    }

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error en checkout:", error.message);
    return res.status(500).json({ error: "No se pudo iniciar el pago. Inténtalo de nuevo." });
  }
}

