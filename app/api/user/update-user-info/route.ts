
import addCustomerInfo from "@/actions/addCustomerInfo";

export async function POST(request: Request) {
  const body = await request.json();
  const type = body.type;

  const result: boolean = await addCustomerInfo(type)


  return new Response(JSON.stringify(result));
}
