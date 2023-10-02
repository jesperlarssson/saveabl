import axios from "axios";

export const putUserDetails = async (
  token: string | undefined,
  userInfo: {
    name: string;
    phone: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
    };
    extraInfo: string;
  }
) => {
  const url =
    "http://127.0.0.1:5001/saveabl-development/europe-west3/main/api/me";
  try {
    const response = await axios.put(url, userInfo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // The updated user info
  } catch (error) {
    console.error("An error occurred while updating user info:", error);
    throw error;
  }
};
