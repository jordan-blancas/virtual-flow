import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../components/Formulario.module.css";

export default function SuccessPage() {
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const sessionId = router.query.session_id;
    if (typeof sessionId !== "string") {
      setError("No encontramos una sesión de pago para verificar.");
      return;
    }

    let active = true;
    fetch(`/api/booking-status?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "No pudimos verificar el pago.");
        if (active) setBooking(data.booking);
      })
      .catch((fetchError) => {
        if (active) setError(fetchError.message);
      });

    return () => { active = false; };
  }, [router.isReady, router.query.session_id]);

  const fechaFormato = booking
    ? new Date(`${booking.date}T${booking.hour}:00-05:00`).toLocaleString("es-PE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Lima",
      })
    : "";

  return (
    <main className={styles.successPage}>
      <section className={styles.successPanel} aria-live="polite">
        {booking ? (
          <>
            <div className={styles.successMark} aria-hidden="true">✓</div>
            <span className={styles.eyebrow}>PAGO VERIFICADO</span>
            <h1>Tu cita está confirmada</h1>
            <p><strong>{booking.name}</strong>, reservamos este espacio para ti:</p>
            <p className={styles.successDetails}>{fechaFormato}<br />{booking.email}</p>
            <p>Te enviaremos los detalles de la cita por correo.</p>
          </>
        ) : (
          <>
            <span className={styles.eyebrow}>VIRTUAL FLOW · RESERVAS</span>
            <h1>{error ? "No se pudo confirmar" : "Verificando tu pago…"}</h1>
            <p>{error || "Estamos consultando el estado de tu pago con Stripe."}</p>
          </>
        )}
        <Link href="/" className={styles.homeLink}>Volver al inicio</Link>
      </section>
    </main>
  );
}
