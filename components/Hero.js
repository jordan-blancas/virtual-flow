"use client";
import { motion } from "framer-motion";

const beneficios = [
  { icono: "⏱️", titulo: "Recupera tu tiempo", texto: "Las tareas repetitivas se hacen solas." },
  { icono: "📈", titulo: "Vende las 24 horas", texto: "Reservas y cobros sin que intervengas." },
  { icono: "📊", titulo: "Todo en un panel", texto: "Controla tu negocio desde cualquier lugar." },
];

const proceso = [
  { titulo: "Agenda tu sesión", texto: "Eliges día y hora en segundos." },
  { titulo: "Analizamos tu negocio", texto: "Mapeamos tu proceso y armamos tu Canvas." },
  { titulo: "Lo ponemos en marcha", texto: "Implementamos tu automatización a medida." },
];

const cifras = [
  { valor: "24/7", etiqueta: "Reservas y cobros" },
  { valor: "+4", etiqueta: "Plataformas lanzadas" },
  { valor: "100%", etiqueta: "A tu medida" },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-800 to-purple-900 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-indigo-400/30 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-purple-500/40 blur-[130px]" />
        <div className="absolute -bottom-40 left-1/3 h-[420px] w-[420px] rounded-full bg-yellow-300/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      </div>

      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <motion.span
            {...fade(0)}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white/90 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(253,224,71,0.9)]" />
            AUTOMATIZACIÓN PARA NEGOCIOS
          </motion.span>

          <motion.h1
            {...fade(0.1)}
            className="mt-7 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Pon tu negocio en{" "}
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
              piloto automático
            </span>
          </motion.h1>

          <motion.p {...fade(0.2)} className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            Automatizamos tareas, agendamos clientes y conectamos con sistemas de pago.
            Todo sin complicarte.
          </motion.p>

          <motion.div {...fade(0.3)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#formulario"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-7 py-3.5 font-semibold text-indigo-950 shadow-[0_12px_32px_rgba(250,204,21,0.25)] transition hover:-translate-y-0.5 hover:bg-yellow-300"
            >
              Reserva tu sesión <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#proyectos"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Ver proyectos
            </a>
          </motion.div>

          <motion.dl {...fade(0.4)} className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/20 pt-6">
            {cifras.map((c) => (
              <div key={c.etiqueta}>
                <dt className="text-2xl font-bold text-yellow-300 sm:text-3xl">{c.valor}</dt>
                <dd className="mt-1 text-xs text-white/75 sm:text-sm">{c.etiqueta}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="rounded-3xl border border-white/25 bg-gradient-to-br from-white/20 to-white/5 p-6 shadow-[0_30px_80px_rgba(30,16,86,0.45)] backdrop-blur-2xl sm:p-8"
        >
          <p className="text-xs font-bold tracking-widest text-yellow-300">LO QUE GANAS</p>
          <ul className="mt-4 space-y-3">
            {beneficios.map((b) => (
              <li key={b.titulo} className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 text-xl">{b.icono}</span>
                <span>
                  <span className="block font-semibold">{b.titulo}</span>
                  <span className="block text-sm text-white/75">{b.texto}</span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs font-bold tracking-widest text-yellow-300">CÓMO LO HACEMOS</p>
          <ol className="mt-4 space-y-4">
            {proceso.map((p, i) => (
              <li key={p.titulo} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-yellow-400 text-sm font-bold text-indigo-950">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-semibold leading-8">{p.titulo}</span>
                  <span className="block text-sm text-white/75">{p.texto}</span>
                </span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
