import { NextResponse } from "next/server";
import { getRecipeWeekConfig } from "@/lib/hygraph";

// 🔒 Inga statiska snapshots – hämta alltid färskt
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
// (valfritt) kör på edge om ni vill ha superlåg latens
// export const runtime = "edge";

export async function GET() {
  try {
    const cfg = await getRecipeWeekConfig();

    return NextResponse.json(
      { week: cfg?.nextWeekOrderUntil ?? null },
      {
        headers: {
          // Tala om för mellanlager och browser att inte cacha
          "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
        },
      }
    );
  } catch (e) {
    console.error("RecipeWeekConfig error:", e);
    return NextResponse.json(
      { week: null },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
        },
      }
    );
  }
}
