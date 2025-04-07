import { getPaginatedRecipes } from "@/lib/hygraph";

export const dynamic = 'force-dynamic'; 

export async function POST(request: Request) {
  const body = await request.json();
  const result = await getPaginatedRecipes(
    body.limit,
    body.offset,
    body.endDate
  );
  return new Response(JSON.stringify(result));
}
