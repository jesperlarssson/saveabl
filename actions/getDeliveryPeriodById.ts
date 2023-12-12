import apiAxios from "@/lib/apiAxios";
<<<<<<< HEAD
import { db, auth } from "@/firebase/firebaseAdmin";
=======
>>>>>>> c1c82f9 (create form for filling in customer information)

const getDeliveryPeriodsById = async (
  id: string
) => {
  const response = await apiAxios.get(`periods/${id}`, {
    headers: {
<<<<<<< HEAD
        Authorization: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
=======
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
>>>>>>> c1c82f9 (create form for filling in customer information)
      },
  }
  );
  return response.data;
};

export default getDeliveryPeriodsById;