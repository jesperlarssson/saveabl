import { getWeekNumber } from "@/helpers/format";
import { getRecipesForWeek } from "@/lib/hygraph";

export async function GET() {
  const week = getWeekNumber(new Date());
  const result = await getRecipesForWeek((week) % 52);

  return new Response(JSON.stringify(result));
}
