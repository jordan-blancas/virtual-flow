import { getSupabaseAdmin } from "../../lib/supabaseAdmin";
import { generarDisponibilidad } from "../../lib/disponibilidad";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const disponibilidad = generarDisponibilidad();
    const fechas = Object.keys(disponibilidad).sort();
    const { data, error } = await getSupabaseAdmin()
      .from("reservas")
      .select("fecha, hora, status, expires_at")
      .gte("fecha", fechas[0])
      .lte("fecha", fechas[fechas.length - 1])
      .in("status", ["pending", "paid"]);

    if (error) throw error;

    const ahora = Date.now();
    const ocupados = data
      .filter((reserva) => reserva.status === "paid" || new Date(reserva.expires_at).getTime() > ahora)
      .map((reserva) => `${reserva.fecha}T${reserva.hora.slice(0, 5)}`);

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ disponibilidad, ocupados });
  } catch (error) {
    console.error("Error al consultar disponibilidad:", error.message);
    return res.status(503).json({ error: "No se pudo consultar la agenda." });
  }
}