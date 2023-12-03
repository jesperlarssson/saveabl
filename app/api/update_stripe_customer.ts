import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-11-15",
});

export async function POST(request: Request) {
  const body = await request.json();
  const {
    id,
    email,
    name,
    metadata,
    city,
    country,
    description,
    line1,
    postal_code,
    phone,
  } = body;

  try {
    const customer = await stripe.customers.update(id, {
      email,
      name,
      metadata,
      address: {
        city,
        country,
        line1,
        postal_code,
      },
      phone,
      description,
      shipping: {
        name,
        address: {
          city,
          country,
          line1,
          postal_code,
        },
        phone,
      },
    });

    return NextResponse.json({ stripeCustomer: customer });
  } catch (error) {
    throw error;
  }
}
