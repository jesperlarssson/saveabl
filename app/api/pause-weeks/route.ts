// app/api/pause-weeks/route.ts
import { NextResponse } from "next/server";
import { getPauseWeeks } from "@/lib/hygraph";

export const runtime = "nodejs";         // säkra Node-miljö för env/tokens
export const dynamic = "force-dynamic";  // tvinga dynamiskt (ingen prerender)
export const revalidate = 0;             // ingen ISR

export async function GET() {
  try {
    const weeks = await getPauseWeeks();
    // för säkerhets skull: lägg på no-store-headers till CDN
    return new NextResponse(JSON.stringify({ weeks }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
      },
    });
  } catch (error) {
    return NextResponse.json({ weeks: [] }, { status: 200 });
  }
}
