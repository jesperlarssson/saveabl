import { NextResponse } from "next/server";
import { getWeekNumber } from "@/helpers/format";
import { getRecipesForWeek } from "@/lib/hygraph";

// 🔒 Ingen cache – hämta alltid färsk data
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  try {
    const week = getWeekNumber(new Date());
    const result = await getRecipesForWeek((week + 1) % 52);

    // Sortera dag 1 → dag 3 om det inte redan är så
    result.sort(
      (a: { recipeNumber: any }, b: { recipeNumber: any }) =>
        (a.recipeNumber || 0) - (b.recipeNumber || 0)
    );

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error in next-week route:", error);
    return NextResponse.json(
      { error: "Failed to fetch next week recipes" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
        },
      }
    );
  }
}
