import { enviarCorreo } from "./sendEmail";
import { getStripe } from "./stripe";

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

export async function confirmBookingEmail(sessionId) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") {
    throw new Error("El pago aún no aparece confirmado.");
  }
  if (session.metadata.confirmation_sent === "true") return;

  const { name, date, hour, email, telefono } = session.metadata;
  if (!name || !date || !hour || !email) {
    throw new Error("La sesión pagada no contiene los datos de la reserva.");
  }

  const nombre = escapeHtml(name);
  const correo = escapeHtml(email);
  const telefonoSeguro = escapeHtml(telefono || "No proporcionado");
  const fecha = escapeHtml(formatBookingDate(date, hour));

  await Promise.all([
    enviarCorreo({
      to: email,
      subject: "Confirmación de tu cita en Virtual Flow",
      html: `<h2>Hola, ${nombre}</h2><p>Tu pago fue confirmado y tu cita quedó reservada para el <strong>${fecha}</strong>.</p><p>Teléfono registrado: ${telefonoSeguro}</p><p>Equipo de Virtual Flow</p>`,
    }),
    enviarCorreo({
      to: "automatizaciondenegocios@gmail.com",
      subject: "Nueva cita pagada en Virtual Flow",
      html: `<h2>Nueva reserva confirmada</h2><p>Fecha: <strong>${fecha}</strong></p><p>Nombre: ${nombre}</p><p>Correo: ${correo}</p><p>Teléfono: ${telefonoSeguro}</p>`,
    }),
  ]);

  await stripe.checkout.sessions.update(session.id, {
    metadata: { ...session.metadata, confirmation_sent: "true" },
  });
}