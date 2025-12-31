import { NextResponse } from "next/server";
import { db } from "@/firebase/firebaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, productId, productTitle, locale } = body ?? {};

    if (!email || !productId || !productTitle) {
      return NextResponse.json(
        { error: "Missing email, productId or productTitle" },
        { status: 400 }
      );
    }

    const emailLower = String(email).trim().toLowerCase();
    const title = String(productTitle).trim();
    const titleLower = title.toLowerCase();

    // Dedup per produkt + email (så samma person inte spammar)
    const docId = `${productId}_${emailLower}`.replace(/[\/#\?\[\]]/g, "_");

    await db
      .collection("backInStockSignups")
      .doc(docId)
      .set(
        {
          email: String(email).trim(),
          emailLower,
          productId: String(productId),
          productTitle: title,
          productTitleLower: titleLower,
          locale: locale ?? "sv",
          createdAt: new Date(),
          notifiedAt: null,
          source: "farmshop",
        },
        { merge: false }
      );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("back-in-stock POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
