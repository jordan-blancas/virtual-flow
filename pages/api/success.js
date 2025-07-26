import { crearEvento } from "../../lib/calendar";
import { enviarCorreo } from "../../lib/sendEmail";

export default async function handler(req, res) {
  const { name, date, hour, email } = req.query;

  try {
    if (!name || !date || !hour || !email) {
      return res.status(400).json({ message: "Faltan datos en la URL" });
    }

    // Crear evento en Google Calendar (para ti)
    const evento = await crearEvento({ name, date, hour });

    // Enviar correo al cliente
    const asunto = "Confirmación de tu cita";
    const contenidoHtml = `
      <h2>¡Hola, ${name}!</h2>
      <p>Gracias por reservar tu cita.</p>
      <p><strong>Fecha:</strong> ${date}</p>
      <p><strong>Hora:</strong> ${hour}</p>
      <p>Nos vemos pronto.</p>
      <br/>
      <p><a href="${evento.htmlLink}" target="_blank" style="color: blue;">📅 Agregar a Google Calendar</a></p>
    `;

    await enviarCorreo({
      to: email,
      subject: asunto,
      html: contenidoHtml,
    });

    // Redirige al frontend para mostrar la página de confirmación
    res.redirect(302, `/success?name=${name}&date=${date}&hour=${hour}&email=${email}&telefono=${telefono}`);
  } catch (error) {
    console.error("Error en /api/success:", error);
    res.status(500).json({ message: "Error al procesar la reserva" });
  }
}
