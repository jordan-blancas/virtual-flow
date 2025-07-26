"use client";
import { motion } from "framer-motion";

const beneficios = [
  {
    titulo: "Ahorro de tiempo",
    descripcion: "Automatiza tareas repetitivas y gana horas para ti y tu equipo.",
    icono: "⏱️",
  },
  {
    titulo: "Más clientes",
    descripcion: "Ofrece reservas y pagos sin contacto, las 24 horas del día.",
    icono: "📈",
  },
  {
    titulo: "Control total",
    descripcion: "Visualiza todo tu negocio en un solo panel, desde cualquier dispositivo.",
    icono: "📊",
  },
];

export default function Beneficios() {
  return (
    <section className="py-20 px-4 bg-white text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-6">¿Por qué automatizar tu negocio?</h2>
        <p className="text-lg text-gray-600 mb-12">
          Descubre los beneficios de poner tu negocio en piloto automático.
        </p>

        <div className="grid gap-8 md:grid-cols-3 text-left">
          {beneficios.map((b, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 rounded-xl p-6 shadow-md transition"
            >
              <div className="text-4xl mb-4">{b.icono}</div>
              <h3 className="text-xl font-semibold mb-2">{b.titulo}</h3>
              <p className="text-gray-600">{b.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
