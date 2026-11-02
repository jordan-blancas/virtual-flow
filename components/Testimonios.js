"use client";
import { motion } from "framer-motion";

const proyectos = [
  {
    nombre: "Elite Cultural",
    sector: "Comunidad y marketplace",
    descripcion: "Comunidad online y marketplace para emprendedores culturales.",
    problema: "Los emprendedores culturales vendían de forma dispersa, sin un lugar común donde ser descubiertos.",
    solucion: "Un marketplace con perfiles, catálogo y pagos integrados, y una comunidad que se gestiona casi sola.",
    funciones: ["Perfiles y catálogo por emprendedor", "Cobros online integrados", "Avisos y bienvenida automáticos", "Panel de administración"],
    stack: ["Next.js", "Supabase", "Stripe", "n8n", "Bot de WhatsApp", "IA"],
  },
  {
    nombre: "Fitbase.Club",
    sector: "Fitness y gimnasios",
    descripcion: "Plataforma para gestión de gimnasios y comunidad online.",
    problema: "Los gimnasios controlaban membresías y pagos a mano, con cobros atrasados y poco contacto con sus socios.",
    solucion: "Un sistema que gestiona socios, cobra membresías y mantiene a la comunidad activa sin trabajo manual.",
    funciones: ["Membresías y cobros recurrentes", "Recordatorios de vencimiento", "Control de asistencia", "Comunidad de socios"],
    stack: ["Next.js", "Supabase", "Stripe", "n8n", "Bot de Telegram", "Resend"],
  },
  {
    nombre: "Mikuy.Club",
    sector: "Restaurantes y facturación",
    descripcion: "Plataforma de facturación electrónica y gestión de restaurantes.",
    problema: "Emitir comprobantes y llevar el control de pedidos consumía horas y generaba errores en la caja.",
    solucion: "Una plataforma que registra pedidos, emite comprobantes electrónicos y resume las ventas automáticamente.",
    funciones: ["Facturación electrónica", "Registro de pedidos", "Reportes de ventas", "Resumen diario por mensaje"],
    stack: ["Next.js", "Supabase", "API de facturación", "n8n", "Bots", "IA"],
  },
  {
    nombre: "Polimatas.Club",
    sector: "Educación y comunidad",
    descripcion: "Comunidad online de aprendizaje colaborativo.",
    problema: "Sumar miembros y mantenerlos participando dependía de tareas manuales de los administradores.",
    solucion: "Una comunidad donde las altas, los accesos y las notificaciones ocurren solos, con un asistente que orienta a los miembros.",
    funciones: ["Alta y acceso automático", "Contenido por niveles", "Notificaciones a la comunidad", "Asistente con IA"],
    stack: ["Next.js", "Supabase", "n8n", "IA", "Bot de Discord", "Resend"],
  },
];

export default function Testimonios() {
  return (
    <section id="proyectos" className="bg-white px-4 py-24 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-600">PROYECTOS</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Proyectos realizados</h2>
          <p className="mt-5 text-lg text-gray-600">
            Plataformas reales que hoy funcionan en piloto automático, con la tecnología que usamos para construirlas.
          </p>
        </div>

        <p className="mt-8 text-center text-xs font-semibold tracking-wide text-indigo-600 md:hidden">
          Desliza para ver más →
        </p>

        <div className="-mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {proyectos.map((p) => (
            <motion.article
              key={p.nombre}
              whileHover={{ y: -6 }}
              className="flex w-[86%] shrink-0 snap-center flex-col rounded-2xl border border-indigo-100 bg-gradient-to-b from-indigo-50/70 to-white p-6 shadow-[0_8px_30px_rgba(79,70,229,0.08)] sm:w-[70%] md:w-auto md:p-7"
            >
              <span className="w-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                {p.sector}
              </span>
              <h3 className="mt-3 text-2xl font-semibold">{p.nombre}</h3>
              <p className="mt-2 text-gray-600">{p.descripcion}</p>

              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-indigo-700">El problema</dt>
                  <dd className="mt-0.5 text-gray-600">{p.problema}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-700">La solución</dt>
                  <dd className="mt-0.5 text-gray-600">{p.solucion}</dd>
                </div>
              </dl>

              <ul className="mt-5 space-y-2 text-sm text-gray-700">
                {p.funciones.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto border-t border-indigo-100 pt-5">
                <p className="mt-5 text-xs font-bold tracking-widest text-gray-500">STACK</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((tecnologia) => (
                    <li
                      key={tecnologia}
                      className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold text-indigo-700"
                    >
                      {tecnologia}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
