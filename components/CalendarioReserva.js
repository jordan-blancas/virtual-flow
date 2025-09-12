import { useState } from "react";
import { disponibilidad } from "../lib/disponibilidad";

export default function CalendarioReserva({ fecha, setFecha, hora, setHora }) {
  // Obtén las fechas disponibles (ordenadas)
  const fechasDisponibles = Object.keys(disponibilidad).sort();

  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">Selecciona una fecha:</label>
      <div className="flex flex-wrap gap-2 mb-4">
        {fechasDisponibles.map((f) => (
          <button
            key={f}
            type="button"
            className={`px-4 py-2 rounded border transition font-medium ${
              fecha === f
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-indigo-50"
            }`}
            onClick={() => {
              setFecha(f);
              setHora(""); // Reinicia hora al cambiar fecha
            }}
          >
            {new Date(f).toLocaleDateString("es-PE", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </button>
        ))}
      </div>

      {fecha && (
        <>
          <label className="block font-semibold mb-2">Selecciona una hora:</label>
          <div className="flex flex-wrap gap-2">
            {disponibilidad[fecha].map((h) => (
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
        </>
      )}
    </div>
  );
}
