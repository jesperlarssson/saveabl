import { getPaginatedPosts } from "@/lib/hygraph";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await getPaginatedPosts(body.limit, body.offset);
  return new Response(
    JSON.stringify({ result: result, hasMore: result.length === body.limit })
  );
}
