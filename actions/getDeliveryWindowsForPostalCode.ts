import apiAxios from "@/lib/apiAxios";

const getDeliveryWindowsForPostalCode = async (
  postalCode: string,
  countryCode: string
) => {
  const response = await apiAxios.get(
    `checkout/deliverywindow/${countryCode}/${postalCode}`
  );
  return response.data;
};

export default getDeliveryWindowsForPostalCode;