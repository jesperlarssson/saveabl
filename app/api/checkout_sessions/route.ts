import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-11-15",
});

export async function POST(request: Request) {
  const body = await request.json();
  const { customerId, mode, items } = body;

  try {
    // Ensure customerId is provided
    if (!customerId) {
      throw new Error("customerId is required");
    }

    // Create a billing portal session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      allow_promotion_codes: true,
      mode: mode ?? "payment",
      // payment_method_types: ['card', 'klarna'],
      line_items: items ?? [],
      success_url: `https://www.saveabl.com/success?session_id={CHECKOUT_SESSION_ID}${
        mode === "subscription" ? "&recurring=true" : ""
      }`,
      cancel_url: `https://www.saveabl.com/bestall`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    throw error;
  }
}
