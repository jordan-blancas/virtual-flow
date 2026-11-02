import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CalendarioVisual from "./CalendarioVisual";
import styles from "./Formulario.module.css";
import { generarDisponibilidad } from "../lib/disponibilidad";

export default function Formulario() {
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [disponibilidad, setDisponibilidad] = useState({});
  const [ocupados, setOcupados] = useState([]);
  const [agendaCargada, setAgendaCargada] = useState(false);
  const [agendaError, setAgendaError] = useState("");
  const [agendaAviso, setAgendaAviso] = useState("");
  const [error, setError] = useState("");
  const [procesando, setProcesando] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/disponibilidad", { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "No se pudo cargar la agenda.");
        setDisponibilidad(data.disponibilidad);
        setOcupados(data.ocupados);
        setAgendaAviso(data.sincronizada === false
          ? "Horarios disponibles. El bloqueo compartido se activará al configurar la agenda."
          : "");
        setAgendaCargada(true);
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") {
          setDisponibilidad(generarDisponibilidad());
          setOcupados([]);
          setAgendaError("");
          setAgendaAviso("Horarios disponibles. El bloqueo compartido se activará al configurar la agenda.");
          setAgendaCargada(true);
        }
      });
    return () => controller.abort();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!fecha || !hora) {
      setError("Selecciona una fecha y una hora para continuar.");
      return;
    }
    if (telefono.replace(/\D/g, "").length < 8) {
      setError("Ingresa un número de teléfono válido.");
      return;
    }

    setProcesando(true);
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("nombre"),
          email: formData.get("email"),
          telefono,
          date: fecha,
          hour: hora,
          message: formData.get("mensaje"),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          const availabilityResponse = await fetch("/api/disponibilidad");
          if (availabilityResponse.ok) {
            const availability = await availabilityResponse.json();
            setDisponibilidad(availability.disponibilidad);
            setOcupados(availability.ocupados);
            setAgendaAviso(availability.sincronizada === false
              ? "Horarios disponibles. El bloqueo compartido se activará al configurar la agenda."
              : "");
            setHora("");
          }
        }
        throw new Error(data.error || "No se pudo iniciar el pago.");
      }

      window.location.assign(data.url);
    } catch (submitError) {
      setError(submitError.message || "Ocurrió un error al procesar la reserva.");
      setProcesando(false);
    }
  }

  return (
    <section id="formulario" className={styles.section}>
      <div className={styles.gridBackdrop} aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        viewport={{ once: true }}
        className={styles.layout}
      >
        <div className={styles.intro}>
          <span className={styles.eyebrow}>VIRTUAL FLOW · RESERVAS</span>
          <h2 className={styles.title}>
            Deja de operar a mano. <span>Diseñemos tu piloto automático.</span>
          </h2>
          <p className={styles.lead}>
            En una sesión 1 a 1 analizamos cómo funciona tu negocio hoy y te mostramos qué automatizar primero para ganar tiempo y vender más.
          </p>
          <div className={styles.trustList}>
            <p><span className={styles.trustDot} /> Estudiamos tu negocio y detectamos dónde pierdes tiempo y dinero</p>
            <p><span className={styles.trustDot} /> Armamos tu Business Model Canvas</p>
            <p><span className={styles.trustDot} /> Sales con un plan de automatización a tu medida</p>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeading}>
            <div>
              <span className={styles.step}>01 / AGENDA</span>
              <h3>Reserva tu cita</h3>
            </div>
            <span className={styles.secureBadge}>
              <span aria-hidden="true">●</span> Pago seguro
            </span>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldsGrid}>
              <label className={styles.field}>
                <span>Nombre</span>
                <input required maxLength={120} name="nombre" type="text" placeholder="Tu nombre" autoComplete="name" />
              </label>
              <label className={styles.field}>
                <span>Correo electrónico</span>
                <input required name="email" type="email" placeholder="tu@correo.com" autoComplete="email" />
              </label>
              <label className={`${styles.field} ${styles.phoneField}`}>
                <span>Teléfono</span>
                <PhoneInput
                  country="pe"
                  value={telefono}
                  onChange={setTelefono}
                  inputProps={{ name: "telefono", required: true, autoComplete: "tel" }}
                  containerClass={styles.phoneContainer}
                  inputClass={styles.phoneInput}
                  buttonClass={styles.phoneCountry}
                  dropdownClass={styles.phoneDropdown}
                />
              </label>
            </div>

            <CalendarioVisual
              fecha={fecha}
              setFecha={setFecha}
              hora={hora}
              setHora={setHora}
              disponibilidad={disponibilidad}
              ocupados={ocupados}
              cargando={!agendaCargada && !agendaError}
              error={agendaError}
              advertencia={agendaAviso}
            />

            <label className={`${styles.field} ${styles.messageField}`}>
              <span>¿En qué necesitas ayuda? <em>Opcional</em></span>
              <textarea name="mensaje" rows={3} maxLength={2000} placeholder="Cuéntanos brevemente qué tienes en mente" />
            </label>

            {error && <p className={styles.error} role="alert">{error}</p>}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={!agendaCargada || Boolean(agendaError) || !fecha || !hora || procesando}
            >
              {procesando ? "Redirigiendo a la sección de pago…" : "Continuar al pago"}
              {!procesando && <span aria-hidden="true">↗</span>}
            </button>
            <p className={styles.disclaimer}>El horario queda confirmado únicamente cuando el pago se acredita.</p>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
