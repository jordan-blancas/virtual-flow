"use client";
import { motion } from "framer-motion";
import {
  ClockIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  DocumentTextIcon,
  BellAlertIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const beneficios = [
  {
    titulo: "Recupera horas cada semana",
    descripcion: "Las tareas repetitivas se ejecutan solas y tu equipo se enfoca en lo que realmente hace crecer el negocio.",
    Icono: ClockIcon,
  },
  {
    titulo: "Vende mientras duermes",
    descripcion: "Tus clientes reservan y pagan a cualquier hora, sin que tengas que responder mensaje por mensaje.",
    Icono: ArrowTrendingUpIcon,
  },
  {
    titulo: "Control total en un panel",
    descripcion: "Reservas, cobros y clientes en un solo lugar, disponible desde cualquier dispositivo.",
    Icono: ChartBarIcon,
  },
];

const automatizaciones = [
  { titulo: "Reservas y agenda", Icono: CalendarDaysIcon },
  { titulo: "Cobros y pagos online", Icono: CreditCardIcon },
  { titulo: "Facturación electrónica", Icono: DocumentTextIcon },
  { titulo: "Recordatorios y avisos", Icono: BellAlertIcon },
  { titulo: "Seguimiento de clientes", Icono: UserGroupIcon },
  { titulo: "Reportes automáticos", Icono: ChartBarIcon },
];

export default function Beneficios() {
  return (
    <section className="bg-white px-4 py-24 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-600">BENEFICIOS</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            ¿Por qué poner tu negocio en piloto automático?
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            Menos trabajo manual, más clientes atendidos y resultados que se notan desde la primera semana.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {beneficios.map(({ titulo, descripcion, Icono }) => (
            <motion.div
              key={titulo}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-indigo-100 bg-gradient-to-b from-indigo-50/80 to-white p-7 shadow-[0_8px_30px_rgba(79,70,229,0.08)]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg shadow-indigo-600/25">
                <Icono className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{titulo}</h3>
              <p className="mt-2 leading-relaxed text-gray-600">{descripcion}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white sm:p-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-widest text-yellow-300">QUÉ AUTOMATIZAMOS</span>
            <h3 className="mt-3 text-3xl font-bold">Si se repite, se puede automatizar</h3>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {automatizaciones.map(({ titulo, Icono }) => (
              <li
                key={titulo}
                className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md"
              >
                <Icono className="h-5 w-5 shrink-0 text-yellow-300" />
                <span className="font-medium">{titulo}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
