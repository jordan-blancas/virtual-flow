"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // <- este es el import de estilos



export default function Formulario() {
  const [enviado, setEnviado] = useState(false);
  const [telefono, setTelefono] = useState(""); // ← Esta línea es clave
  const [availableDates, setAvailableDates] = useState([]);

    useEffect(() => {
  const fridays = [];
  const today = new Date();

  // Empezamos desde mañana para evitar que hoy mismo se considere (evita error del jueves)
  let d = new Date(today);
  d.setDate(d.getDate() + 1);
  d.setHours(12, 0, 0, 0); // evita errores de zona horaria GMT

  while (fridays.length < 6) {
    if (d.getDay() === 5) {
      fridays.push({
        value: d.toISOString().split("T")[0],
        label: d.toLocaleDateString("es-PE", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
    }
    d.setDate(d.getDate() + 1);
  }

  setAvailableDates(fridays);
}, []);


  const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.nombre.value;
  const email = form.email.value;
  const date = form.fecha.value;
  const hour = form.hora.value;

  // Validaciones de día y hora
  const fechaCompleta = new Date(`${date}T${hour}`);
  const ahora = new Date();

  if (fechaCompleta <= ahora) {
    alert("La fecha y hora deben ser futuras.");
    return;
  }

  const diaSemana = fechaCompleta.getDay(); // 5 = viernes
  const horaNum = fechaCompleta.getHours();

  const horaValida = (horaNum >= 9 && horaNum < 11) || (horaNum >= 16 && horaNum < 19);

  if (diaSemana !== 5 || !horaValida) {
    alert(`Solo tenemos cita disponible para el viernes de ${date} en los bloques de 9–11am o 4–7pm.`);
    return;
  }
  const soloNumeros = telefono.replace(/\D/g, '');
if (!telefono || soloNumeros.length < 8) {
  alert("Por favor, ingresa un número de teléfono válido con al menos 8 dígitos.");
  return;
}
   


  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, date, hour, telefono }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("No se pudo generar el enlace de pago.");
    }
  } catch (error) {
    console.error("Error al redirigir a Stripe:", error);
    alert("Ocurrió un error al procesar el pago.");
  }
};
;


  return (
    <section id="formulario" className="py-20 px-4 bg-white text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Reserva una cita</h2>
        <p className="text-center text-gray-600 mb-10">
          Completa el formulario y asegura tu espacio.
        </p>

        {!enviado ? (
        <form
        onSubmit={handleSubmit}
        className="grid gap-6 bg-gray-50 p-6 rounded-xl shadow-lg"
        >
        <input
            required
            name="nombre"
            type="text"
            placeholder="Tu nombre"
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="grid grid-cols-3 gap-4">
            <input
                required
                name="email"
                type="email"
                placeholder="Correo electrónico"
                className="col-span-2 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="col-span-1">
                <PhoneInput
                    country={'pe'}
                    value={telefono}
                    onChange={(phone) => setTelefono(phone)}
                    inputProps={{
                        name: 'telefono',
                        required: true,
                    }}
                    containerClass="w-full"
                    inputClass="!w-full !h-[48px] !rounded !border !border-gray-300 focus:!outline-none focus:!ring-2 focus:!ring-indigo-400"
                    />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
        <select
            required
            name="fecha"
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
            <option value="">Selecciona un viernes</option>
            {availableDates.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
            ))}
        </select>

        <select
            required
            name="hora"
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
            <option value="">Hora disponible</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
        </select>
        </div>
        <textarea
            name="mensaje"
            rows={4}
            placeholder="¿En qué necesitas ayuda?"
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        ></textarea>
        <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-500 transition"
        >
            Reservar y pagar
        </button>
        </form>

        ) : (
          <div className="text-center text-green-600 font-semibold text-lg">
            ✅ ¡Reserva recibida! Pronto te contactaremos.
          </div>
        )}
      </motion.div>
    </section>
  );
}
