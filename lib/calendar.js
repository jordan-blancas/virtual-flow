const { google } = require("googleapis");
const path = require("path");

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), "lib/calendar-credentials.json"),
  scopes: SCOPES,
});

async function crearEvento({ name, email, date, hour, telefono }) {
  const authClient = await auth.getClient();
  const calendar = google.calendar({ version: "v3", auth: authClient });

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

module.exports = { crearEvento };
