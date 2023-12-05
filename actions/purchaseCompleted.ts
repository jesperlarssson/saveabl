import axios from "axios";

export const purchaseCompleted = async (stripeSession: any) => {
  const url = ""; // Update with Stripe checkout endpoint
  try {
    const response = await axios.post(url, stripeSession, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("An error occurred while finishing order:", error);
    throw error;
  }
};
