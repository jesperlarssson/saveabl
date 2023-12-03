import { supabase } from "@/supabase/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { customer_email, customer_id, actions, wish } = body;
  // Validate the input
  if (!customer_email || !actions || !wish || !customer_id) {
    throw new Error("Missing required fields");
  }

  try {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ customer_id, customer_email, actions, wish }]);

    return NextResponse.json({data});
  } catch (error) {
    throw error;
  }
}
