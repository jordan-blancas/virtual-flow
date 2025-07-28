import { google } from "googleapis";

export default async function handler(req, res) {
  // Obtén el valor RAW de la variable de entorno
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  // Reemplazos multinivel
  let privateKey = rawKey;
  privateKey = privateKey.replace(/\\\\n/g, '\n');
  privateKey = privateKey.replace(/\\n/g, '\n');
  privateKey = privateKey.replace(/\n/g, '\n');

  // LOGS
  console.log("AFTER REPLACE:", JSON.stringify(privateKey.slice(0, 100)));
  console.log("Línea 0:", privateKey.split('\n')[0]); // "-----BEGIN PRIVATE KEY-----"
  console.log("Línea 1:", privateKey.split('\n')[1]); // "MIIEvAI..."
  console.log("RAW SLICE:", rawKey.slice(0, 60));
  console.log("CUENTA \\:", (rawKey.match(/\\/g) || []).length);
  console.log("CUENTA \\n:", (rawKey.match(/\\n/g) || []).length);
  console.log("CUENTA n:", (rawKey.match(/n/g) || []).length);
  console.log("JSONIFIED RAW:", JSON.stringify(rawKey.slice(0, 80)));
  console.log(JSON.stringify(privateKey.slice(0, 70)));

  try {
    const jwtClient = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      privateKey,
      ["https://www.googleapis.com/auth/calendar"]
    );
    await jwtClient.authorize();
    res.status(200).json({ status: "OK", message: "Auth exitosa" });
  } catch (e) {
    res.status(500).json({ status: "FAIL", error: e.message });
  }
}