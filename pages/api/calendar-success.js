export default function handler(req, res) {
  return res.status(410).json({ error: "Este enlace de reserva ya no está activo." });
}
