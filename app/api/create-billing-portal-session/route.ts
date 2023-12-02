import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: '2022-11-15', 
});

export async function POST(request: Request) {
  const body = await request.json();
  const customerId = body.customerId;

  try {
    // Ensure customerId is provided
    if (!customerId) {
        throw new Error("customerId is required");
    }

    // Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: 'https://www.saveabl.com/mina-sidor', // Replace with your return URL
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    throw error;
  }
}
