import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { disponibilidad } from "../lib/disponibilidad";

export default function CalendarioVisual({ fecha, setFecha }) {
  // Fechas disponibles en formato Date
  const availableDates = Object.keys(disponibilidad).map((d) => new Date(d));

  // Función para habilitar solo las fechas disponibles
  const isAvailable = (date) =>
    availableDates.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );

  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">Calendario visual (solo fechas disponibles):</label>
      <DayPicker
        mode="single"
        selected={fecha ? new Date(fecha) : undefined}
        onSelect={(date) => setFecha(date ? date.toISOString().split("T")[0] : "")}
        modifiers={{ available: isAvailable }}
        modifiersClassNames={{ available: "bg-indigo-100 text-indigo-800 font-bold" }}
        disabled={(date) => !isAvailable(date)}
        showOutsideDays
      />
    </div>
  );
}
