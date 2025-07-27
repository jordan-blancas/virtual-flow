import { google } from "googleapis";

export default async function handler(req, res) {
  console.log("EMAIL:", process.env.GOOGLE_CLIENT_EMAIL);
  console.log("PRIVATE_KEY_RAW:", process.env.GOOGLE_PRIVATE_KEY);
  console.log("PRIVATE_KEY_START:", process.env.GOOGLE_PRIVATE_KEY?.slice(0, 30));
  console.log("PRIVATE_KEY_END:", process.env.GOOGLE_PRIVATE_KEY?.slice(-30));
  
  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
  console.log("AFTER REPLACE (START):", privateKey.slice(0, 40));
  console.log("AFTER REPLACE (END):", privateKey.slice(-40));
  console.log("AFTER REPLACE (FULL):", privateKey);

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