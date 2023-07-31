import { NextResponse } from "next/server";
import { upsertMealkitRecord } from "@/lib/supabaseAdmin";
import { Mealkit } from "@/types";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  try {
    await upsertMealkitRecord(body as Mealkit);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Server Error: ${error.message}`, { status: 400 });
  }
}
