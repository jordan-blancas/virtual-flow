

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";
import { Popover } from "@headlessui/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
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
    <div className="mb-6 flex flex-col items-center">
      <label className="block font-semibold mb-2 text-center">Selecciona fecha y hora:</label>
      <Popover className="relative w-full flex flex-col items-center">
        <Popover.Button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded shadow hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400">
          <CalendarDaysIcon className="w-5 h-5 text-indigo-600" />
          {fecha ? fecha : "Elegir fecha"}
        </Popover.Button>
        <Popover.Panel className="absolute z-10 mt-2 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
          <DayPicker
            mode="single"
            locale={es}
            selected={fecha ? parseLocalDate(fecha) : undefined}
            onSelect={(date) => {
              setFecha(date ? date.toISOString().split("T")[0] : "");
              setHora("");
            }}
            modifiers={{ available: isAvailable }}
            modifiersClassNames={{ available: "bg-indigo-100 text-indigo-800 font-bold" }}
            disabled={(date) => !isAvailable(date)}
            showOutsideDays
          />
        </Popover.Panel>
      </Popover>
      {fecha && (
        <div className="mt-4 w-full flex flex-col items-center">
          <label className="block font-semibold mb-2 text-center">Selecciona una hora:</label>
          <div className="flex flex-wrap gap-2 justify-center">
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
