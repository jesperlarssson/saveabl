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
  const [deliveryDays, setDeliveryDays] = useState<string[] | any>([]);
  const [deliveryDaysLoading, setDeliveryDaysLoading] = useState(false);
  const [deliveryDaysError, setDeliveryDaysError] = useState("");

  const fetchDeliveryDays = () => {
    return ["Lördag", "Söndag", "Måndag"];
  };

  const selectDeliveryDay = (day: string) => {
    toast.success(`Du har valt ${day} som leveransdag`);
  };

  const fetchAvailableDeliveryDaysGordon = async (zipCode: string) => {
    const response = await fetch("/api/gordon/get-delivery-dates", {
      method: "POST",
      body: JSON.stringify({
        zipCode: zipCode,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (response.status !== 200) {
      setDeliveryDaysLoading(false);
      setDeliveryDaysError(
        "Just nu kunde vi inte hämta leveransdagar. Vänligen försök igen eller kontakta vår kundservice."
      );
      return;
    } else if (data.length === 0) {
      setDeliveryDaysLoading(false);
      setDeliveryDays([]);
      setDeliveryDaysError(
        "Inga möjliga leveransdagar hittade. Kontakta gärna vår support."
      );
      return;
    } else {
      const deliveryDays = data
        .map((day: { start: any; end: any; label: any }) => {
          return deliveryDayParser(day);
        })
        .filter((v: any) => v !== undefined);
      setDeliveryDays([...new Set(deliveryDays)].slice(0, 3));
      setDeliveryDaysLoading(false);
    }
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipCode = e.target.value;
    //remove all non numeric characters
    const zipCodeClean = zipCode.replace(/\D/g, "");
    if (zipCodeClean.length === 5) {
      fetchAvailableDeliveryDaysGordon(zipCodeClean);
      setShowDeliveryOptions(true);
      updateShippingCost(zipCodeClean);
    }
  };

  const {
    product,
    addOns,
    productType,

    addMealKit,
    removeMealKit,
    addAddOn,
    removeAddOn,
    updateShippingCost,
    setProductType,
    selectNextSubscription,
    selectNextOneTimePurchase,
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
            selected={!productType.odd && !productType.even}
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
            className="border border-primary bg-transparent p-2 rounded-md font-bold placeholder-neutral-400 text-secondary"
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

              <div className="flex gap-4">
                <AnimatePresence mode="wait">
                  {deliveryDaysError && deliveryDays.length == 0 && (
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
                  )}
                  {deliveryDays.map((day: string, index: number) => (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: 0.15 * index }}
                    >
                      <CheckoutButton onClick={() => selectDeliveryDay(day)}>
                        {day}
                      </CheckoutButton>
                    </motion.div>
                  ))}
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
