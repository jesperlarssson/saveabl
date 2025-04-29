import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-11-15",
});

// Här anger du dina riktiga tax rate-IDs från Stripe
const taxRate12Sweden = "txr_1Qix0YEhPZIzKmuixfQmLrZg"; // <-- Ersätt med ditt riktiga 12% tax rate ID
const taxRate25Denmark = "txr_1Qix0lEhPZIzKmuiCaVKnpLH"; // <-- Ersätt med ditt riktiga 25% tax rate ID

export async function POST(request: Request) {
  const body = await request.json();
  const { customerId, mode, items, country } = body;

  try {
    if (!customerId) {
      throw new Error("customerId is required");
    }

    const lineItems = items.map((item: {
      [x: string]: any; price: string 
}) => ({
      price: item.price,
      quantity: item.quantity,
      tax_rates: [country === "DK" ? taxRate25Denmark : taxRate12Sweden],
    }));

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      allow_promotion_codes: true,
      mode: mode ?? "payment",
      line_items: lineItems,
      success_url: `https://www.saveabl.com/success?session_id={CHECKOUT_SESSION_ID}${
        mode === "subscription" ? "&recurring=true" : ""
      }`,
      cancel_url: `https://www.saveabl.com/bestall`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
