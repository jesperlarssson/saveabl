import { getPaginatedRecipes, getRecipesForWeek } from "@/lib/hygraph";

export async function POST(request: Request) {
  const body = await request.json();

  const result = await getRecipesForWeek(body.weekNumber);

  return new Response(JSON.stringify(result));
}
