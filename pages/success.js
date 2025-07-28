// pages/success.js
import { useRouter } from "next/router";

export default function SuccessPage() {
  const { query } = useRouter();
  const { name, date, hour, email, telefono } = query;

  if (!name) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>✅ Reserva confirmada</h1>
      <p><strong>Nombre:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Fecha:</strong> {date}</p>
      <p><strong>Hora:</strong> {hour}</p>
      <p><strong>Teléfono:</strong> {telefono}</p>
    </div>
  );
}
