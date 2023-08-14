
import getRemainingMealkitsFromRange from "@/actions/getRemainingMealkitsFromRange";

export async function POST(request: Request) {
  const body = await request.json();
  const epoch = body.epoch;

  const result: number = await getRemainingMealkitsFromRange(epoch);


  return new Response(JSON.stringify(result));
}
