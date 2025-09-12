
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { disponibilidad } from "../lib/disponibilidad";

export default function CalendarioVisual({ fecha, setFecha, hora, setHora }) {
  // Utilidad para crear fecha local (no UTC)
  function parseLocalDate(str) {
    const [year, month, day] = str.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  // Fechas disponibles en formato Date local
  const availableDates = Object.keys(disponibilidad).map(parseLocalDate);

  // Función para habilitar solo las fechas disponibles
  const isAvailable = (date) =>
    availableDates.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );

  // Horas disponibles para la fecha seleccionada
  const horasDisponibles = fecha && disponibilidad[fecha] ? disponibilidad[fecha] : [];

  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">Calendario visual (solo fechas disponibles):</label>
      <DayPicker
        mode="single"
        selected={fecha ? parseLocalDate(fecha) : undefined}
        onSelect={(date) => {
          setFecha(date ? date.toISOString().split("T")[0] : "");
          setHora(""); // Reinicia hora al cambiar fecha
        }}
        modifiers={{ available: isAvailable }}
        modifiersClassNames={{ available: "bg-indigo-100 text-indigo-800 font-bold" }}
        disabled={(date) => !isAvailable(date)}
        showOutsideDays
      />
      {fecha && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Selecciona una hora:</label>
          <div className="flex flex-wrap gap-2">
            {horasDisponibles.map((h) => (
              <button
                key={h}
                type="button"
                className={`px-4 py-2 rounded border transition font-medium ${
                  hora === h
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-indigo-50"
                }`}
                onClick={() => setHora(h)}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
