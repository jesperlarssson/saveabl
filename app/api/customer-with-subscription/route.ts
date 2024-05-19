import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: '2022-11-15', 
});

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email;

  try {

    // Ensure email is provided
    if (!email) {
        throw new Error("Email is required");
    }

    // Find customer by email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
        throw new Error("Customer not found");
    }

    const customer = customers.data[0];

    // Fetch active subscriptions for the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
    });

    const res = { customer, activeSubscriptions: subscriptions.data };


    return NextResponse.json(res);
  } catch (error) {
    throw error;
  }
}
