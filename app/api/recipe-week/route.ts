import { NextResponse } from "next/server";
import { getRecipeWeekConfig } from "@/lib/hygraph";

export async function GET() {
  try {
    const cfg = await getRecipeWeekConfig();
    return NextResponse.json({ week: cfg?.nextWeekOrderUntil ?? null });
  } catch (e) {
    console.error("RecipeWeekConfig error:", e);
    return NextResponse.json({ week: null }, { status: 500 });
  }
}
