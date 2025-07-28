export default async function handler(req, res) {
  const { name, date, hour, email, telefono } = req.query;

  try {
    if (!name || !date || !hour || !email) {
      return res.status(400).json({ message: "Faltan datos en la URL" });
    }

    const asunto = "Confirmación de tu cita";
    const contenidoHtml = `
      <h2>¡Hola, ${name}!</h2>
      <p>Gracias por reservar tu cita. Nos pondremos en contacto contigo para confirmarla.</p>
      <p><strong>Fecha preferida:</strong> ${date}</p>
      <p><strong>Hora preferida:</strong> ${hour}</p>
      <p><strong>Teléfono:</strong> ${telefono || "No proporcionado"}</p>
      <br/>
      <p>Saludos,<br>Equipo de Virtual Flow</p>
    `;

    await enviarCorreo({
      to: email,
      subject: asunto,
      html: contenidoHtml,
    });

    res.redirect(302, `/success?name=${name}&date=${date}&hour=${hour}&email=${email}&telefono=${telefono}`);
  } catch (error) {
    console.error("Error en /api/success:", error);
    res.status(500).json({
      message: "Error al procesar la reserva",
      details: error.message,
    });
  }
}
