import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { date, hour, name, email, telefono } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // Reemplaza con el ID de tu precio creado en Stripe
          price: 'price_1RoyCXITly8YghZ7aF7LYixX',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/api/calendar-success?name=${name}&date=${date}&hour=${hour}&email=${email}&telefono=${telefono}`,
      cancel_url: `${req.headers.origin}/`,
      customer_email: email,
      metadata: {
        name,
        date,
        hour,
        telefono,
        email,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error en checkout:', error.message);
    res.status(500).json({ error: 'Error al crear sesión de pago' });
  }
}
