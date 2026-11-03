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
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex min-w-0 items-center gap-3">
          <img
            src="https://avatars.githubusercontent.com/u/54956790?v=4"
            alt=""
            loading="lazy"
            className="h-14 w-14 shrink-0 rounded-full border-2 border-white object-cover shadow-md sm:h-16 sm:w-16"
          />
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold leading-tight text-gray-950 sm:text-xl">
              Jordan Blancas
            </h2>
            <p className="mt-1 max-w-full overflow-x-auto whitespace-nowrap text-[11px] font-semibold text-indigo-700 sm:text-sm">
              CEO de Virtual Flow · Ingeniero consultor · Docente universitario e investigador
            </p>
            <p className="mt-1 max-w-full overflow-x-auto whitespace-nowrap text-xs text-gray-600 sm:text-sm">
              Ingeniería aplicada a entender procesos, conectar tecnología y resolver problemas reales.
            </p>
          </div>
        </div>

        <ul className="flex flex-nowrap items-center gap-1.5 sm:gap-2">
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
      </motion.div>
    </section>
  );
}
