import { getPaginatedRecipes } from "@/lib/hygraph";

export async function POST(request: Request) {
  const body = await request.json();
  const { limit, offset, endDate } = body;

  // Hämta recept från Hygraph med paginering
  const hygraphRecipes = await getPaginatedRecipes(limit, offset, endDate);

  return new Response(JSON.stringify(hygraphRecipes));
}
