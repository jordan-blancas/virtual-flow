import { enviarCorreo } from "../../lib/sendEmail";

export default async function handler(req, res) {
  const { name, date, hour, email, telefono } = req.query;

  try {
    if (!name || !date || !hour || !email || !telefono) {
      return res.status(400).json({ message: "Faltan datos en la URL" });
    }

    await enviarCorreo({
      to: email,
      bcc: 'tucorreo@virtualflow.tech',
      subject: "Confirmación de tu cita en Virtual Flow",
      html: `
        <h2>¡Hola ${name}!</h2>
        <p>Tu cita ha sido registrada para el <strong>${date}</strong> a las <strong>${hour}</strong>.</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <br />
        <p>Gracias por confiar en Virtual Flow 💜</p>
      `,
    });

    console.log("✅ Correo enviado correctamente");

    res.redirect(302, `/success?name=${name}&date=${date}&hour=${hour}&email=${email}&telefono=${telefono}`);
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    res.status(500).json({
      message: "Error al procesar la cita",
      details: error.message || "Sin detalles adicionales",
    });
  }
}
