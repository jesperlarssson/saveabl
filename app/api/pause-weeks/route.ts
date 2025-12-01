// app/api/pause-weeks/route.ts
import { NextResponse } from "next/server";
import { getPauseWeekSettings } from "@/lib/hygraph";

export const runtime = "nodejs";         // säkra Node-miljö för env/tokens
export const dynamic = "force-dynamic";  // tvinga dynamiskt (ingen prerender)
export const revalidate = 0;             // ingen ISR

export async function GET() {
  try {
    const settings = await getPauseWeekSettings();

    const weeks = settings?.weeks ?? [];
    const enabled = settings?.enabled ?? true;

    return new NextResponse(JSON.stringify({ weeks, enabled }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
      },
    });
  } catch (error) {
    console.error("Failed to load pause week settings", error);

    // Om något går fel: låt funktionen vara på (enabled: true) men utan veckor
    return new NextResponse(JSON.stringify({ weeks: [], enabled: true }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
      },
    });
  }
}
