"use client";
import { motion } from "framer-motion";

const CX = 300;
const CY = 270;
const RX = 225;
const RY = 205;

const nodos = [
  { nombre: "n8n", detalle: "Flujos" },
  { nombre: "Bots", detalle: "WhatsApp · Telegram" },
  { nombre: "IA", detalle: "Asistentes" },
  { nombre: "Pagos", detalle: "Stripe" },
  { nombre: "Base de datos", detalle: "Supabase" },
  { nombre: "CRM", detalle: "Clientes" },
  { nombre: "Correo", detalle: "Resend" },
  { nombre: "Agenda", detalle: "Reservas" },
].map((nodo, i, lista) => {
  const angulo = (-90 + (360 / lista.length) * i) * (Math.PI / 180);
  return {
    ...nodo,
    x: Math.round(CX + RX * Math.cos(angulo)),
    y: Math.round(CY + RY * Math.sin(angulo)),
  };
});

export default function Ecosistema() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-900 to-purple-900 px-4 py-24 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-indigo-400/25 blur-[110px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-500/30 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div>
          <span className="text-xs font-bold tracking-widest text-yellow-300">ECOSISTEMA</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Todas tus herramientas, <span className="text-yellow-300">conectadas</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/85">
            Unimos tu negocio con n8n, bots, inteligencia artificial, pagos y más, para que los datos fluyan
            solos de una herramienta a otra, sin que tengas que copiar nada a mano.
          </p>
          <ul className="mt-8 space-y-3 text-white/90">
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />Un cliente reserva y paga; el sistema lo registra y le avisa.</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />Un bot responde las dudas frecuentes las 24 horas.</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />La IA resume, clasifica y prepara las respuestas por ti.</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/20 bg-white/10 p-3 shadow-[0_30px_80px_rgba(30,16,86,0.4)] backdrop-blur-xl sm:p-6">
          <svg
            viewBox="0 0 600 540"
            role="img"
            aria-label="Red de herramientas conectadas a tu negocio: n8n, bots, IA, pagos, base de datos, CRM, correo y agenda"
            className="h-auto w-full"
          >
            {nodos.map((n, i) => (
              <g key={`enlace-${n.nombre}`}>
                <line x1={CX} y1={CY} x2={n.x} y2={n.y} stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeDasharray="4 6" />
                <circle r="4.5" fill="#fde047">
                  <animateMotion
                    dur={`${3 + (i % 3) * 0.6}s`}
                    begin={`${i * 0.4}s`}
                    repeatCount="indefinite"
                    path={`M ${n.x} ${n.y} L ${CX} ${CY}`}
                  />
                </circle>
              </g>
            ))}

            <circle cx={CX} cy={CY} r="74" fill="rgba(250,204,21,0.12)" />
            <circle cx={CX} cy={CY} r="58" fill="#facc15" />
            <text x={CX} y={CY - 4} textAnchor="middle" fontSize="19" fontWeight="700" fill="#24134d">Tu</text>
            <text x={CX} y={CY + 18} textAnchor="middle" fontSize="19" fontWeight="700" fill="#24134d">negocio</text>

            {nodos.map((n) => (
              <g key={n.nombre}>
                <rect x={n.x - 66} y={n.y - 27} width="132" height="54" rx="14" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.45)" />
                <text x={n.x} y={n.y - 3} textAnchor="middle" fontSize="17" fontWeight="700" fill="#ffffff">{n.nombre}</text>
                <text x={n.x} y={n.y + 16} textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.78)">{n.detalle}</text>
              </g>
            ))}
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
