import { Delivery, Mealkit } from "@/types";
import { cookies } from "next/headers";

const getRemainingMealkitsForWeek = async (
  weekNumber: number
): Promise<number> => {
  // const supabase = createServerComponentClient({
  //   cookies: cookies,
  // });

  // const { data: mealkitsData, error: mealkitsError } = await supabase
  //   .from("mealkits")
  //   .select("id, quantity, amount_sold")
  //   .eq("week_number", weekNumber)
  //   .order("created_at", { ascending: false });

  // if (mealkitsError || !mealkitsData) {
  //   console.log(mealkitsError.message);
  //   throw new Error(mealkitsError.message);
  // }


  // const remaining = mealkitsData[0]?.quantity - mealkitsData[0]?.amount_sold;
  return  1;
};

export default getRemainingMealkitsForWeek;
