import Head from "next/head";
import { useMemo, useState } from "react";

export default function OportunidadesPage() {
  const [formData, setFormData] = useState({
    apellidos: "",
    nombres: "",
    dni: "",
    fecha_nacimiento_dia: "",
    fecha_nacimiento_mes: "",
    fecha_nacimiento_anio: "",
    correo: "",
    celular: "",
    direccion_actual: "",
    carrera: "",
    ciclo: "",
    nivel_capcut: "",
    nivel_premiere: "",
    nivel_insta360: "",
    nivel_after_effects: "",
    nivel_canva: "",
    nivel_photoshop: "",
    nivel_discord: "",
    nivel_telegram: "",
    nivel_redes: "",
    nivel_foto_reflex: "",
    criterio_1: "",
    criterio_2: "",
    criterio_3: "",
    acepto_horario: false,
    acepto_campo: false,
    acepto_datos: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitState, setSubmitState] = useState({ type: "idle", message: "" });

  const meses = useMemo(
    () => [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    []
  );

  const habilidades = useMemo(
    () => [
      {
        name: "nivel_capcut",
        label: "CapCut",
      },
      {
        name: "nivel_premiere",
        label: "Premiere",
      },
      {
        name: "nivel_insta360",
        label: "Insta360",
      },
      {
        name: "nivel_after_effects",
        label: "After Effects",
      },
      {
        name: "nivel_canva",
        label: "Canva",
      },
      {
        name: "nivel_photoshop",
        label: "Photoshop",
      },
      {
        name: "nivel_discord",
        label: "Discord",
      },
      {
        name: "nivel_telegram",
        label: "Telegram",
      },
      {
        name: "nivel_redes",
        label: "Gestion de redes sociales (Instagram, TikTok, Facebook)",
      },
      {
        name: "nivel_foto_reflex",
        label: "Fotografia con camara reflex o mirrorless",
      },
    ],
    []
  );

  const preguntas = useMemo(
    () => [
      {
        name: "criterio_1",
        pregunta:
          '1. Entregas un video editado y el cliente responde: "no me convence, falta algo". Cual es tu primer paso?',
        opciones: [
          "Ajusto los colores y contraste porque suelen ser el problema",
          "Agrego mas efectos y musica de fondo para que se vea mas dinamico",
          "Le pregunto que video o estilo le gustaria que se parezca",
          "Lo subo a mis redes para ver si a otras personas si les gusta",
        ],
      },
      {
        name: "criterio_2",
        pregunta:
          "2. Vas a publicar contenido en Instagram y en TikTok. Que consideras primero?",
        opciones: [
          "Publico primero en TikTok porque tiene mas alcance organico siempre",
          "Adapto el formato y duracion segun como consume cada plataforma su audiencia",
          "Subo el mismo archivo porque el contenido es lo que importa, no la plataforma",
          "Agrego el logo de la marca en ambos para mantener la identidad visual",
        ],
      },
      {
        name: "criterio_3",
        pregunta:
          "3. Disenas un flyer para un evento. Que elemento debe tener mayor jerarquia visual?",
        opciones: [
          "Una imagen de fondo impactante que capte la atencion inmediata",
          "El logo del organizador para dar credibilidad al evento",
          "La lista completa de actividades para informar a detalle",
          "El nombre del evento y la fecha/lugar, porque eso activa la asistencia",
        ],
      },
    ],
    []
  );

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setSubmitState({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/postulaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitState({
          type: "error",
          message: data.message || "Ocurrio un error al enviar. Intenta nuevamente.",
        });
        return;
      }

      setSubmitState({
        type: "success",
        message:
          "Postulacion enviada. Revisaremos tu informacion y te contactaremos si avanzas al siguiente paso.",
      });
      setFormData({
        apellidos: "",
        nombres: "",
        dni: "",
        fecha_nacimiento_dia: "",
        fecha_nacimiento_mes: "",
        fecha_nacimiento_anio: "",
        correo: "",
        celular: "",
        direccion_actual: "",
        carrera: "",
        ciclo: "",
        nivel_capcut: "",
        nivel_premiere: "",
        nivel_insta360: "",
        nivel_after_effects: "",
        nivel_canva: "",
        nivel_photoshop: "",
        nivel_discord: "",
        nivel_telegram: "",
        nivel_redes: "",
        nivel_foto_reflex: "",
        criterio_1: "",
        criterio_2: "",
        criterio_3: "",
        acepto_horario: false,
        acepto_campo: false,
        acepto_datos: false,
      });
    } catch (error) {
      console.error("Error enviando postulacion:", error);
      setSubmitState({
        type: "error",
        message: "No se pudo enviar en este momento. Intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Convocatoria | Ejecutor Creativo | Virtual Flow</title>
        <meta
          name="description"
          content="Convocatoria abierta para Ejecutor Creativo en Virtual Flow."
        />
      </Head>

      <main className="vfo-job-wrapper">
        <section className="vfo-job-header">
          <div className="vfo-job-eyebrow">Convocatoria · Virtual Flow</div>
          <h1 className="vfo-job-title">Ejecutor Creativo</h1>
          <p className="vfo-job-subtitle">
            Apoyo en produccion audiovisual y contenido digital para proyectos del
            holding
          </p>

          <div className="vfo-meta-grid">
            <div className="vfo-meta-item">
              <div className="vfo-meta-label">Modalidad</div>
              <div className="vfo-meta-value">Remoto + Campo</div>
            </div>
            <div className="vfo-meta-item">
              <div className="vfo-meta-label">Disponibilidad</div>
              <div className="vfo-meta-value">Medio tiempo</div>
            </div>
            <div className="vfo-meta-item">
              <div className="vfo-meta-label">Remuneracion</div>
              <div className="vfo-meta-value">S/ 600 / mes</div>
            </div>
            <div className="vfo-meta-item">
              <div className="vfo-meta-label">Reporta a</div>
              <div className="vfo-meta-value">Supervisor Creativo</div>
            </div>
          </div>
        </section>

        <section className="vfo-section">
          <h2 className="vfo-section-title">Sobre el puesto</h2>
          <p>
            Buscamos un estudiante o profesional junior con perfil creativo para
            apoyar la ejecucion de contenido audiovisual y digital de los
            proyectos del holding (Elite Cultural, Marca Personal, Energetica
            Labs, entre otros).
          </p>
        </section>

        <section className="vfo-section">
          <h2 className="vfo-section-title">Responsabilidades</h2>
          <ul className="vfo-list">
            <li>
              Apoyar en la produccion y edicion de contenido audiovisual
              (filmaciones, podcast, redes sociales)
            </li>
            <li>
              Ejecutar piezas graficas y de video segun lineamientos del
              Supervisor Creativo
            </li>
            <li>
              Asistir en filmaciones de campo (eventos, producciones
              folcloricas, grabaciones de podcast)
            </li>
            <li>
              Gestionar publicacion de contenido en redes sociales bajo
              calendario establecido
            </li>
            <li>
              Organizar y mantener el archivo digital de material audiovisual
            </li>
            <li>Reportar avances semanales de tareas asignadas</li>
          </ul>
        </section>

        <section className="vfo-section">
          <h2 className="vfo-section-title">Requisitos</h2>
          <ul className="vfo-list">
            <li>
              Estudiante de Comunicacion Audiovisual, Diseno Grafico, Marketing
              o carreras afines
            </li>
            <li>
              Manejo de herramientas de edicion de video (CapCut, Premiere,
              DaVinci Resolve, o similar)
            </li>
            <li>
              Manejo basico de diseno grafico (Canva, Photoshop o Illustrator)
            </li>
            <li>
              Disponibilidad para trabajo de campo en Huancayo / Jauja /
              Concepcion / Chupaca
            </li>
            <li>Proactividad y capacidad de trabajo autonomo</li>
            <li>Manejo de redes sociales (Instagram, TikTok, Facebook)</li>
          </ul>
        </section>

        <section className="vfo-section">
          <h2 className="vfo-section-title">Deseable (no excluyente)</h2>
          <div className="vfo-deseable">
            <ul className="vfo-list vfo-list-tight">
              <li>Experiencia previa en produccion de contenido cultural o educativo</li>
              <li>Conocimiento basico de fotografia</li>
              <li>Interes en temas de cultura, ciencia o tecnologia</li>
            </ul>
          </div>
        </section>

        <section className="vfo-section vfo-ofrecemos">
          <h2 className="vfo-section-title">Lo que ofrecemos</h2>
          <ul className="vfo-list">
            <li>
              Experiencia real en un holding con proyectos en tecnologia,
              energia, educacion y cultura
            </li>
            <li>Flexibilidad de horario (medio tiempo)</li>
            <li>Aprendizaje directo en produccion audiovisual profesional</li>
            <li>
              Posibilidad de crecimiento dentro del equipo conforme el holding
              escale
            </li>
          </ul>
        </section>

        <section className="vfo-cta-banner">
          <p>Completa el siguiente formulario para postular · Toma 3 minutos</p>
        </section>

        <section className="vfo-form-container" aria-label="Formulario de postulacion">
          <h3 className="vfo-form-title">Formulario de postulacion</h3>
          <p className="vfo-form-sub">Completa todos los campos obligatorios (*)</p>

          {submitState.type === "success" ? (
            <div className="vfo-success-box">
              <div className="vfo-success-icon">OK</div>
              <h4>Postulacion enviada</h4>
              <p>{submitState.message}</p>
            </div>
          ) : (
            <form className="vfo-form" onSubmit={handleSubmit}>
              <div className="vfo-form-section">Datos personales</div>

              <div className="vfo-field">
                <label htmlFor="apellidos">Apellidos *</label>
                <input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  placeholder="Ej: Gonzales López"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="vfo-field">
                <label htmlFor="nombres">Nombres *</label>
                <input
                  id="nombres"
                  name="nombres"
                  type="text"
                  placeholder="Ej: Pedro Luis"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="vfo-field">
                <label htmlFor="dni">DNI *</label>
                <input
                  id="dni"
                  name="dni"
                  type="text"
                  placeholder="Ej: 12345678"
                  value={formData.dni}
                  onChange={handleChange}
                  minLength={8}
                  maxLength={8}
                  inputMode="numeric"
                  pattern="[0-9]{8}"
                  title="Ingresa exactamente 8 digitos numericos"
                  required
                />
              </div>

              <div className="vfo-field">
                <label>Fecha de nacimiento *</label>
                <div className="vfo-fecha-row">
                  <select
                    name="fecha_nacimiento_dia"
                    value={formData.fecha_nacimiento_dia}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Dia</option>
                    {Array.from({ length: 31 }).map((_, i) => {
                      const d = String(i + 1).padStart(2, "0");
                      return (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    name="fecha_nacimiento_mes"
                    value={formData.fecha_nacimiento_mes}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Mes</option>
                    {meses.map((mes) => (
                      <option key={mes} value={mes}>
                        {mes}
                      </option>
                    ))}
                  </select>
                  <select
                    name="fecha_nacimiento_anio"
                    value={formData.fecha_nacimiento_anio}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Año</option>
                    {Array.from({ length: 18 }).map((_, i) => {
                      const y = String(2007 - i);
                      return (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="vfo-field">
                <label htmlFor="correo">Correo electronico *</label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="vfo-field">
                <label htmlFor="celular">Celular / WhatsApp *</label>
                <input
                  id="celular"
                  name="celular"
                  type="tel"
                  placeholder="Ej: 987654321"
                  value={formData.celular}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="vfo-field">
                <label htmlFor="direccion_actual">Direccion actual *</label>
                <input
                  id="direccion_actual"
                  name="direccion_actual"
                  type="text"
                  placeholder="Ej: Av. Huancavelica 123, Huancayo"
                  value={formData.direccion_actual}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="vfo-field">
                <label htmlFor="carrera">Carrera y universidad/instituto *</label>
                <input
                  id="carrera"
                  name="carrera"
                  type="text"
                  placeholder="Ej: Comunicacion Audiovisual - UNCP"
                  value={formData.carrera}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="vfo-field">
                <label htmlFor="ciclo">Ciclo o año actual *</label>
                <input
                  id="ciclo"
                  name="ciclo"
                  type="text"
                  placeholder="Ej: 6to ciclo"
                  value={formData.ciclo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="vfo-form-section">
                Autoevaluacion de habilidades - De 1 (nulo) a 5 (experto)
              </div>
              <p className="vfo-habilidades-help">
                Usa esta escala en cada habilidad: 1 = nunca lo he usado, 2 = basico,
                3 = intermedio, 4 = avanzado, 5 = experto.
              </p>

              {habilidades.map((skill) => (
                <div className="vfo-field" key={skill.name}>
                  <label>{skill.label} *</label>
                  <div className="vfo-radio-h">
                    {[1, 2, 3, 4, 5].map((value) => {
                      const id = `${skill.name}_${value}`;
                      return (
                        <div key={id}>
                          <input
                            type="radio"
                            name={skill.name}
                            id={id}
                            value={String(value)}
                            checked={formData[skill.name] === String(value)}
                            onChange={handleChange}
                            required={value === 1}
                          />
                          <label htmlFor={id}>{value}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="vfo-form-section">Evaluacion de criterio</div>

              {preguntas.map((item) => (
                <div className="vfo-field" key={item.name}>
                  <label className="vfo-question-label">{item.pregunta} *</label>
                  <div className="vfo-radio-v">
                    {item.opciones.map((opcion, idx) => {
                      const id = `${item.name}_op_${idx}`;
                      return (
                        <div className="vfo-opcion" key={id}>
                          <input
                            type="radio"
                            name={item.name}
                            id={id}
                            value={opcion}
                            checked={formData[item.name] === opcion}
                            onChange={handleChange}
                            required={idx === 0}
                          />
                          <label htmlFor={id}>{opcion}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="vfo-form-section">Condiciones del puesto</div>

              <div className="vfo-check">
                <input
                  type="checkbox"
                  name="acepto_horario"
                  id="acepto_horario"
                  checked={formData.acepto_horario}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="acepto_horario">
                  Entiendo y acepto que el puesto requiere 24 horas semanales con
                  horario flexible a coordinar con el equipo. *
                </label>
              </div>

              <div className="vfo-check">
                <input
                  type="checkbox"
                  name="acepto_campo"
                  id="acepto_campo"
                  checked={formData.acepto_campo}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="acepto_campo">
                  Entiendo y acepto que el puesto puede requerir trabajo de campo
                  en Huancayo, Jauja, Concepcion y Chupaca. *
                </label>
              </div>

              <div className="vfo-check">
                <input
                  type="checkbox"
                  name="acepto_datos"
                  id="acepto_datos"
                  checked={formData.acepto_datos}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="acepto_datos">
                  Acepto que mis datos sean utilizados unicamente para fines de
                  este proceso de seleccion. *
                </label>
              </div>

              {submitState.type === "error" ? (
                <div className="vfo-error-banner">{submitState.message}</div>
              ) : null}

              <button className="vfo-submit" type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar postulacion"}
              </button>
            </form>
          )}
        </section>

        <a
          href="https://wa.me/51908741120?text=Hola%2C%20quisiera%20mas%20informacion%20sobre%20la%20convocatoria%20de%20Ejecutor%20Creativo"
          className="vfo-whatsapp-box"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="vfo-whatsapp-icon" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.92 8.92 0 0 0-7.72 13.4L3 21l3.72-1.29a8.93 8.93 0 0 0 5.33 1.7h0a8.92 8.92 0 0 0 8.9-8.92 8.85 8.85 0 0 0-2.65-6.27Zm-5.55 13.7h0a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.78.96.96-2.7-.18-.28a7.4 7.4 0 0 1 11.6-9.06 7.34 7.34 0 0 1 2.18 5.22 7.42 7.42 0 0 1-7.4 7.43Zm4.06-5.56c-.22-.11-1.3-.64-1.5-.72-.2-.07-.35-.11-.5.11s-.58.72-.71.87-.27.16-.49.05a6.05 6.05 0 0 1-1.78-1.1 6.6 6.6 0 0 1-1.23-1.53c-.13-.22 0-.34.07-.43s.36-.4.49-.6a.36.36 0 0 0 0-.39c-.05-.12-.5-1.2-.68-1.62s-.36-.36-.5-.36-.32 0-.49 0a.94.94 0 0 0-.68.32 2.86 2.86 0 0 0-.9 2.13A4.98 4.98 0 0 0 7.5 13a11.4 11.4 0 0 0 4.35 3.84c2.13.95 2.13.64 2.51.6a2.17 2.17 0 0 0 1.45-1.02 1.8 1.8 0 0 0 .12-1.02c-.05-.1-.2-.16-.42-.27Z" />
          </svg>
          Clic aqui para mayores informes por WhatsApp
        </a>
      </main>

      <style jsx>{`
        .vfo-job-wrapper {
          max-width: 760px;
          margin: 0 auto;
          padding: 2rem 1rem 4rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
          color: #2a2a2a;
          line-height: 1.7;
        }

        .vfo-job-header {
          background: linear-gradient(145deg, #1f2a59 0%, #2f3f92 60%, #27327a 100%);
          color: #eef2ff;
          padding: 40px 32px;
          border-radius: 14px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 18px 30px rgba(31, 42, 89, 0.24);
        }

        .vfo-job-header::before {
          content: "";
          position: absolute;
          top: -45%;
          right: -12%;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(251, 191, 36, 0.24) 0%, transparent 70%);
          border-radius: 50%;
        }

        .vfo-job-eyebrow {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #facc15;
          margin-bottom: 12px;
          font-weight: 700;
          position: relative;
          z-index: 1;
        }

        .vfo-job-title {
          font-size: 30px;
          font-weight: 800;
          margin: 0 0 8px 0;
          color: #ffffff;
          position: relative;
          z-index: 1;
        }

        .vfo-job-subtitle {
          font-size: 14px;
          color: #dbe4ff;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        .vfo-meta-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 24px;
          position: relative;
          z-index: 1;
        }

        .vfo-meta-item {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(250, 204, 21, 0.28);
          border-radius: 10px;
          padding: 12px;
        }

        .vfo-meta-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #c7d2fe;
          margin-bottom: 4px;
          font-weight: 600;
        }

        .vfo-meta-value {
          font-size: 13px;
          font-weight: 700;
          color: #fde68a;
        }

        .vfo-section {
          margin-bottom: 28px;
        }

        .vfo-section-title {
          font-size: 18px;
          font-weight: 800;
          color: #1f2a59;
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 2px solid #facc15;
          display: inline-block;
        }

        .vfo-section p {
          font-size: 14px;
          color: #3f475c;
        }

        .vfo-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .vfo-list li {
          position: relative;
          padding-left: 26px;
          margin-bottom: 10px;
          font-size: 14px;
          color: #2b3344;
        }

        .vfo-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 8px;
          width: 8px;
          height: 8px;
          background: #facc15;
          border-radius: 2px;
        }

        .vfo-list-tight li {
          margin-bottom: 8px;
        }

        .vfo-deseable {
          background: #f8f9ff;
          border-left: 3px solid #facc15;
          border-radius: 0 8px 8px 0;
          padding: 18px 20px;
        }

        .vfo-ofrecemos {
          background: #1f2a59;
          border-radius: 12px;
          padding: 24px 28px;
          color: #eef2ff;
        }

        .vfo-ofrecemos .vfo-section-title {
          color: #ffffff;
          border-bottom-color: #facc15;
        }

        .vfo-ofrecemos li {
          color: #d7defb;
        }

        .vfo-cta-banner {
          background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%);
          border-radius: 12px;
          padding: 24px 28px;
          text-align: center;
          margin: 32px 0;
          box-shadow: 0 12px 24px rgba(245, 158, 11, 0.2);
        }

        .vfo-cta-banner p {
          color: #1a1300;
          font-weight: 700;
          font-size: 15px;
          margin: 0;
        }

        .vfo-form-container {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 32px;
          margin-top: 24px;
          box-shadow: 0 4px 18px rgba(31, 42, 89, 0.08);
        }

        .vfo-form-title {
          font-size: 20px;
          font-weight: 800;
          color: #1f2a59;
          margin: 0 0 6px;
        }

        .vfo-form-sub {
          font-size: 13px;
          color: #64748b;
          margin: 0 0 24px;
        }

        .vfo-form {
          max-width: 640px;
          margin: 0 auto;
        }

        .vfo-form-section {
          font-size: 13px;
          font-weight: 700;
          color: #1f2a59;
          background: #f8f9ff;
          border-left: 3px solid #facc15;
          padding: 8px 14px;
          border-radius: 0 6px 6px 0;
          margin: 28px 0 16px;
        }

        .vfo-habilidades-help {
          margin: -4px 0 14px;
          font-size: 13px;
          color: #475569;
          line-height: 1.5;
        }

        .vfo-field {
          margin-bottom: 16px;
        }

        .vfo-field > label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .vfo-question-label {
          text-transform: none !important;
          letter-spacing: 0 !important;
          font-size: 13px !important;
          color: #1e293b !important;
        }

        .vfo-field input[type="text"],
        .vfo-field input[type="email"],
        .vfo-field input[type="tel"],
        .vfo-field select {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #d6dbe8;
          border-radius: 6px;
          font-size: 14px;
          background: #fafcff;
          color: #1f2937;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }

        .vfo-field input:focus,
        .vfo-field select:focus {
          outline: none;
          border-color: #facc15;
        }

        .vfo-fecha-row {
          display: flex;
          gap: 8px;
        }

        .vfo-fecha-row select {
          flex: 1;
        }

        .vfo-fecha-row select:first-child {
          flex: 0 0 76px;
        }

        .vfo-fecha-row select:last-child {
          flex: 0 0 96px;
        }

        .vfo-radio-h {
          display: flex;
          gap: 4px;
          flex-wrap: nowrap;
        }

        .vfo-radio-h > div {
          flex: 1;
        }

        .vfo-radio-h input[type="radio"] {
          position: absolute;
          opacity: 0;
          width: 1px;
          height: 1px;
          pointer-events: none;
        }

        .vfo-radio-h label {
          display: block;
          text-align: center;
          padding: 10px 4px;
          border: 1px solid #d6dbe8;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 700;
          color: #7c8599;
          transition: all 0.15s;
          text-transform: none;
          letter-spacing: 0;
          margin: 0;
        }

        .vfo-radio-h input[type="radio"]:checked + label {
          background: #facc15;
          border-color: #facc15;
          color: #1a1300;
        }

        .vfo-radio-h label:hover {
          border-color: #facc15;
          color: #b45309;
        }

        .vfo-radio-v .vfo-opcion {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 10px;
        }

        .vfo-radio-v .vfo-opcion input[type="radio"] {
          margin-top: 3px;
          flex-shrink: 0;
          accent-color: #facc15;
        }

        .vfo-radio-v .vfo-opcion label {
          font-size: 13px;
          color: #334155;
          line-height: 1.5;
          font-weight: 400;
          text-transform: none;
          letter-spacing: 0;
          cursor: pointer;
        }

        .vfo-check {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 12px;
        }

        .vfo-check input[type="checkbox"] {
          margin-top: 3px;
          flex-shrink: 0;
          accent-color: #facc15;
          width: 16px;
          height: 16px;
        }

        .vfo-check label {
          font-size: 13px;
          color: #475569;
          font-weight: 400;
          text-transform: none;
          letter-spacing: 0;
        }

        .vfo-submit {
          width: 100%;
          background: #facc15;
          color: #1a1300;
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 24px;
          transition: opacity 0.2s;
          font-family: inherit;
        }

        .vfo-submit:hover {
          opacity: 0.88;
        }

        .vfo-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .vfo-success-box {
          background: #ecfdf3;
          border: 1px solid #86efac;
          border-radius: 10px;
          padding: 24px;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .vfo-success-icon {
          font-size: 24px;
          font-weight: 800;
          color: #15803d;
          margin-bottom: 8px;
        }

        .vfo-success-box h4 {
          color: #166534;
          margin: 0 0 8px;
          font-size: 22px;
        }

        .vfo-success-box p {
          color: #166534;
          margin: 0;
          font-size: 14px;
        }

        .vfo-error-banner {
          background: #fef2f2;
          border: 1px solid #fca5a5;
          color: #dc2626;
          border-radius: 8px;
          padding: 12px 14px;
          font-size: 13px;
          margin-top: 8px;
        }

        .vfo-whatsapp-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: #17a34a;
          color: #ffffff;
          border-radius: 12px;
          padding: 18px 24px;
          margin-top: 32px;
          text-decoration: none;
          font-weight: 700;
          font-size: 15px;
          transition: opacity 0.2s ease;
        }

        .vfo-whatsapp-box:hover {
          opacity: 0.9;
          color: #ffffff;
        }

        .vfo-whatsapp-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        @media (max-width: 720px) {
          .vfo-meta-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .vfo-job-title {
            font-size: 24px;
          }

          .vfo-job-header,
          .vfo-form-container {
            padding: 24px 20px;
          }

          .vfo-radio-h label {
            padding: 8px 2px;
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
}