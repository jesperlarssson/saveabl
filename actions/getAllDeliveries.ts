import { Delivery } from "@/types";

import { cookies } from "next/headers";

const getAllDeliveries = async (): Promise<Delivery[]> => {
  // const supabase = createServerComponentClient({
  //   cookies: cookies,
  // });

  // const { data: sessionData, error: sessionError } =
  //   await supabase.auth.getSession();
  //   console.log(sessionData?.session?.user.role)
  //    console.log(sessionData?.session?.user.email)
  // if (sessionError) {
  //   console.log(sessionError.message);
  //   return [];
  // }

  // const { data, error } = await supabase
  //   .from("deliveries")
  //   .select("*, mealkits(*), users(*)")
  //   .order("created_at", { ascending: false });

  // if (error) {
  //   console.log(error.message);
  // }

  return [];
};

export default getAllDeliveries;
