import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Success() {
  const router = useRouter();
  const { name, date, hour, telefono, link, meet,} = router.query;

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center"
      >
        <h1 className="text-3xl font-bold text-green-700 mb-4">¡Reserva confirmada! ✅</h1>

        {(name && date && hour) ? (
        <>
            <p className="text-gray-700 mb-6">
            Gracias <strong>{name}</strong> por reservar una cita para el{" "}
            <strong>{new Date(date).toLocaleDateString("es-PE", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })}</strong>{" "}
            a las <strong>{hour} h</strong>.
            <br />
            Nos contactaremos al número <strong>{telefono}</strong>.
            <br />
            Te hemos enviado un correo con la confirmación.
            </p>

            {link && (
            <p className="text-indigo-600 font-semibold mb-4">
                <a href={decodeURIComponent(link)} target="_blank" rel="noopener noreferrer">
                👉 Ver evento en Google Calendar
                </a>
            </p>
            )}

            {meet && (
            <p className="text-blue-600 font-semibold mb-4">
                <a href={decodeURIComponent(meet)} target="_blank" rel="noopener noreferrer">
                👉 Unirse a la videollamada
                </a>
            </p>
            )}

        </>
        ) : (
        <p className="text-gray-700 mb-6">
            ¡Gracias por tu pago! Te hemos enviado un correo con los detalles.
        </p>
        )}

        <Link href="/" className="text-indigo-600 font-semibold hover:underline">
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  );
}
