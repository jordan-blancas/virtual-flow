"use client";

export default function Testimonios() {
  return (
    <section style={{ padding: "2rem 0", background: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Testimonios</h2>
      <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
        <div style={{ maxWidth: 320, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0001", padding: "1.5rem" }}>
          <p>“Excelente servicio, muy profesional y rápido. ¡Repetiré sin duda!”</p>
          <strong>- Ana M.</strong>
        </div>
        <div style={{ maxWidth: 320, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0001", padding: "1.5rem" }}>
          <p>“Me ayudaron a resolver mi problema en minutos. Muy recomendado.”</p>
          <strong>- Carlos P.</strong>
        </div>
        <div style={{ maxWidth: 320, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0001", padding: "1.5rem" }}>
          <p>“Atención personalizada y resultados efectivos. ¡Gracias!”</p>
          <strong>- Lucía G.</strong>
        </div>
      </div>
    </section>
  );
}