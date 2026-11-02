import Stripe from "stripe";

let stripe;

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Falta STRIPE_SECRET_KEY en las variables de entorno.");
  }
  if (!stripe) stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  return stripe;
}