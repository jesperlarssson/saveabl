import { Delivery } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getDeliveriesByUserId = async (): Promise<Delivery[]> => {
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
    .from("deliveries")
    .select("*, mealkits(*, products(*))")
    .eq("user_id", sessionData?.session?.user.id)
    .order("created_at", { ascending: false });

  console.log(data);

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getDeliveriesByUserId;
