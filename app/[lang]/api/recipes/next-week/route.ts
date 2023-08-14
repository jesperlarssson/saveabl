import { getWeekNumber } from "@/helpers/format";
import { getRecipesForWeek } from "@/lib/hygraph";

export async function GET() {
  const week = getWeekNumber(new Date());
  console.log(week);
  const result = await getRecipesForWeek(week + 1);

  return new Response(JSON.stringify(result));
}
