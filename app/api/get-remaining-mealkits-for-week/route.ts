import getRemainingMealkitsForWeek from "@/actions/getRemainingMealkitsForWeek";

export async function POST(request: Request) {
  const body = await request.json();
  const weekNumber = body.weekNumber;

  // Get Mealkit id with weekNumber
  const result: number = await getRemainingMealkitsForWeek(weekNumber);


  return new Response(JSON.stringify(result));
}
