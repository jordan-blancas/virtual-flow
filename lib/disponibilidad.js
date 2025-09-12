// Estructura JS: disponibilidad.js
// Cada fecha tiene un array de horas disponibles
// Formato: AAAA-MM-DD


// Genera disponibilidad para los próximos 6 meses (viernes, sábados y domingos)
function generarDisponibilidad() {
  const disponibilidad = {};
  const hoy = new Date();
  const fin = new Date(hoy.getFullYear(), hoy.getMonth() + 6, hoy.getDate());
  for (let d = new Date(hoy); d <= fin; d.setDate(d.getDate() + 1)) {
    const dia = d.getDay();
    let horas = null;
    if (dia === 5) { // Viernes
      horas = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
    } else if (dia === 6) { // Sábado
      horas = ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];
    } else if (dia === 0) { // Domingo
      horas = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
    }
    if (horas) {
      const fechaStr = d.toISOString().split("T")[0];
      disponibilidad[fechaStr] = horas;
    }
  }
  return disponibilidad;
}

export const disponibilidad = generarDisponibilidad();
