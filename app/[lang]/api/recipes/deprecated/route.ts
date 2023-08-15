import { getPaginatedOldRecipes } from "@/lib/hygraph";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await getPaginatedOldRecipes(
    body.limit,
    body.offset,
  );
  return new Response(JSON.stringify(result));
}
