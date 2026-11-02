import { confirmBookingEmail } from "../../lib/confirmBookingEmail";
import { getStripe } from "../../lib/stripe";
import { getSupabaseAdmin } from "../../lib/supabaseAdmin";

function isReservationStoreUnavailable(error) {
  return ["42P01", "PGRST205"].includes(error.code) ||
    error.message?.includes("Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const sessionId = typeof req.query.session_id === "string" ? req.query.session_id : "";
  if (!sessionId.startsWith("cs_")) {
    return res.status(400).json({ error: "Falta una sesión de pago válida." });
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return res.status(409).json({ error: "El pago aún no aparece confirmado." });
    }

    try {
      const { error } = await getSupabaseAdmin()
        .from("reservas")
        .update({ status: "paid", paid_at: new Date().toISOString() })
        .eq("stripe_session_id", session.id)
        .eq("status", "pending");
      if (error && !isReservationStoreUnavailable(error)) throw error;
    } catch (storeError) {
      if (!isReservationStoreUnavailable(storeError)) throw storeError;
    }

    try {
      await confirmBookingEmail(session.id);
    } catch (emailError) {
      console.error("No se pudo enviar la confirmación de reserva:", emailError.message);
    }

    return res.status(200).json({
      booking: {
        name: session.metadata.name,
        date: session.metadata.date,
        hour: session.metadata.hour,
        email: session.metadata.email,
      },
    });
  } catch (error) {
    console.error("Error al verificar sesión Stripe:", error.message);
    return res.status(500).json({ error: "No se pudo verificar el pago." });
  }
}