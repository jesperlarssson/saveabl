import { Delivery, Type } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const addCustomerInfo = async (type: Type): Promise<boolean> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    console.log(sessionError.message);
    return false;
  }

  const { data, error } = await supabase
    .from("users")
    .update({ type: type })
    .eq("id", sessionData?.session?.user.id);

  if (error) {
    console.log(error.message);
  }

  return true;
};

export default addCustomerInfo;
