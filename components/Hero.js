"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-800 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Pon tu negocio en <span className="text-yellow-300">piloto automático</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white/90">
          Automatizamos tareas, agendamos clientes y conectamos con sistemas de pago. Todo sin complicarte.
        </p>
        <a
          href="#formulario"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg transition"
        >
          Reserva una cita
        </a>
      </motion.div>
    </section>
  );
}
