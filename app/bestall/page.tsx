"use client";

import Image from "next/image";

import Button from "@/components/ui/Button";
import useCheckout from "@/hooks/useCheckout";
import { productInfo } from "@/lib/mealkits";
import { addOnsInfo } from "@/lib/addons";
import React, { use, useEffect } from "react";
import Input from "@/components/ui/Input";
import { useGeoData } from "@/providers/GeoProvider";
import { toast } from "react-hot-toast";
import RecipeTile from "@/components/RecipeTile";

const Order = () => {
  const {
    product,
    addOns,
    addMealKit,
    removeMealKit,
    addAddOn,
    removeAddOn,
    updateShippingCost,
  } = useCheckout();

  useEffect(() => {
    console.log(product);
    console.log(addOns);
  }, [product, addOns]);

  return (
    <div>
      <Button onClick={() => addMealKit(productInfo[0])}>
        Prenumeration Varje vecka
      </Button>
      <Button onClick={() => addMealKit(productInfo[1])}>
        Prenumeration Varannan vecka
      </Button>
      <Button onClick={() => addMealKit(productInfo[3])}>Engångsköp</Button>
      <Button onClick={() => addMealKit(productInfo[2])}>Prova på</Button>
      {addOnsInfo.map((addOn) => (
        <>
          <div className="relative cursor-pointer h-80 w-96 overflow-hidden rounded-xl bg-white group drop-shadow-lg hover:drop-shadow-xl hover:-translate-y-0 transition duration-300">
             {/** TailwindCss gradient background to transparent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent h-full"></div>
        <div className="relative bg-gray-300 bg-opacity-40   overflow-hidden h-full  ">
          <Image
            src={addOn.imgSrc}
            alt={addOn.title}
            width={400}
            height={350}
            className="object-cover w-full h-full"
          />
        </div>
          </div>
          <div key={addOn.id}>
            <Button onClick={() => addAddOn(addOn)}>{addOn.title}</Button>
          </div>
        </>
      ))}

      <Input
        type="text"
        placeholder="Postkod"
        onChange={(e) => updateShippingCost(e.target.value)}
        label="Postkod"
      />
    </div>
  );
};

export default Order;
