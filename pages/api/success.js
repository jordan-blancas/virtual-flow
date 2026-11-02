export default function handler(req, res) {
  return res.status(410).json({ error: "Este endpoint de confirmación ya no está activo." });
}
