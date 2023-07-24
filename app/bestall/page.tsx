"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

import Button from "@/components/ui/Button";
import useCheckout from "@/hooks/useCheckout";
import { productInfo } from "@/lib/mealkits";
import { addOnsInfo } from "@/lib/addons";
import React, { use, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Section from "@/components/ui/Section";
import { deliveryDayParser, getWeekNumber } from "@/helpers/format";
import { AnimatePresence, motion } from "framer-motion";
import AddOnTile from "@/components/general/AddOnTile";
import Title from "@/components/ui/Title";
import CheckoutSection from "@/components/ui/CheckoutSection";
import { stringify } from "querystring";

interface Type {
  odd: boolean;
  even: boolean;
}

const variants = {
  open: { opacity: 1, height: "auto", y: 0 },
  closed: { opacity: 0, height: 0, y: -20 },
};

const Order = () => {
  // true, true = prenumeration varje vecka
  // true, false = prenumeration varannan vecka (udda veckor)
  // false, true = prenumeration varannan vecka (jämna veckor)
  // false, false = engångsköp

  {
    /**

    1. Välj prenumeration eller engångsköp - setState
    2. Fyll i postkod sedan om prenumeration välj intervall. och oavsett kolla leveransdagar och välj. 
    3. Välj tillägg
    4. leverans och betalning

*/
  }

  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);

  const [deliveryDaysLoading, setDeliveryDaysLoading] = useState(false);

  const fetchDeliveryDays = () => {
    return ["Lördag", "Söndag", "Måndag"];
  };

  const deliveryDaysToChoose = [
    {
      label: "Lördag",
      id: 6,
    },
    {
      label: "Söndag",
      id: 0,
    },
    {
      label: "Måndag",
      id: 1,
    },
  ];

  const selectDeliveryDay = (day: any) => {
    // toast.success(
    //   `Du har valt ${day.label} som leveransdag med start: ${day.start} och slut: ${day.end}`
    // );
    const selectedDay = new Date(0);
    selectedDay.setUTCSeconds(day.start);

    selectDeliveryDate(day);
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipCode = e.target.value;
    //remove all non numeric characters
    const zipCodeClean = zipCode.replace(/\D/g, "");
    if (zipCodeClean.length === 5) {
      setZipCode(zipCodeClean);
      //fetchAvailableDeliveryDaysGordon(zipCodeClean);
      setShowDeliveryOptions(true);
      updateShippingCost(zipCodeClean);
    }
  };

  const {
    product,
    addOns,
    productType,
    deliveryDay,
    deliveryDays,
    deliveryDaysError,
    preferredWeekDay,

    addMealKit,
    removeMealKit,
    addAddOn,
    removeAddOn,
    updateShippingCost,
    setProductType,
    selectNextSubscription,
    selectNextOneTimePurchase,
    selectDeliveryDate,
    setZipCode,
    setPreferredWeekDay,
  } = useCheckout();

  return (
    <Section className="pt-10">
      <CheckoutSection title="Välj matkasse">
        <h3 className="font-poppins text-lg ">Vilken typ?</h3>
        <div className="flex gap-4">
          <CheckoutButton
            selected={productType.odd || productType.even}
            onClick={() => selectNextSubscription(true)}
          >
            Prenumeration
          </CheckoutButton>
          <CheckoutButton
            selected={
              !productType.odd &&
              !productType.even &&
              productType.odd !== null &&
              productType.even !== null
            }
            onClick={selectNextOneTimePurchase}
          >
            Engångsköp
          </CheckoutButton>
          {/* <CheckoutButton
            selected={!productType.odd && !productType.even}
            onClick={selectNextOneTimePurchase}
          >
            Prova på
          </CheckoutButton> */}
        </div>
        <IntervalButtons
          show={productType.odd || productType.even}
          productType={productType}
          selectNextSubscription={selectNextSubscription}
        />
      </CheckoutSection>

      <CheckoutSection title="Leverans">
        <div className="flex flex-col items-start my-4">
          <label htmlFor="postalcode" className="font-poppins text-lg mb-2">
            Fyll i ditt postnummer för leveransalternativ
          </label>
          <input
            onChange={handleZipCodeChange}
            id="postalcode"
            placeholder="12345"
            className="border border-primary bg-transparent p-2 rounded-md font-bold placeholder-neutral-400 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none"
          ></input>
        </div>

        <AnimatePresence mode="wait">
          {showDeliveryOptions && (
            <motion.div
              key="delivery-options"
              initial="closed"
              animate="open"
              exit="closed"
              variants={variants}
              className=""
            >
              <h3 key="title-delivery" className="font-poppins text-lg">
                Välj leveransdag:
              </h3>
              {/** TODO: Doesn't work for all zips */}

              <div className="flex gap-4 flex-wrap">
                <AnimatePresence mode="wait">
                  {deliveryDaysError && deliveryDays.length == 0 ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="px-8 py-4 bg-primary text-primary-600 bg-opacity-30 rounded-md"
                    >
                      <p className="font-poppins text-md">
                        {deliveryDaysError}
                      </p>
                    </motion.div>
                  ) : (
                    deliveryDaysToChoose.map(
                      (day: { id: number; label: string }, index: number) => (
                        <motion.div
                          key={day.label}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: 0.15 * index }}
                        >
                          <CheckoutButton
                            selected={preferredWeekDay == day.id}
                            onClick={() => {
                              if (preferredWeekDay == day.id) {
                                setPreferredWeekDay(null);
                                return;
                              }
                              setPreferredWeekDay(day.id);
                            }}
                          >
                            {day.label}
                          </CheckoutButton>
                        </motion.div>
                      )
                    )
                  )}
                </AnimatePresence>
              </div>
              <h3 className="font-poppins text-lg mt-4">
                När vill du ha din första matkasse?
              </h3>
              <div className="flex gap-4 flex-wrap">
                <AnimatePresence mode="wait">
                  {deliveryDays
                    .filter(({ start }) => {
                      // Convert UTC seconds to milliseconds and create Date object
                      const date = new Date(start * 1000);
                      // Return whether the day of the week matches the target weekday
                      return date.getDay() === preferredWeekDay;
                    })
                    .map((day: any, index: number) => (
                      <motion.div
                        key={day.label}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 0.1 * index, duration: 0.15 }}
                      >
                        <CheckoutButton
                          selected={deliveryDay?.id == day.id}
                          onClick={() => {
                            selectDeliveryDay(day);
                          }}
                        >
                          <span className="capitalize">
                            {new Date(day.start * 1000).toLocaleDateString(
                              "sv-SE",
                              { weekday: "long", month: "long", day: "numeric" }
                            )}
                          </span>
                        </CheckoutButton>
                      </motion.div>
                    ))}
                  {preferredWeekDay === null ||
                  ![0, 1, 6].includes(preferredWeekDay) ||
                  deliveryDays.length == 0 ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="px-8 py-4 bg-primary text-primary-600 bg-opacity-30 rounded-md"
                    >
                      <p className="font-poppins text-md">
                        Välj en leveransdag först
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CheckoutSection>

      <CheckoutSection title="Tillägg">
        <div className="flex gap-4">
          <AnimatePresence mode="wait">
            {addOnsInfo.map((addOn) => (
              <AddOnTile key={addOn.id} addon={addOn} />
            ))}
          </AnimatePresence>
        </div>
      </CheckoutSection>

      <Button onClick={() => addMealKit(productInfo[2])}>Prova på</Button>
    </Section>
  );
};

