import { google } from "googleapis";

export default async function handler(req, res) {
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const privateKey = rawKey.replace(/\\n/g, '\n');

  // *** LOGS DE DEPURACIÓN ***
  console.log("RAW:", JSON.stringify(rawKey).slice(0, 100));
  console.log("AFTER REPLACE:", JSON.stringify(privateKey).slice(0, 100));
  console.log("PRIMERAS LINEAS:");
  console.log(privateKey.split('\n')[0]); // Esperado: "-----BEGIN PRIVATE KEY-----"
  console.log(privateKey.split('\n')[1]); // Esperado: "MIIE..."

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