import { ProductInfo } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getAllProductInfo = async (): Promise<ProductInfo[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("product_info")
    .select("*, prices(*)")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as ProductInfo[];
};

export default getAllProductInfo;
