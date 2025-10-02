import { getWeekNumber } from "@/helpers/format";
import { getRecipesForWeek } from "@/lib/hygraph";

export async function GET() {
  const week = getWeekNumber(new Date());
  const result = await getRecipesForWeek((week + 2) % 52);

  // Sortera dag 1 → dag 3 om det av någon anledning inte redan är det
  result.sort((a: { recipeNumber: any; }, b: { recipeNumber: any; }) => (a.recipeNumber || 0) - (b.recipeNumber || 0));

  return new Response(JSON.stringify(result));
}
