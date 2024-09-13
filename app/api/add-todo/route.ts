import { supabase } from "@/supabase/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { customer_email, customer_id, actions, wish, new_address } = body;

  // Validera input
  if (!customer_email || !actions || !wish || !customer_id) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Bygg meddelandet för notisen (om det finns en adressändring)
    let message = wish;
    if (new_address) {
      message = `${wish}. Kunden uppdaterade sin adress till: ${new_address}`;
    }

    // Spara notisen i databasen utan tidsstämpel
    const { data, error } = await supabase
      .from("todos")
      .insert([{ 
        customer_id, 
        customer_email, 
        actions, 
        wish: message
      }]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error) {
    // Kasta om felet till en Error-typ
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' });
    }
  }
}




