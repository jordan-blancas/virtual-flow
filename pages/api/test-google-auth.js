import { google } from "googleapis";

export default async function handler(req, res) {
  // Obtén la clave privada tal como viene de la variable de entorno
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  // LOG de verificación:
  // Debe dar "-----BEGIN PRIVATE KEY-----" y luego la clave en nueva línea
  console.log("PRIMERAS LINEAS:", privateKey.split('\n')[0], privateKey.split('\n')[1]);

  try {
    const jwtClient = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      privateKey, // <-- Ahora SIN ningún replace
      ["https://www.googleapis.com/auth/calendar"]
    );
    await jwtClient.authorize();
    res.status(200).json({ status: "OK", message: "Auth exitosa" });
  } catch (e) {
    res.status(500).json({ status: "FAIL", error: e.message });
  }
}