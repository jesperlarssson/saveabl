"use client";

import useCheckout from "@/hooks/useCheckout";
import React from "react";

const Checkout = () => {
  const {
    product,
    addOns,
    shippingCost,
    getTotalPrice,
    removeAddOn,
    removeMealKit,
    addAddOn,
  } = useCheckout();

  return (
    <div>
      <h1>Varukorg</h1>
      <h2>{product?.title}</h2>
      <h2>{product?.price}</h2>
      <h2>{product?.description}</h2>
    </div>
  );
};

export default Checkout;
