"use client";
import useCheckout from "@/hooks/useCheckout";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const CheckoutBasket = () => {
  const {
    product,
    addOns,
    shippingCost,
    getTotalPrice,
    addMealKit,
    removeMealKit,
    addAddOn,
    removeAddOn,
  } = useCheckout();

  return (
    <div
      className={twMerge(
        `fixed bottom-0 left-0 w-full p-8 bg-primary z-40 transition-all duration-300 ease-in-out flex justify-between`,
        product ? `translate-y-0` : `translate-y-full`
      )}
    >
      <div>
        {product && (
          <div key={product.id} className="flex gap-2 bg-white bg-opacity-25">
            <div className="w-8 h-8 rounded-xl overflow-auto relative">
              <Image
                fill
                className="object-cover"
                src={product.imgSrc}
                alt=""
              />
            </div>
            <div>
              <p>{product.title}</p>
              <p>{product.price}</p>
              <button onClick={() => removeMealKit()}>Ta bort</button>
            </div>
          </div>
        )}
        {addOns.map((addOn) => (
          <div key={addOn.id}>
            <p>{addOn?.title}</p>
            <p>{addOn?.quantity}</p>
            <button onClick={() => removeAddOn(addOn.id)}>Ta bort</button>
          </div>
        ))}
      </div>
      <div>
        <p>{shippingCost > 0 ? `Frakt: ${shippingCost}` : "Fri frakt"}</p>
        <p>Totalt: {getTotalPrice()}</p>
      </div>
    </div>
  );
};

export default CheckoutBasket;
