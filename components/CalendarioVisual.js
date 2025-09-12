

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";
import { Popover } from "@headlessui/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useRef, useEffect, useState } from "react";
import { disponibilidad } from "../lib/disponibilidad";

export default function CalendarioVisual({ fecha, setFecha, hora, setHora }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [resumen, setResumen] = useState("");
  const horasRef = useRef(null);
  const topRef = useRef(null);
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

  // Scroll automático a la selección de horas tras elegir fecha
  useEffect(() => {
    if (fecha && horasRef.current) {
      horasRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [fecha]);

  // Scroll hacia arriba tras guardar
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Resumen tras confirmar
  // Actualizar resumen cada vez que se guarda
  const guardarSeleccion = () => {
    if (fecha && hora) {
      const dateObj = new Date(fecha + 'T00:00:00');
      const fechaLarga = dateObj.toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      setResumen(`Has seleccionado: ${fechaLarga.charAt(0).toUpperCase() + fechaLarga.slice(1)} a las ${hora}h`);
      setPopoverOpen(false);
      setTimeout(scrollToTop, 300);
    }
  };

  return (
    <div className="mb-6 flex flex-col items-center" ref={topRef}>
      <label className="block font-semibold mb-2 text-center">Selecciona fecha y hora:</label>
      <Popover className="relative w-full flex flex-col items-center" open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Popover.Button
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded shadow hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onClick={() => setPopoverOpen(true)}
        >
          <CalendarDaysIcon className="w-5 h-5 text-indigo-600" />
          {fecha && hora ? `${fecha} - ${hora}h` : fecha ? fecha : "Elegir fecha"}
        </Popover.Button>
        {popoverOpen && (
          <Popover.Panel className="absolute z-10 mt-2 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 min-w-[320px]">
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
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2 text-center">Las horas disponibles dependen de la agenda del equipo. Selecciona una fecha para ver los horarios habilitados.</p>
              {fecha && (
                <div ref={horasRef}>
                  <label className="block font-semibold mb-2 text-center">Selecciona una hora:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {horasDisponibles.map((h) => (
                      <button
                        key={h}
                        type="button"
                        className={`w-full px-4 py-2 rounded border transition font-medium ${
                          hora === h
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-indigo-50"
                        }`}
                        onClick={() => setHora(h)}
                      >
                        {h}h
                      </button>
                    ))}
                  </div>
                  {hora && (
                    <button
                      className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-500 transition"
                      onClick={guardarSeleccion}
                      type="button"
                    >
                      Guardar fecha y hora
                    </button>
                  )}
                </div>
              )}
            </div>
          </Popover.Panel>
        )}
      </Popover>
      {resumen && (
        <div className="mt-2 text-sm text-indigo-700 font-medium bg-indigo-50 px-4 py-2 rounded shadow">
          {resumen}
        </div>
      )}
    </div>
  );
}
