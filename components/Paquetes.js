import { motion } from "framer-motion";

const paquetes = [
  {
    etiqueta: "PRIMER PASO",
    titulo: "Piloto operativo",
    precio: "Desde $1,200",
    descripcion: "Automatiza un proceso importante de tu negocio y valida el impacto antes de escalar.",
    entregables: [
      "1 proceso de negocio priorizado",
      "Hasta 3 flujos y 3 herramientas conectadas",
      "Configuración, pruebas y manejo básico de errores",
      "Documentación y sesión de entrega",
    ],
    destacado: true,
  },
  {
    etiqueta: "PARA CRECER",
    titulo: "Sistema conectado",
    precio: "Cotización a medida",
    descripcion: "Para conectar varias áreas, canales y sistemas con automatizaciones más avanzadas.",
    entregables: [
      "Varios procesos y herramientas conectadas",
      "Bots e integraciones con IA, si aportan valor",
      "Flujos de datos y reportes entre sistemas",
      "Alcance, etapas e inversión definidos en la consulta",
    ],
    destacado: false,
  },
];

export default function Paquetes() {
  return (
    <section className="bg-gray-50 px-4 py-24 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-600">OPCIONES DE IMPLEMENTACIÓN</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Empieza con lo que más impacto puede tener
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            Son referencias para orientarte, no una compra inmediata. Primero tenemos que entender tu negocio y confirmaremos juntos el alcance y la inversión.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {paquetes.map((paquete) => (
            <motion.article
              key={paquete.titulo}
              whileHover={{ y: -4 }}
              className={`flex h-full flex-col rounded-2xl border p-7 shadow-sm sm:p-9 ${
                paquete.destacado
                  ? "border-indigo-300 bg-white shadow-[0_12px_40px_rgba(79,70,229,0.12)]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <span className="text-xs font-bold tracking-widest text-indigo-600">{paquete.etiqueta}</span>
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-2xl font-bold">{paquete.titulo}</h3>
                <p className="text-xl font-bold text-indigo-700">{paquete.precio}</p>
              </div>
              <p className="mt-3 leading-relaxed text-gray-600">{paquete.descripcion}</p>

              <ul className="mt-6 grid gap-3">
                {paquete.entregables.map((entregable) => (
                  <li key={entregable} className="flex items-start gap-3 text-sm text-gray-700">
                    <span aria-hidden="true" className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-yellow-100 text-xs font-bold text-indigo-800">✓</span>
                    {entregable}
                  </li>
                ))}
              </ul>

              <a
                href="#formulario"
                className={`mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-center font-semibold transition ${
                  paquete.destacado
                    ? "bg-yellow-400 text-indigo-950 hover:bg-yellow-300"
                    : "border border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-100"
                }`}
              >
                Evaluar en una consulta de $50 <span aria-hidden="true">↗</span>
              </a>
            </motion.article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-gray-500">
          La consulta de $50 se paga al reservar y se descuenta del proyecto si contratas dentro de 30 días. Licencias, consumo de IA y servicios de terceros se cotizan por separado.
        </p>
      </motion.div>
    </section>
  );
}
