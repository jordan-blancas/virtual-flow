import { google } from "googleapis";

export default async function handler(req, res) {
  // LOGS para ver tus variables
  console.log("EMAIL:", process.env.GOOGLE_CLIENT_EMAIL);
  console.log("PRIVATE_KEY_START:", process.env.GOOGLE_PRIVATE_KEY?.slice(0, 30));
  console.log("PRIVATE_KEY_END:", process.env.GOOGLE_PRIVATE_KEY?.slice(-30));

console.log("KEY RAW:", process.env.GOOGLE_PRIVATE_KEY);

  try {
    const jwtClient = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/calendar"]
    );
    await jwtClient.authorize();
    res.status(200).json({ status: "OK", message: "Auth exitosa" });
  } catch (e) {
    res.status(500).json({ status: "FAIL", error: e.message });
  }
}