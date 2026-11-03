import { motion } from "framer-motion";
import {
  GlobeAltIcon,
  CameraIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const enlaces = [
  {
    nombre: "Mi web",
    href: "https://jordanblancas.com",
    Icono: GlobeAltIcon,
  },
  {
    nombre: "Instagram",
    href: "https://instagram.com/jordanblancas",
    Icono: CameraIcon,
  },
  {
    nombre: "GitHub",
    href: "https://github.com/JordanBlancas",
    Icono: CodeBracketIcon,
  },
  {
    nombre: "WhatsApp",
    href: "https://wa.me/51908741120?text=Hola%2C%20Jordan.%20Llegu%C3%A9%20desde%20Virtual%20Flow%20y%20quiero%20conversar%20sobre%20c%C3%B3mo%20automatizar%20mi%20negocio.",
    Icono: ChatBubbleLeftRightIcon,
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
            <p className="mt-1 whitespace-nowrap text-xs font-semibold text-indigo-700 sm:text-sm">
              CEO · Ingeniero · Docente e investigador
            </p>
            <p className="mt-1 whitespace-nowrap text-xs text-gray-600 sm:text-sm">
              Automatización con criterio de ingeniería.
            </p>
          </div>
        </div>

        <ul className="flex flex-nowrap items-center gap-2">
            {enlaces.map(({ nombre, href, Icono }) => (
              <li key={nombre}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={nombre === "WhatsApp" ? "Escríbeme por WhatsApp" : `Abrir ${nombre}`}
                  title={nombre}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 bg-white/80 text-indigo-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white"
                >
                  <Icono className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                </a>
              </li>
            ))}
        </ul>
      </motion.div>
    </section>
  );
}
