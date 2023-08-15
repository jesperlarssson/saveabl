import { Price } from "@/types";
import { cookies } from "next/headers";

const getRecurringPricesWithProducts = async (): Promise<Price[]> => {
  // const supabase = createServerComponentClient({
  //   cookies: cookies,
  // });

  // const { data, error } = await supabase
  //   .from("prices")
  //   .select("*, products(*)")
  //   .eq("type", "recurring");


  // if (error) {
  //   console.log(error.message);
  // }

  return [];
};

export default getRecurringPricesWithProducts;
