"use client";
import { useEffect, useState } from "react";
import styles from "./Testimonios.module.css";

const testimonios = [
  {
    texto: "Comunidad online y marketplace para emprendedores culturales",
    autor: "Elite Cultural",
  },
  {
    texto: "Plataforma para gestión de gimnasios y comunidad online",
    autor: "Fitbase.Club",
  },
  {
    texto: "Plataforma de facturación electrónica y gestión de restaurantes.",
    autor: "Mikuy.Club",
  },
  {
    texto: "Comunidad online de aprendizaje colaborativo.",
    autor: "Polimatas.Club",
  },
];

export default function Testimonios() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActual((prev) => (prev + 1) % testimonios.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Proyectos realizados</h2>
      <div className={styles.slider}>
        {testimonios.map((t, i) => (
          <div
            key={i}
            className={styles.testimonio}
            style={{
              transform: `translateX(${100 * (i - actual)}%)`,
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              opacity: i === actual ? 1 : 0,
              zIndex: i === actual ? 2 : 1,
            }}
          >
            <p>{t.texto}</p>
            <span className={styles.autor}>- {t.autor}</span>
          </div>
        ))}
      </div>
    </section>
  );
}