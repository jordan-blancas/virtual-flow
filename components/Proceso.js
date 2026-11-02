"use client";
import { motion } from "framer-motion";

const pasos = [
  {
    titulo: "Agenda tu sesión",
    descripcion: "Elige el día y la hora que mejor te convengan desde el calendario online.",
    entrega: "Tu espacio reservado",
  },
  {
    titulo: "Diagnóstico de tu negocio",
    descripcion: "Conversamos sobre tu proceso actual, tus objetivos y las herramientas que ya usas.",
    entrega: "Mapa de tu proceso",
  },
  {
    titulo: "Business Model Canvas",
    descripcion: "Ordenamos tu modelo de negocio para ver con claridad dónde automatizar primero.",
    entrega: "Tu Canvas completo",
  },
  {
    titulo: "Plan de automatización",
    descripcion: "Priorizamos las automatizaciones de mayor retorno y definimos el stack ideal.",
    entrega: "Plan paso a paso",
  },
  {
    titulo: "Implementación y soporte",
    descripcion: "Construimos, conectamos y probamos el sistema, y te acompañamos al ponerlo en marcha.",
    entrega: "Sistema funcionando",
  },
];

export default function Proceso() {
  return (
    <section className="bg-gray-50 px-4 py-24 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-600">NUESTRO PROCESO</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">¿Cómo trabajamos?</h2>
          <p className="mt-5 text-lg text-gray-600">
            Un camino claro, de la primera sesión a tu negocio funcionando solo.
          </p>
        </div>

        <ol className="relative mt-14 space-y-6 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-indigo-500 before:to-purple-300 sm:before:left-[23px]">
          {pasos.map((p, i) => (
            <motion.li
              key={p.titulo}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="relative flex gap-5 sm:gap-6"
            >
              <span className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 sm:h-12 sm:w-12 sm:text-base">
                {i + 1}
              </span>
              <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold">{p.titulo}</h3>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                    {p.entrega}
                  </span>
                </div>
                <p className="mt-2 leading-relaxed text-gray-600">{p.descripcion}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