export default Order;

const CheckoutButton = ({
  children,
  onClick,
  disabled,
  selected,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
}) => {
  return (
    <Button
      onClick={onClick}
      className={twMerge(
        `mt-2 px-8 py-2 border bg-transparent text-neutral-700 font-medium border-primary rounded-md w-auto transition-all hover:bg-primary`,
        selected && `bg-primary text-secondary font-bold`
      )}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

const IntervalButtons = ({
  productType,
  show,
  selectNextSubscription,
}: {
  productType: Type;
  show: boolean;
  selectNextSubscription: (allWeeks: boolean) => void;
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intervalButtons"
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          className="mt-4 text-neutral-700"
        >
          <h3 key="interval-title" className="font-poppins text-lg ">
            Välj intervall:
          </h3>
          <div key="interval-buttons" className="flex gap-4">
            <CheckoutButton
              key="interval-button-1"
              selected={productType.even && productType.odd}
              onClick={() => selectNextSubscription(true)}
            >
              Varje vecka
            </CheckoutButton>
            <CheckoutButton
              key="interval-button-2"
              selected={
                (productType.even || productType.odd) &&
                !(productType.even && productType.odd)
              }
              onClick={() => selectNextSubscription(false)}
            >
              Varannan vecka
            </CheckoutButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
