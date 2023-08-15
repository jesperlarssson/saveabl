import { Delivery, Mealkit } from "@/types";

import { cookies } from "next/headers";

const getAllMealkits = async (): Promise<Mealkit[]> => {
  // const supabase = createServerComponentClient({
  //   cookies: cookies,
  // });

  // const { data: sessionData, error: sessionError } =
  //   await supabase.auth.getSession();
  // if (sessionError) {
  //   console.log(sessionError.message);
  //   return [];
  // }

  // const { data, error } = await supabase
  //   .from("mealkits")
  //   .select("*,  products(*)")
  //   .order("created_at", { ascending: false });


  // if (error) {
  //   console.log(error.message);
  // }

  return [];
};

export default getAllMealkits;
