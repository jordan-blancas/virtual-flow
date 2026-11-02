import { Resend } from "resend";

export async function enviarCorreo({ to, subject, html }) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Falta RESEND_API_KEY en las variables de entorno.");
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Reservas <reservas@virtualflow.tech>",
      to,
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
