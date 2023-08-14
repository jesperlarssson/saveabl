"use client";

import { twMerge } from "tailwind-merge";

import Button from "@/components/ui/Button";
import useCheckout from "@/hooks/useCheckout";
import { addOnsInfo } from "@/lib/addons";
import React, { useEffect, useState } from "react";
import Section from "@/components/ui/Section";
import AddOnTile from "@/components/general/AddOnTile";
import CheckoutSection from "@/components/ui/CheckoutSection";
import { ProductInfo } from "@/types";
import CheckoutButton from "./CheckoutButton";
import IntervalButtons from "./IntervalButtons";
import Input from "@/components/ui/Input";

interface Type {
  odd: boolean;
  even: boolean;
}

const variants = {
  open: { opacity: 1, height: "auto", y: 0 },
  closed: { opacity: 0, height: 0, y: -20 },
};
interface OrderContentProps {
  productInfo: ProductInfo[];
}

const OrderContent: React.FC<OrderContentProps> = ({ productInfo }) => {
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
  const [isClient, setIsClient] = useState(false);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [deliveryDaysLoading, setDeliveryDaysLoading] = useState(false);
  const [hasAllergies, setHasAllergies] = useState(true);
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
    handleUpdateRemainingMealkits,
    setAvailableProducts,
  } = useCheckout();

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
    setAvailableProducts(productInfo);
  }, []);

  if (!isClient) {
    return null;
  }

  const { AnimatePresence, motion } = require("framer-motion");

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

      {hasAllergies && (
        <CheckoutSection title="Allergier">
          <h3 className="font-poppins text-lg ">Information om allergier</h3>
          <p>
            Tyvärr kan vi inte ta hänsyn till alla allergier. För att vår idé
            att rädda all typ av mat och göra goda recept på det ska fungera i
            större skala så behöver vi kunna vara ganska flexibla i vilka
            råvaror vi kan använda. Det vi tyvärr inte kan ta hänsyn till är
            allergier mot:{" "}
          </p>
          <ul className="list-disc ml-8">
            <li>Gluten</li>
            <li>Sojaprotein</li>
            <li>Mjölkprotein</li>
            <li>Laktos*</li>
          </ul>{" "}
          <p className="text-sm my-2">
            *rätterna innehåller inte supermycket laktos och allergener markeras
            alltid i receptet så att du kan undvika dem. Kika gärna på recepten
            innan du beställer så ser du hur mycket det är! Har du allergier som
            inte är ^,
          </p>
          <Input label="Skriv din allergi här så ser kocken det:" placeholder="Din allergi"/>
        </CheckoutSection>
      )}

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

        <AnimatePresence>
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
                <AnimatePresence>
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
                              //handleUpdateRemainingMealkits();
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
                          disabled={day.remaining <= 0}
                          selected={deliveryDay?.id == day.id}
                          onClick={() => {
                            selectDeliveryDay(day);
                          }}
                          className="flex flex-col items-center"
                        >
                          <span className="capitalize">
                            {new Date(day.start * 1000).toLocaleDateString(
                              "sv-SE",
                              { weekday: "long", month: "long", day: "numeric" }
                            )}
                          </span>
                          {day.remaining <= 5 && day.remaining > 0 && (
                            <span className="text-red-700 text-sm">{`Endast ett fåtal kvar`}</span>
                          )}
                          {day.remaining === 0 && (
                            <span className="text-red-700 text-sm font-bold">{`Slutsåld`}</span>
                          )}
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
          <AnimatePresence>
            {addOnsInfo.map((addOn) => (
              <AddOnTile key={addOn.id} addon={addOn} />
            ))}
          </AnimatePresence>
        </div>
      </CheckoutSection>

      <CheckoutSection title="Leverans och betalning">
        <div>TODO: Add embed Stripe and pass checkout session to it</div>
      </CheckoutSection>
    </Section>
  );
};

export default OrderContent;
