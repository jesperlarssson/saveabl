import { NextResponse } from "next/server";
import { getPaginatedRecipes } from "@/lib/hygraph";

// 🔒 Ingen cache – hämta alltid färsk data
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { limit, offset, endDate } = body;

    // Hämta recept från Hygraph med paginering
    const hygraphRecipes = await getPaginatedRecipes(limit, offset, endDate);

    return NextResponse.json(hygraphRecipes, {
      headers: {
        "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error in paginated recipes route:", error);
    return NextResponse.json(
      { error: "Failed to fetch paginated recipes" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
        },
      }
    );
  }
}
