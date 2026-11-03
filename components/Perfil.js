import Image from "next/image";
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
    <section id="perfil" className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-20 text-gray-800 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-200/50 blur-[100px]" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-yellow-200/50 blur-[110px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[280px_1fr] md:gap-16"
      >
        <div className="mx-auto w-full max-w-[280px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border-4 border-white shadow-[0_24px_70px_rgba(55,40,120,0.2)]">
            <Image
              src="/images/jordan-blancas.jpg"
              alt="Jordan Blancas, CEO de Virtual Flow"
              fill
              sizes="(max-width: 768px) 80vw, 280px"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-2 text-xs font-bold tracking-wide text-indigo-700 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
            QUIÉN ESTÁ DETRÁS DE VIRTUAL FLOW
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
            Jordan Blancas
          </h2>
          <p className="mt-2 text-lg font-semibold text-indigo-700">
            CEO de Virtual Flow · Ingeniero, docente universitario e investigador
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700 sm:text-lg">
            Soy ingeniero mecánico electricista, docente universitario e investigador. Mi formación me enseñó a analizar sistemas completos, entender cómo interactúan sus partes y diseñar soluciones confiables. En Virtual Flow aplico ese enfoque a los procesos de cada negocio: identificamos tareas manuales y oportunidades de mejora, y las convertimos en soluciones digitales y automatizaciones prácticas.
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {enlaces.map(({ nombre, href, Icono }) => (
              <li key={nombre}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={nombre === "WhatsApp" ? "Escríbeme por WhatsApp" : `Abrir ${nombre}`}
                  title={nombre}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white"
                >
                  <Icono className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                  {nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
