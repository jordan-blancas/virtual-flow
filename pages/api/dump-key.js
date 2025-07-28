export default async function handler(req, res) {
  const key = process.env.GOOGLE_PRIVATE_KEY;
  res.setHeader('Content-Type', 'text/plain');
  res.send(key);
}