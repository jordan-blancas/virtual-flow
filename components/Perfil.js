import { motion } from "framer-motion";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa6";

const enlaces = [
  {
    nombre: "Mi web",
    href: "https://jordanblancas.com",
    Icono: GlobeAltIcon,
  },
  {
    nombre: "Instagram",
    href: "https://instagram.com/jordanblancas",
    Icono: FaInstagram,
  },
  {
    nombre: "GitHub",
    href: "https://github.com/JordanBlancas",
    Icono: FaGithub,
  },
  {
    nombre: "WhatsApp",
    href: "https://wa.me/51908741120?text=Hola%2C%20Jordan.%20Llegu%C3%A9%20desde%20Virtual%20Flow%20y%20quiero%20conversar%20sobre%20c%C3%B3mo%20automatizar%20mi%20negocio.",
    Icono: FaWhatsapp,
  },
];

export default function Perfil() {
  return (
    <section id="perfil" className="bg-gradient-to-r from-indigo-50 via-white to-purple-50 px-4 py-8 text-gray-800 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-xl font-bold text-gray-950 sm:text-2xl">
          Ingeniería aplicada a tu negocio
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mt-5 grid max-w-5xl grid-cols-[52px_minmax(0,1fr)] items-center gap-x-3 gap-y-2 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-x-4"
        >
          <img
            src="https://avatars.githubusercontent.com/u/54956790?v=4"
            alt=""
            loading="lazy"
            className="row-span-1 h-12 w-12 rounded-full border-2 border-white object-cover shadow-md sm:h-14 sm:w-14"
          />
          <h3 className="min-w-0 truncate text-lg font-bold leading-tight text-gray-950 sm:text-xl">
            Jordan Blancas
          </h3>
          <p className="col-span-2 whitespace-nowrap text-[9px] font-semibold text-indigo-700 max-[359px]:text-[8px] min-[420px]:text-[10px] sm:col-start-2 sm:col-span-1 sm:text-sm">
            CEO de Virtual Flow · Ingeniero consultor · Docente universitario e investigador
          </p>
          <p className="col-span-2 whitespace-normal text-sm leading-relaxed text-gray-600 sm:col-start-2 sm:col-span-1 sm:text-base">
            Mi formación me enseñó a analizar sistemas completos, entender cómo interactúan sus partes y diseñar soluciones confiables. En Virtual Flow aplico ese enfoque a los procesos de cada negocio: identificamos tareas manuales y oportunidades de mejora, y las convertimos en soluciones digitales y automatizaciones prácticas.
          </p>
        </motion.div>

        <ul className="mx-auto mt-5 flex w-fit max-w-full flex-nowrap items-center justify-center gap-2 overflow-x-auto py-1">
          {enlaces.map(({ nombre, href, Icono }) => (
            <li key={nombre} className="shrink-0">
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={nombre === "WhatsApp" ? "Escríbeme por WhatsApp" : `Abrir ${nombre}`}
                title={nombre}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-indigo-200 bg-white/80 px-2.5 text-[11px] font-semibold text-indigo-900 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white sm:gap-2 sm:px-3 sm:text-sm"
              >
                <Icono className="h-4 w-4 shrink-0 text-indigo-600" aria-hidden="true" />
                {nombre === "Mi web" ? "Web" : nombre}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
