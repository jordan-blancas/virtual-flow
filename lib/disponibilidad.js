export function generarDisponibilidad() {
  const disponibilidad = {};
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const valores = Object.fromEntries(partes.map(({ type, value }) => [type, value]));
  const inicio = new Date(Date.UTC(Number(valores.year), Number(valores.month) - 1, Number(valores.day)));
  const fin = new Date(inicio);
  fin.setUTCMonth(fin.getUTCMonth() + 6);

  for (const fecha = new Date(inicio); fecha <= fin; fecha.setUTCDate(fecha.getUTCDate() + 1)) {
    const dia = fecha.getUTCDay();
    let horas = null;
    if (dia === 5) {
      horas = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
    } else if (dia === 6) {
      horas = ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];
    } else if (dia === 0) {
      horas = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
    }
    if (horas) {
      disponibilidad[fecha.toISOString().slice(0, 10)] = horas;
    }
  }
  return disponibilidad;
}
