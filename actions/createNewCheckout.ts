import axios from "axios";

export const createNewCheckout = async (
  checkoutInfo: {
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    name: string;
    phone: string;
    productId: string;
    deliveryWindow: {
      start: number;
      end: number;
    };
    email: string;
    password: string;
    deliveryPeriodId: string;
    extraInfo: string;
  }
) => {
  const url = "http://127.0.0.1:5001/saveabl-development/europe-west3/main/api/checkout"; // Update with your API endpoint
  try {
    const response = await axios.post(url, checkoutInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // The Stripe checkout session ID or any response you expect
  } catch (error) {
    console.error("An error occurred while creating checkout:", error);
    throw error;
  }
};
