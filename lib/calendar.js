import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  SCOPES
);

const calendar = google.calendar({ version: "v3", auth });

export async function crearEvento({ name, email, date, hour, telefono }) {
  const startDateTime = new Date(`${date}T${hour}:00`);
  const endDateTime = new Date(startDateTime);
  endDateTime.setHours(startDateTime.getHours() + 1);

  const evento = {
    summary: `Consulta con ${name}`,
    description: `Reserva automática desde Virtual Flow.\n\nNombre: ${name}\nCorreo: ${email}\nTeléfono: ${telefono}`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: "America/Lima",
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: "America/Lima",
    },
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    requestBody: evento,
  });

  return response.data;
}
