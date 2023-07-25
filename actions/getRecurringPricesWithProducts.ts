import { Price } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getRecurringPricesWithProducts = async (): Promise<Price[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from("prices")
    .select("*, products(*)")
    .eq("type", "recurring");

  console.log(data);

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getRecurringPricesWithProducts;
