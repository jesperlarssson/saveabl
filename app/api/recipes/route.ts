import { getPaginatedRecipes } from "@/lib/hygraph";
import { tempRecipes } from "@/lib/tempRecipes";
import { getWeekNumber } from "@/helpers/format";

export async function POST(request: Request) {
  const body = await request.json();
  const { limit, offset, endDate } = body;

  const currentWeek = getWeekNumber(new Date());

  // Hämta bara vecka < current week från tempRecipes
  const temp = tempRecipes.data.recepts.filter(recipe => {
    return (
      new Date(recipe.startDate) <= new Date(endDate) &&
      recipe.weekNr < currentWeek // <-- Äldre veckor
    );
  });

  const hygraphRecipes = await getPaginatedRecipes(limit, offset, endDate);

  const allRecipes = [...temp, ...hygraphRecipes];

  const sortedRecipes = allRecipes.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const paginated = sortedRecipes.slice(offset, offset + limit);

  return new Response(JSON.stringify(paginated));
}
