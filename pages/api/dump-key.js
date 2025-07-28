export default async function handler(req, res) {
  const key = process.env.GOOGLE_PRIVATE_KEY;
  // Solo devuelve pequeña parte para depuración 🙅‍♂️ Sin exponer la clave entera
  const preview = key 
      ? key.slice(0,30) + "\n...\n" + key.slice(-30)
      : "NO KEY";
  const lines = key ? key.split('\n').length : 0;
  res.status(200).json({
    preview,
    lines,
    start: key ? key.startsWith('-----BEGIN') : 'NO',
    end: key ? key.endsWith('-----END PRIVATE KEY-----') : 'NO'
  });
}