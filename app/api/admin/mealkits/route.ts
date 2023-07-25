import { NextResponse } from "next/server";
import { upsertMealkitRecord } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  const body = await request.text();

  try {
    const data = await upsertMealkitRecord(JSON.parse(body));
    return NextResponse.json(data);
  } catch (error: any) {
    return new NextResponse(`Server Error: ${error.message}`, { status: 400 });
  }
}
