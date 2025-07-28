// pages/api/success.js
import { enviarCorreo } from "../../lib/sendEmail";

export default async function handler(req, res) {
  const { name, date, hour, email, telefono } = req.query;

  try {
    if (!name || !date || !hour || !email) {
      return res.status(400).json({ message: "Faltan datos en la URL" });
    }

    const fechaFormato = new Date(`${date}T${hour}:00`).toLocaleString("es-PE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Lima",
    });

    // --- Correo al usuario
    const contenidoUsuario = `
      <h2>Hola, ${name} 👋</h2>
      <p>Tu cita ha sido agendada con éxito para el:</p>
      <p><strong>${fechaFormato}</strong></p>
      <p>📧 Se ha registrado tu correo: <strong>${email}</strong></p>
      <p>📞 Teléfono: <strong>${telefono || "No proporcionado"}</strong></p>
      <br/>
      <p>Nos pondremos en contacto contigo para confirmar cualquier detalle adicional.</p>
      <p>Gracias,<br><strong>Equipo de Virtual Flow</strong></p>
    `;

    // --- Correo al administrador
    const contenidoAdmin = `
      <h2>🔔 Nueva reserva recibida</h2>
      <p>📆 Fecha y hora: <strong>${fechaFormato}</strong></p>
      <p>👤 Nombre: ${name}</p>
      <p>📧 Correo: ${email}</p>
      <p>📞 Teléfono: ${telefono || "No proporcionado"}</p>
    `;

    // --- Enviar ambos correos
    await enviarCorreo({
      to: email, // solo usuario
      subject: "✅ Confirmación de cita en Virtual Flow",
      html: contenidoUsuario,
    });

    await enviarCorreo({
      to: "automatizaciondenegocios@gmail.com", // solo admin
      subject: "🔔 Nueva cita agendada",
      html: contenidoAdmin,
    });

    // Redireccionar a página de éxito con query visible
    res.redirect(
      302,
      `/success?name=${encodeURIComponent(name)}&date=${date}&hour=${hour}&email=${email}&telefono=${telefono}`
    );
  } catch (error) {
    console.error("Error en /api/success:", error);
    res.status(500).json({
      message: "Error al procesar la reserva",
      details: error.message,
    });
  }
}
