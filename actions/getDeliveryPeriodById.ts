import apiAxios from "@/lib/apiAxios";

const getDeliveryPeriodsById = async (
  id: string
) => {
  const response = await apiAxios.get(`periods/${id}`, {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      },
  }
  );
  return response.data;
};

export default getDeliveryPeriodsById;