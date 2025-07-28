// lib/sendEmail.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarCorreo({ to, subject, html }) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Reservas <reservas@virtualflow.tech>',
      to, // Solo un destinatario por llamada
      subject,
      html,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error al enviar el correo:", err);
    throw err;
  }
}
