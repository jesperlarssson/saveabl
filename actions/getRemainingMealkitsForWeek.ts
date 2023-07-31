import { Delivery, Mealkit } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getRemainingMealkitsForWeek = async (
  weekNumber: number
): Promise<number> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: mealkitsData, error: mealkitsError } = await supabase
    .from("mealkits")
    .select("id, quantity, amount_sold")
    .eq("weekNumber", weekNumber)
    .order("created_at", { ascending: false });

  if (mealkitsError || !mealkitsData) {
    console.log(mealkitsError.message);
    throw new Error(mealkitsError.message);
  }


  const remaining = mealkitsData[0]?.quantity - mealkitsData[0]?.amount_sold;
  return  remaining as number;
};

export default getRemainingMealkitsForWeek;
