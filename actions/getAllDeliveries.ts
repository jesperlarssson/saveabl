import { Delivery } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getAllDeliveries = async (): Promise<Delivery[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("deliveries")
    .select("*, mealkits(*)")
    .order("created_at", { ascending: false });


  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getAllDeliveries;
