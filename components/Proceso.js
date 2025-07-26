"use client";
import { motion } from "framer-motion";

const pasos = [
  {
    paso: "1",
    titulo: "Agenda tu cita",
    descripcion: "Elige el día y hora disponibles desde el calendario online.",
  },
  {
    paso: "2",
    titulo: "Evaluamos tu negocio",
    descripcion: "Conversamos sobre tu proceso actual, tus objetivos y tus herramientas.",
  },
  {
    paso: "3",
    titulo: "Creamos la solución",
    descripcion: "Diseñamos e implementamos automatizaciones a medida para ti.",
  },
];

export default function Proceso() {
  return (
    <section className="py-20 px-4 bg-gray-50 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-6">¿Cómo trabajamos?</h2>
        <p className="text-lg text-gray-600 mb-12">
          Un proceso claro, sencillo y eficiente.
        </p>

        <div className="grid gap-10 md:grid-cols-3 text-left">
          {pasos.map((p, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-md border-l-4 border-indigo-500"
            >
              <div className="text-2xl font-bold text-indigo-600 mb-2">Paso {p.paso}</div>
              <h3 className="text-xl font-semibold mb-2">{p.titulo}</h3>
              <p className="text-gray-600">{p.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
