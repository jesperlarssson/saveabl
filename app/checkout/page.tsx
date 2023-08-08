"use client";

import addCustomerInfo from "@/actions/addCustomerInfo";
import Button from "@/components/ui/Button";
import useCheckout from "@/hooks/useCheckout";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/lib/helpers";
import { getStripe } from "@/lib/stripeClient";
import { Price } from "@/types";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Checkout = () => {
  const {
    product,
    productType,
    addOns,
    shippingCost,
    getTotalPrice,
    removeAddOn,
    removeMealKit,
    addAddOn,
  } = useCheckout();
  const { user, isLoading, subscription } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async () => {
    setPriceIdLoading(product?.prices?.id);
    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("Must be logged in");
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast("Already subscribed");
    }

    if (!product?.prices?.id) {
      setPriceIdLoading(undefined);
      return toast.error("No price id");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price: product.prices },
      });

      //TODO: Add billing information and type to User
      const res = await fetch("/api/user/update-user-info", {
        method: "POST",
        body: JSON.stringify({
          type: productType,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return toast.error((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  return (
    <div>
      <h1>Varukorg</h1>
      <h2>{product?.title}</h2>
      <h2>{product?.price}</h2>
      <h2>{product?.description}</h2>
      <Button onClick={handleCheckout}>Checkout</Button>
    </div>
  );
};

export default Checkout;
