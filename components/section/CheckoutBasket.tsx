"use client";
import { usePathname } from "next/navigation";

import useCheckout from "@/hooks/useCheckout";
import React, { useEffect } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { GiKnifeFork } from "react-icons/gi";
// Add these imports
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import path from "path";

const CheckoutBasket = () => {
  // const {
  //   product,
  //   addOns,
  //   shippingCost,
  //   deliveryDay,
  //   getTotalPrice,
  //   removeAddOn,
  //   removeMealKit,
  //   addAddOn,
  // } = useCheckout();
  // const [isExpanded, setIsExpanded] = React.useState(true);
  // const [hidden, setIsHidden] = React.useState(false);

  // const pathName = usePathname();

  // useEffect(() => {
  //   if (pathName === "/checkout") {
  //     setIsHidden(true);
  //   } else {
  //     setIsHidden(false);
  //   }
  // }, [pathName]);

  // const variants = {
  //   open: { opacity: 1, height: "auto" },
  //   closed: { opacity: 0, height: 0 },
  // };

  // const mainVariants = {
  //   open: { opacity: 1, height: "auto", y: "0%" },
  //   closed: { opacity: 0, height: "auto", y: "100%" },
  // };

  return (
    <AnimatePresence>
      {/* {product && !hidden && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={mainVariants}
          className={twMerge(
            `fixed bottom-0 left-0 w-full p-6 bg-primary text-neutral-800 z-40 flex flex-col sm:flex-row justify-between  border-t border-primary-700 border-opacity-40 shadow-md`,
            isExpanded ? `items-center` : ``
          )}
        >
          <div className={"cursor-pointer"}>
            <div
              onClick={() => setIsExpanded((prev) => !prev)}
              className="flex items-center gap-2 w-full sm:w-auto "
            >
              <div className="flex items-center gap-2 w-full sm:w-auto ">
                <div className="w-8 h-8 rounded-xl overflow-auto relative">
                  <Image
                    fill
                    className="object-cover"
                    src={product?.imgSrc || ""}
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-semibold ">{product?.title || ""}</p>
                  {isExpanded && (
                    <p className="-mt-1 text-sm text-neutral-500">
                      {addOns?.reduce((acc, curr) => {
                        return acc + curr.title + ", ";
                      }, "")}
                    </p>
                  )}
                  {!isExpanded && deliveryDay && (
                    <p className="-mt-1 text-sm text-neutral-500">
                      {deliveryDay.label}
                    </p>
                  )}
                </div>
              </div>
              <button>
                <svg
                  className={twMerge(
                    `ml-8 w-4 h-4 transition-all duration-300 ease-in-out`,
                    isExpanded ? `transform rotate-180` : `transform rotate-0`
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={variants}
                >
                  <div className="flex gap-2 ml-10">
                    <p className="flex items-center gap-1">
                      <GiKnifeFork />
                      {product?.portions}
                    </p>
                    <p className="flex items-center gap-1">
                      <BsPerson size={20} />
                      {product?.recipes}
                    </p>
                    <button
                      onClick={() => removeMealKit()}
                      className="font-bold text-sm bg-accent px-2 py-1 rounded-md text-primary-200"
                    >
                      Ta bort
                    </button>
                  </div>
                  <div className="mt-2 divide-y-1">
                    {addOns.length > 0 && (
                      <div className="border-b border-primary-600">
                        <p className="font-bold">Tillägg</p>
                      </div>
                    )}
                    {addOns.map((addOn) => (
                      <div
                        key={addOn.id}
                        className="flex justify-between items-center"
                      >
                        <p>{addOn?.title}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => removeAddOn(addOn.id)}
                            className="mr-2 w-6 h-6 flex justify-center items-center  rounded-md bg-primary-600 text-primary-200"
                          >
                            -
                          </button>
                          <p>{addOn?.quantity}</p>
                          <button
                            onClick={() => addAddOn(addOn)}
                            className="ml-2 w-6 h-6 flex justify-center items-center  rounded-md bg-green-500 text-primary-200"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-col sm:items-end mt-4 sm:mt-0 ">
            <p>
              <span className="font-bold">Totalt:</span> {getTotalPrice()} kr
            </p>
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={variants}
                >
                  <div className="mt-1 flex  flex-col sm:items-end">
                    <p>
                      <span className="font-bold">Fraktavgift:</span>{" "}
                      {shippingCost > 0 ? `${shippingCost} kr` : "Gratis"}
                    </p>
                    <Link
                      href="/checkout"
                      className="inline-block mt-2 px-6 py-4 bg-accent rounded-md text-primary-200"
                    >
                      Gå till betalning
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )} */}
    </AnimatePresence>
  );
};

export default CheckoutBasket;
