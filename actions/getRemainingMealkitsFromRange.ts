import { Delivery, Mealkit } from "@/types";

import { cookies } from "next/headers";

const getRemainingMealkitsFromRange = async (
  epoch: number
): Promise<number> => {
  // const supabase = createServerComponentClient({
  //   cookies: cookies,
  // });

  // const { data: mealkitsData, error: mealkitsError } = await supabase
  //   .from("mealkits")
  //   .select("id, quantity")
  //   .gte("(delivery_range->'start')::integer", epoch)
  //   .lte("(delivery_range->'end')::integer", epoch)
  //   .order("created_at", { ascending: false });
    
  // if (mealkitsError || !mealkitsData) {
  //   throw new Error(mealkitsError.message);
  // }

  // if (mealkitsData.length === 0) {
  //   throw new Error("No mealkits found for this date range");
  // }

  // const mealkit_id = (mealkitsData[0]?.id as string) || "";
  // console.log(mealkit_id);

  // const {
  //   data: deliveriesData,
  //   error: deliveriesError,
  //   count,
  // } = await supabase
  //   .from("deliveries")
  //   .select("*", { count: "exact" })
  //   .eq("mealkit_id", mealkit_id);

  // if (deliveriesError) {
  //   console.log("DELIVERY " + deliveriesError.message);
  // }
  // const sold = count || 0;
  // const remaining = mealkitsData[0]?.quantity - sold;
  return 1;
};

export default getRemainingMealkitsFromRange;
