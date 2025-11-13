// app/api/add-todo/route.ts
import { supabase } from "@/supabase/supabaseClient";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function sendEmail({ to, subject, html, replyTo }: { to: string; subject: string; html: string; replyTo?: string }) {
  const apiKey = process.env.RESEND_API_KEY!;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "🔔 Saveabl <onboarding@resend.dev>", // testläge via Resend
      to: [to],                                // måste vara kontots e-post i gratis/testläge
      subject,
      html,
      reply_to: replyTo ? [replyTo] : undefined, // gör så man kan svara direkt till kunden
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("Email send error:", txt);
    throw new Error(`Email failed: ${txt}`);
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { customer_email, customer_id, actions, wish, new_address } = body;

  // Grundläggande validering
  if (!customer_email || !actions || !wish || !customer_id) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Bygg meddelandet (lägg till ny adress om det finns)
    let message = wish;
    if (new_address) {
      message = `${wish}. Kunden uppdaterade sin adress till: ${new_address}`;
    }

    // 1️⃣ Spara händelsen i Supabase
    const { data, error } = await supabase
      .from("todos")
      .insert([{ customer_id, customer_email, actions, wish: message }])
      .select()
      .single();

    if (error) throw error;

    // 2️⃣ Skicka mejl till hello@saveabl.se (testläge)
    const subject = `Ny händelse: ${actions} – ${customer_email}`;
    const html = `
      <p><strong>Ny kundhändelse</strong></p>
      <ul>
        <li><b>Kund-ID:</b> ${customer_id}</li>
        <li><b>E-post:</b> ${customer_email}</li>
        <li><b>Åtgärd:</b> ${actions}</li>
        <li><b>Meddelande:</b> ${message}</li>
      </ul>
      <p style="margin-top:12px;">(Testmejl från Saveabl via Resend)</p>
    `;

    await sendEmail({
      to: "hello@saveabl.se", // måste vara kontots adress i testläge
      subject,
      html,
      replyTo: customer_email, // “Svara” går till kunden
    });

    return NextResponse.json({ data });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
