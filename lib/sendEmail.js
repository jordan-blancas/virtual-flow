import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarCorreo({ to, subject, html }) {
  try {
    // Genera una versión texto simple del HTML
    const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

    const { data, error } = await resend.emails.send({
      from: 'Reservas <reservas@virtualflow.tech>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text, // ← Añade el campo text
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error al enviar el correo:", err);
    throw err;
  }
}
