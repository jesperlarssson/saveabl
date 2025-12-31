import { NextResponse } from "next/server";
import { supabase } from "@/supabase/supabaseClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* --------------------------- EMAIL VIA RESEND --------------------------- */

async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY!;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Samma upplägg som add-todo (testläge)
      from: "🔔 Saveabl <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
      reply_to: replyTo ? [replyTo] : undefined,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("Email send error:", txt);
    throw new Error(`Email failed: ${txt}`);
  }
}

/* ------------------------------ API ROUTE ------------------------------ */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      wish,
      requestType, // ex "DOUBLE_UP"
      source,      // ex "farmshop"
    } = body ?? {};

    // Grundvalidering
    if (!email || !wish || !requestType) {
      return NextResponse.json(
        { error: "Missing required fields: email, wish, requestType" },
        { status: 400 }
      );
    }

    const emailClean = String(email).trim().toLowerCase();
    const wishClean = String(wish).trim();

    // Minimal & tydlig todo-text
    const messageParts: string[] = [];
    messageParts.push(wishClean);
    if (source) messageParts.push(`Källa: ${String(source).trim()}`);

    const message = messageParts.join(". ");

    // Spara i Supabase todos (samma struktur som add-todo)
    const payload = {
      customer_id: "guest",
      customer_email: emailClean,
      actions: `farmshop_${String(requestType).toLowerCase()}`, // farmshop_double_up
      wish: message,
    };

    const { data, error } = await supabase
      .from("todos")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    // Skicka mejl (testläge via Resend)
    const subject = `Ny händelse: farmshop_${String(requestType).toLowerCase()} – ${emailClean}`;

    const html = `
      <p><strong>Ny kundhändelse (Gårdsbutik)</strong></p>
      <ul>
        <li><b>Kund-ID:</b> guest</li>
        <li><b>E-post:</b> ${emailClean}</li>
        <li><b>Åtgärd:</b> farmshop_${String(requestType).toLowerCase()}</li>
        <li><b>Meddelande:</b> ${message}</li>
      </ul>
      <p style="margin-top:12px;">(Testmejl från Saveabl via Resend)</p>
    `;

    const toEmail = process.env.RESEND_TO_EMAIL || "hello@saveabl.se";

    await sendEmail({
      to: toEmail,
      subject,
      html,
      replyTo: emailClean,
    });

    return NextResponse.json({ ok: true, data });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("farmshop-request POST error:", e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
