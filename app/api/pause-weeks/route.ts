// app/api/pause-weeks/route.ts
import { NextResponse } from "next/server";
import { getPauseWeeks } from "@/lib/hygraph";

export async function GET() {
  try {
    const weeks = await getPauseWeeks();
    return NextResponse.json({ weeks });
  } catch (error) {
    console.error("Pause weeks API error:", error);
    return NextResponse.json({ weeks: [] }, { status: 200 });
  }
}
