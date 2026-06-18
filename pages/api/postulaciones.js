import { getSupabaseAdmin } from "../../lib/supabaseAdmin";

const RESPUESTAS_CORRECTAS = {
  criterio_1: "Le pregunto que video o estilo le gustaria que se parezca",
  criterio_2: "Adapto el formato y duracion segun como consume cada plataforma su audiencia",
  criterio_3: "El nombre del evento y la fecha/lugar, porque eso activa la asistencia",
};

function sanitizeText(value) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function toInt(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metodo no permitido" });
  }

  try {
    const body = req.body || {};

    const apellidos = sanitizeText(body.apellidos);
    const nombres = sanitizeText(body.nombres);
    const dni = sanitizeText(body.dni);
    const fecha_nacimiento_dia = sanitizeText(body.fecha_nacimiento_dia);
    const fecha_nacimiento_mes = sanitizeText(body.fecha_nacimiento_mes);
    const fecha_nacimiento_anio = sanitizeText(body.fecha_nacimiento_anio);
    const correo = sanitizeText(body.correo).toLowerCase();
    const celular = sanitizeText(body.celular);
    const carrera = sanitizeText(body.carrera);
    const ciclo = sanitizeText(body.ciclo);

    const criterio_1 = sanitizeText(body.criterio_1);
    const criterio_2 = sanitizeText(body.criterio_2);
    const criterio_3 = sanitizeText(body.criterio_3);

    const nivel_video = toInt(body.nivel_video);
    const nivel_diseno = toInt(body.nivel_diseno);
    const nivel_redes = toInt(body.nivel_redes);
    const nivel_foto = toInt(body.nivel_foto);

    const acepto_horario = Boolean(body.acepto_horario);
    const acepto_campo = Boolean(body.acepto_campo);
    const acepto_datos = Boolean(body.acepto_datos);

    if (
      !apellidos ||
      !nombres ||
      !dni ||
      !fecha_nacimiento_dia ||
      !fecha_nacimiento_mes ||
      !fecha_nacimiento_anio ||
      !correo ||
      !celular ||
      !carrera ||
      !ciclo ||
      !criterio_1 ||
      !criterio_2 ||
      !criterio_3
    ) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    if (!/^\d{8}$/.test(dni)) {
      return res.status(400).json({ message: "El DNI debe tener 8 digitos" });
    }

    const niveles = [nivel_video, nivel_diseno, nivel_redes, nivel_foto];
    const nivelesValidos = niveles.every((n) => Number.isInteger(n) && n >= 1 && n <= 5);
    if (!nivelesValidos) {
      return res.status(400).json({ message: "Los niveles deben estar entre 1 y 5" });
    }

    if (!acepto_horario || !acepto_campo || !acepto_datos) {
      return res.status(400).json({ message: "Debes aceptar todas las condiciones" });
    }

    const puntaje_habilidades = nivel_video + nivel_diseno + nivel_redes + nivel_foto;
    const puntaje_criterio =
      (criterio_1 === RESPUESTAS_CORRECTAS.criterio_1 ? 1 : 0) +
      (criterio_2 === RESPUESTAS_CORRECTAS.criterio_2 ? 1 : 0) +
      (criterio_3 === RESPUESTAS_CORRECTAS.criterio_3 ? 1 : 0);
    const puntaje_total = puntaje_habilidades + puntaje_criterio;

    const fecha_nacimiento = `${fecha_nacimiento_dia} ${fecha_nacimiento_mes} ${fecha_nacimiento_anio}`;

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("postulaciones").insert({
      apellidos,
      nombres,
      dni,
      fecha_nacimiento,
      correo,
      celular,
      carrera,
      ciclo,
      nivel_video,
      nivel_diseno,
      nivel_redes,
      nivel_foto,
      criterio_1,
      criterio_2,
      criterio_3,
      puntaje_habilidades,
      puntaje_criterio,
      puntaje_total,
    });

    if (error) {
      console.error("Error al guardar en Supabase:", error);
      return res.status(500).json({ message: "No se pudo guardar la postulacion" });
    }

    return res.status(200).json({
      ok: true,
      message: "Postulacion enviada correctamente",
      puntaje_total,
    });
  } catch (error) {
    console.error("Error en /api/postulaciones:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
