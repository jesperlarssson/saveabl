"use client";

import React from "react";

import Image from "next/image";
import { AddOn } from "@/lib/addons";
import { AnimatePresence, motion } from "framer-motion";

import useCheckout from "@/hooks/useCheckout";

interface AddOnTileProps {
  addon: AddOn;
}

const AddOnTile: React.FC<AddOnTileProps> = ({ addon }) => {
  const { addAddOn, removeAddOn, addOns } = useCheckout();
  return (
    <motion.div
      key={addon.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=""
    >
      <div className="relative w-80 h-80 rounded-t-lg overflow-auto">
        <Image
          src={addon.imgSrc}
          alt={addon.title}
          width={400}
          height={350}
          className="object-cover w-full h-full"
        />
      </div>

      <div className=" w-80 flex flex-col items-start">
        <h3 className="font-poppins text-secondary px-2 py-1 bg-primary flex justify-between w-full">
          <span>{addon.title}</span>
          <span>{addon.price} kr</span>
        </h3>
        <p className="text-neutral-700 mt-2 text-md">{addon.excerpt}</p>

        <AnimatePresence mode="wait">
          {addOns?.find((a) => a.id === addon.id) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 w-36 p-2 border border-primary rounded-md"
            >
              <div className="flex items-center w-full justify-between">
                <button
                  onClick={() => removeAddOn(addon.id)}
                  className="mr-2 w-6 h-6 flex justify-center items-center  rounded-md bg-primary-600 text-primary-200"
                >
                  -
                </button>
                <p>{addOns?.find((a) => a.id === addon.id)?.quantity}</p>
                <button
                  onClick={() => addAddOn(addon)}
                  className="ml-2 w-6 h-6 flex justify-center items-center  rounded-md bg-green-500 text-primary-200"
                >
                  +
                </button>
              </div>
            </motion.div>
          )}
          {!addOns?.find((a) => a.id === addon.id) && (
            <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
              className="mt-2 px-8 py-2 border border-primary rounded-md"
              onClick={() => addAddOn(addon)}
            >
              Lägg till
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AddOnTile;
