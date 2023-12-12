import apiAxios from "@/lib/apiAxios";
import { db, auth } from "@/firebase/firebaseAdmin";

const getDeliveryPeriodsById = async (
  id: string
) => {
  const response = await apiAxios.get(`periods/${id}`, {
    headers: {
        Authorization: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
      },
  }
  );
  return response.data;
};

export default getDeliveryPeriodsById;