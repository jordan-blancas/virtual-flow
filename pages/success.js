// pages/success.js
import { useRouter } from "next/router";

export default function SuccessPage() {
  const { query } = useRouter();
  const { name, date, hour, email, telefono } = query;

  const fechaFormato = date
    ? new Date(`${date}T${hour}:00`).toLocaleString("es-PE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Lima",
      })
    : "";

  if (!name) return <p>Cargando...</p>;

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <div style={{
        border: "2px solid #4CAF50",
        borderRadius: "8px",
        padding: "1.5rem",
        backgroundColor: "#f0fff4",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#4CAF50" }}>✅ ¡Reserva confirmada!</h2>
        <p><strong>{name}</strong>, tu cita ha sido agendada correctamente para:</p>
        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{fechaFormato}</p>
        <p>Te hemos enviado un correo de confirmación a <strong>{email}</strong>.</p>
        <p><strong>Teléfono de contacto:</strong> {telefono}</p>

        <a href="/" style={{
          marginTop: "1.5rem",
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#4CAF50",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px"
        }}>
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
