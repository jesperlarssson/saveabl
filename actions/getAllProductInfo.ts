import { productInfo } from "@/lib/mealkits";
import { ProductInfo } from "@/types";

import { cookies } from "next/headers";

const getAllProductInfo = async (): Promise<ProductInfo[]> => {
  // const supabase = createServerComponentClient({
  //   cookies: cookies,
  // });

  // const data: ProductInfo[] = productInfo;

  // const { data, error } = await supabase
  //   .from("product_info")
  //   .select("*, prices(*)")
  //   .order("created_at", { ascending: true });

  // if (error) {
  //   throw new Error(error.message);
  // }

  return [];
};

export default getAllProductInfo;
