import { NextResponse } from "next/server";
import { getPaginatedRecipes, getRecipesForWeek } from "@/lib/hygraph";

// 🔒 Ingen cache – hämta alltid färsk data
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await getRecipesForWeek(body.weekNumber);

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error in for-week-number route:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
        },
      }
    );
  }
}
