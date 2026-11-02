"use client";
import { motion } from "framer-motion";

const proyectos = [
  {
    nombre: "Elite Cultural",
    descripcion: "Comunidad online y marketplace para emprendedores culturales.",
    automatiza: "Publicación de ofertas, pagos y gestión de la comunidad.",
    stack: ["Next.js", "Supabase", "Stripe", "Vercel"],
  },
  {
    nombre: "Fitbase.Club",
    descripcion: "Plataforma para gestión de gimnasios y comunidad online.",
    automatiza: "Membresías, cobros recurrentes y avisos a socios.",
    stack: ["Next.js", "Supabase", "Stripe", "Resend"],
  },
  {
    nombre: "Mikuy.Club",
    descripcion: "Plataforma de facturación electrónica y gestión de restaurantes.",
    automatiza: "Emisión de comprobantes, pedidos y reportes de ventas.",
    stack: ["Next.js", "Supabase", "API de facturación", "Vercel"],
  },
  {
    nombre: "Polimatas.Club",
    descripcion: "Comunidad online de aprendizaje colaborativo.",
    automatiza: "Altas de miembros, contenido y notificaciones.",
    stack: ["Next.js", "Supabase", "Resend", "Vercel"],
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

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {proyectos.map((p) => (
            <motion.article
              key={p.nombre}
              whileHover={{ y: -6 }}
              className="flex flex-col rounded-2xl border border-indigo-100 bg-gradient-to-b from-indigo-50/70 to-white p-7 shadow-[0_8px_30px_rgba(79,70,229,0.08)]"
            >
              <h3 className="text-2xl font-semibold">{p.nombre}</h3>
              <p className="mt-2 text-gray-600">{p.descripcion}</p>
              <p className="mt-4 text-sm text-gray-700">
                <span className="font-semibold text-indigo-700">Automatiza: </span>
                {p.automatiza}
              </p>
              <div className="mt-6 border-t border-indigo-100 pt-5">
                <p className="text-xs font-bold tracking-widest text-gray-500">STACK</p>
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
