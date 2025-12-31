import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-11-15",
});

const taxRate12Sweden = "txr_1Qix0YEhPZIzKmuixfQmLrZg";
const taxRate25Denmark = "txr_1Qix0lEhPZIzKmuiCaVKnpLH";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { items, country, customerId } = body as {
      items: { priceId: string; quantity: number }[];
      country?: "SE" | "DK";
      customerId?: string;
    };

    if (!items?.length) {
      return new NextResponse("items is required", { status: 400 });
    }

    const normalizedCountry: "SE" | "DK" = country === "DK" ? "DK" : "SE";
    const taxRate =
      normalizedCountry === "DK" ? taxRate25Denmark : taxRate12Sweden;

    const lineItems = items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
      tax_rates: [taxRate],
    }));

    const session = await stripe.checkout.sessions.create({
      allow_promotion_codes: true,
      mode: "payment",
      line_items: lineItems,

      // ✅ Återanvänd kund om vi har customerId
      ...(customerId ? { customer: customerId } : {}),

      // ✅ Visa alltid namn-fält (email tas alltid av Stripe Checkout)
      custom_fields: [
        {
          key: "full_name",
          label: { type: "custom", custom: "Namn" },
          type: "text",
          text: { minimum_length: 2 },
          optional: false,
        },
      ],

      success_url: `https://www.saveabl.com/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://www.saveabl.com/gardsbutik`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("farmshop-checkout-session error:", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
