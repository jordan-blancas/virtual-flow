"use client";
import { motion } from "framer-motion";
import { useState, useEffect, Fragment } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Listbox } from "@headlessui/react";

export default function Formulario() {
  const [enviado, setEnviado] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    const fridays = [];
    const today = new Date();
    let d = new Date(today);
    d.setDate(d.getDate() + 1);
    d.setHours(12, 0, 0, 0);

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

    const fechaCompleta = new Date(`${date}T${hour}`);
    const ahora = new Date();

    if (fechaCompleta <= ahora) {
      alert("La fecha y hora deben ser futuras.");
      return;
    }

    const diaSemana = fechaCompleta.getDay();
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
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                required
                name="email"
                type="email"
                placeholder="Correo electrónico"
                className="sm:col-span-2 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <PhoneInput
  country={'pe'}
  value={telefono}
  onChange={(phone) => setTelefono(phone)}
  inputProps={{
    name: 'telefono',
    required: true,
  }}
  containerClass="w-full"
  inputClass="!w-full !pl-[58px] !h-12 !rounded !border !border-gray-300 focus:!outline-none focus:!ring-2 focus:!ring-indigo-400"
  buttonClass="!h-12 !border-none !bg-transparent"
  dropdownClass="!z-50"
/>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Fecha personalizada */}
              <Listbox value={fecha} onChange={setFecha}>
                <div className="relative">
                  <Listbox.Button className="w-full p-3 rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-left">
                    {fecha
                      ? availableDates.find((d) => d.value === fecha)?.label
                      : "Selecciona un viernes"}
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg">
                    {availableDates.map((d) => (
                      <Listbox.Option
                        key={d.value}
                        value={d.value}
                        as={Fragment}
                      >
                        {({ active, selected }) => (
                          <li
                            className={`cursor-pointer select-none p-3 ${
                              active ? "bg-indigo-100" : ""
                            } ${selected ? "font-semibold" : ""}`}
                          >
                            {d.label}
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>

              {/* Hora personalizada */}
              <Listbox value={hora} onChange={setHora}>
                <div className="relative">
                  <Listbox.Button className="w-full p-3 rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-left">
                    {hora || "Hora disponible"}
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg">
                    {["09:00", "10:00", "16:00", "17:00", "18:00"].map((h) => (
                      <Listbox.Option key={h} value={h} as={Fragment}>
                        {({ active, selected }) => (
                          <li
                            className={`cursor-pointer select-none p-3 ${
                              active ? "bg-indigo-100" : ""
                            } ${selected ? "font-semibold" : ""}`}
                          >
                            {h}
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            <textarea
              name="mensaje"
              rows={4}
              placeholder="¿En qué necesitas ayuda?"
              className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-500 transition"
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
