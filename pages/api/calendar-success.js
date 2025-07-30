import { enviarCorreo } from "../../lib/sendEmail";

export default async function handler(req, res) {
  const { name, date, hour, email, telefono } = req.query;

  try {
    if (!name || !date || !hour || !email || !telefono) {
      return res.status(400).json({ message: "Faltan datos en la URL" });
    }

    // 📩 Correo para el usuario
    await enviarCorreo({
      to: email,
      subject: "✅ Confirmación de tu cita en Virtual Flow",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>¡Hola ${name}!</h2>
          <p>Tu cita ha sido registrada para el <strong>${formatearFecha(date)} a las ${hour}</strong>.</p>
          <p>Nos pondremos en contacto contigo para confirmar los detalles.</p>
          <br />
          <p>Gracias por confiar en <strong>Virtual Flow</strong> 💜</p>
        </div>
      `,
    });

    // 📩 Correo para el administrador
    await enviarCorreo({
      to: "automatizaciondenegocios@gmail.com",
      subject: "🔔 Nueva cita reservada en Virtual Flow",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>📥 Nueva cita recibida</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Fecha:</strong> ${formatearFecha(date)}</p>
          <p><strong>Hora:</strong> ${hour}</p>
        </div>
      `,
    });

    console.log("✅ Correos enviados correctamente");

    // Redirigir a la página de éxito
    res.redirect(302, `/success?name=${name}&date=${date}&hour=${hour}&email=${email}&telefono=${telefono}`);
  } catch (error) {
    console.error("❌ Error al enviar correos:", error);
    res.status(500).json({
      message: "Error al procesar la cita",
      details: error.message || "Sin detalles adicionales",
    });
  }
}

// Función para traducir la fecha
function formatearFecha(fechaISO) {
  return new Date(fechaISO).toLocaleDateString("es-PE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
