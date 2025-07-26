import { crearEvento } from "../../lib/calendar";
import { enviarCorreo } from "../../lib/sendEmail";

export default async function handler(req, res) {
  const { name, date, hour, email, telefono } = req.query;

  try {
    if (!name || !date || !hour || !email || !telefono) {
        return res.status(400).json({ message: "Faltan datos en la URL" });
    }


    const evento = await crearEvento({ name, email, date, hour, telefono });
    const meetLink = evento.conferenceData?.entryPoints?.find(p => p.entryPointType === "video")?.uri;
console.log("🔗 Meet link:", meetLink);
    await enviarCorreo({
        to: email,
        bcc: 'tucorreo@virtualflow.tech',
        subject: "Confirmación de tu cita en Virtual Flow",
        html: `
            <h2>¡Hola ${name}!</h2>
            <p>Tu cita ha sido confirmada para el <strong>${date}</strong> a las <strong>${hour}</strong>.</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Correo:</strong> ${email}</p>
            <p>Puedes ver el evento en tu calendario aquí: 
            <a href="${evento.htmlLink}" target="_blank" style="color:#4f46e5;">Abrir evento en Google Calendar</a>
            </p>
            <br />
            <p>Gracias por confiar en Virtual Flow 💜</p>
        `,
    });
            console.log("✅ Evento creado en Google Calendar:", evento.htmlLink);

    // Redirige al frontend
    res.redirect(302, `/success?name=${name}&date=${date}&hour=${hour}&email=${email}&telefono=${telefono}&link=${encodeURIComponent(evento.htmlLink)}&meet=${encodeURIComponent(meetLink || "")}`);
  } catch (error) {
  console.error("❌ Error al crear evento:", error);

  // Esto mostrará también la respuesta de Google si existe
  if (error.response) {
    const { status, data } = error.response;
    console.error("Detalles del error:", status, data);
  }

  res.status(500).json({
    message: "Error al crear el evento en Google Calendar",
    details: error.message || "Sin detalles adicionales",
  });
}

}
