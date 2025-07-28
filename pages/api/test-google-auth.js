import { google } from "googleapis";

export default async function handler(req, res) {
  // Obtén el valor RAW de la variable de entorno
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  // Aplica el replace mejorado
  const privateKey = rawKey.replace(/\\r/g, '').replace(/\\n/g, '\n');

  // Logs de depuración avanzada para ver caracteres invisibles/nocivos
  console.log("START CHARS (ASCII):", privateKey.slice(0,30).split('').map(x => x.charCodeAt(0)));
  console.log("END CHARS (ASCII):", privateKey.slice(-30).split('').map(x => x.charCodeAt(0)));

  // (Opcional) Otros logs si quieres
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