

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";
import { useMemo } from "react";
import styles from "./Formulario.module.css";

function parseLocalDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function limaToday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export default function CalendarioVisual({ fecha, setFecha, hora, setHora, disponibilidad, ocupados, cargando, error, advertencia }) {
  const ocupadosSet = useMemo(() => new Set(ocupados), [ocupados]);
  const fechas = Object.keys(disponibilidad).sort();
  const ultimaFecha = fechas[fechas.length - 1];
  const hoy = limaToday();

  function horasDe(fechaKey) {
    return (disponibilidad[fechaKey] || []).filter((horaDisponible) => {
      const instante = new Date(`${fechaKey}T${horaDisponible}:00-05:00`).getTime();
      return instante > Date.now() && !ocupadosSet.has(`${fechaKey}T${horaDisponible}`);
    });
  }

  function fechaDisponible(date) {
    const dateKey = formatLocalDate(date);
    return dateKey >= hoy && fechas.includes(dateKey) && horasDe(dateKey).length > 0;
  }

  const horasDisponibles = fecha ? horasDe(fecha) : [];

  return (
    <div className={styles.schedule}>
      <div className={styles.scheduleHeading}>
        <div>
          <span className={styles.step}>02 / FECHA Y HORA</span>
          <p>Selecciona un horario disponible</p>
        </div>
        {fecha && (
          <span className={styles.selectedDate}>
            {parseLocalDate(fecha).toLocaleDateString("es-PE", { day: "numeric", month: "short" })}
            {hora ? ` · ${hora}` : ""}
          </span>
        )}
      </div>

      <div className={styles.calendarGrid}>
        <div className={styles.calendarWrap}>
          <DayPicker
            mode="single"
            locale={es}
            selected={fecha ? parseLocalDate(fecha) : undefined}
            onSelect={(date) => {
              const nextDate = date ? formatLocalDate(date) : "";
              setFecha(nextDate);
              setHora("");
            }}
            disabled={(date) => !fechaDisponible(date)}
            modifiers={{ available: fechaDisponible }}
            modifiersClassNames={{ available: styles.availableDay }}
            startMonth={ultimaFecha ? parseLocalDate(hoy) : undefined}
            endMonth={ultimaFecha ? parseLocalDate(ultimaFecha) : undefined}
            showOutsideDays={false}
            className={styles.calendar}
          />
        </div>

        <div className={styles.timeColumn}>
          <p className={styles.timeTitle}>{fecha ? "Horas" : "Elige un día"}</p>
          {cargando && <p className={styles.calendarHint}>Consultando agenda…</p>}
          {error && <p className={styles.calendarError} role="alert">{error}</p>}
          {advertencia && <p className={styles.calendarHint}>{advertencia}</p>}
          {!cargando && !error && !fecha && <p className={styles.calendarHint}>Los días con horarios libres están resaltados.</p>}
          {!cargando && !error && fecha && horasDisponibles.length === 0 && (
            <p className={styles.calendarHint}>Ya no quedan horarios para este día.</p>
          )}
          {fecha && horasDisponibles.length > 0 && (
            <div className={styles.timeButtons}>
              {horasDisponibles.map((horaDisponible) => (
                <button
                  key={horaDisponible}
                  type="button"
                  aria-pressed={hora === horaDisponible}
                  className={hora === horaDisponible ? styles.timeSelected : styles.timeButton}
                  onClick={() => setHora(horaDisponible)}
                >
                  {horaDisponible}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className={styles.timezone}>Hora de Perú (UTC−5)</p>
    </div>
  );
}
