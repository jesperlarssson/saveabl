
"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

import Button from "@/components/ui/Button";
import useCheckout from "@/hooks/useCheckout";
import { productInfo } from "@/lib/mealkits";
import { addOnsInfo } from "@/lib/addons";
import React, { ChangeEvent, use, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Section from "@/components/ui/Section";
import { deliveryDayParser, getWeekNumber } from "@/helpers/format";
import { AnimatePresence, motion } from "framer-motion";
import AddOnTile from "@/components/general/AddOnTile";
import Title from "@/components/ui/Title";
import CheckoutSection from "@/components/ui/CheckoutSection";
import getDeliveryWindowsForPostalCode from "@/actions/getDeliveryWindowsForPostalCode";
import { UserInformation } from "@/providers/CheckoutProvider";
import instance from "@/lib/apiAxios";
// Import Stripe
import { loadStripe } from "@stripe/stripe-js";
import Input from "@/components/ui/Input";
import { CheckoutButton } from "../components/CheckoutButton";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);


interface Type {
    odd: boolean;
    even: boolean;
  }
  
  const variants = {
    open: { opacity: 1, height: "auto", y: 0 },
    closed: { opacity: 0, height: 0, y: -20 },
  };

const Order = () => {

  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);

  const [deliveryDaysLoading, setDeliveryDaysLoading] = useState(false);

  const fetchDeliveryDays = () => {
    return ["Lördag", "Söndag", "Måndag"];
  };

  const productTypes = [
    {
      id: "subscription",
      label: "Prenumeration",
      variants: [
        {
          label: "Varje vecka",
          productId: "570897f5-82f5-482e-a2c6-fd94f001486a", //TODO: update for prod env
          disabled: false,
        },
        {
          label: "Varannan vecka",
          productId: "688a4c8c-0d0d-45ab-9dc4-4525a004f710", //TODO: update for prod env
          disabled: false,
        },
      ],
    },
    {
      id: "standard",
      label: "Engångsköp",
      variants: [
        {
          label: "12 portioner",
          productId: "68b57d6d-035a-4692-ad26-cb0028d1d29a", //TODO: update for prod env
          disabled: false,
        },
        {
          label: "8 portioner",
          productId: "570897f5-82f5-482e-a2c6-fd94f001486a", //TODO: update for prod env
          disabled: true,
        },
      ],
    },
  ];
  const [selectedType, setSelectedType] = useState(productTypes[0]);
  const [deliveryWindows, setDeliveryWindows] = useState([]);
  const [deliveryWindowsErrors, setDeliveryWindowsErrors] = useState<
    string | null
  >(null);

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
  };

  const [weekdaysWithDays, setWeekdaysWithDays] = useState<
    { weekday: string; days: number[] }[]
  >([
    {
      weekday: "Laddar...",
      days: [],
    },
  ]);
  const [selectedWeekday, setSelectedWeekday] = useState<number | null>();
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

  const updateWeekdaysList = (deliveryWindows: any) => {
    // Temp array to keep track of unique weekdays and their day numbers
    const tempWeekdaysWithDays: { weekday: string; days: number[] }[] = [];

    deliveryWindows.windows.forEach((window: any) => {
      const date = new Date(window.start * 1000);
      const weekday = date.toLocaleDateString("sv-SE", { weekday: "long" });
      const day = date.getDay();

      // Skip Tuesdays for now
      if (day === 2) {
        return;
      }

      const existingWeekday = tempWeekdaysWithDays.find(
        (item) => item.weekday === weekday
      );

      if (existingWeekday) {
        existingWeekday.days.push(day);
      } else {
        tempWeekdaysWithDays.push({ weekday, days: [day] });
      }
    });

    // Update the state variable
    setWeekdaysWithDays(tempWeekdaysWithDays);
  };

  const handleZipCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const zipCode = e.target.value;
    //remove all non numeric characters
    const zipCodeClean = zipCode.replace(/\D/g, "");
    if (zipCodeClean.length === 5) {
      setPostalCode(zipCodeClean);
      setShowDeliveryOptions(true);
      //TODO: Actions get delivery windows available
      try {
        const deliveryWindows = await getDeliveryWindowsForPostalCode(
          zipCode,
          "se"
        );
        updateWeekdaysList(deliveryWindows);
        setDeliveryWindows(deliveryWindows.windows);
        setDeliveryPeriodId(deliveryWindows.deliveryPeriodId);
      } catch (error) {
        setDeliveryWindowsErrors("Något gick fel. Kontrollera postkoden!");
      }
    }
  };

  const {
    address,
    name,
    extraInfo,
    phone,
    productId,
    deliveryWindow,
    email,
    password,
    deliveryPeriodId,
    setPostalCode,
    setStreetAddress,
    setCity,
    setCountry,
    setAddress,
    setName,
    setPhone,
    setExtraInfo,
    setProductId,
    setDeliveryWindow,
    setEmail,
    setPassword,
    setDeliveryPeriodId,
  } = useCheckout();

  // Function to redirect to Stripe Checkout
  async function redirectToCheckout(sessionId: string) {
    const stripe = await stripePromise;
    if (!stripe) {
      return;
    }
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    if (error) {
      console.error(error);
    }
  }

  type RowError = {
    message: string | null;
  };

  type FormError = {
    name: RowError | null;
    address: RowError | null;
    phone: RowError | null;
    email: RowError | null;
    password: RowError | null;
    city: RowError | null;
    extraInfo: RowError | null;
  };

  const [formErrors, setFormErrors] = useState<FormError>({
    name: null,
    address: null,
    phone: null,
    email: null,
    password: null,
    city: null,
    extraInfo: null,
  });

  const handleConfirm = async () => {
    setCountry("SE");

    //Validate form
    const errors: FormError = {
      name: null,
      address: null,
      phone: null,
      email: null,
      password: null,
      city: null,
      extraInfo: null,
    };

    if (!name || name.length < 2) {
      errors.name = {
        message: "Fyll i ditt fullständiga namn",
      };
    }

    if (!address.street || address.street.length < 2) {
      errors.address = {
        message: "Fyll i din adress",
      };
    }

    if (!phone || phone.length < 2) {
      errors.phone = {
        message: "Fyll i ditt telefonnummer",
      };
    }

    if (!email || email.length < 2) {
      errors.email = {
        message: "Fyll i din e-post",
      };
    }

    if (!password || password.length < 6) {
      errors.password = {
        message: "Fyll i ditt lösenord längre än 6 tecken",
      };
    }

    if (!address.city || address.city.length < 2) {
      errors.city = {
        message: "Fyll i din stad",
      };
    }

    setFormErrors(errors);
    const hasErrors = Object.values(errors).some((error) => error !== null);
    if (hasErrors) return;
    if (!agreeToTerms) {
      toast.error("Du måste godkänna villkoren för att gå vidare!");
      return;
    }

    const userInformation: UserInformation = {
      address,
      name,
      phone,
      extraInfo: extraInfo || "",
      productId,
      deliveryWindow,
      email,
      password,
      deliveryPeriodId,
      addOns: [], //TODO: Add delivery fee as addon
    };

    // TODO: Post to backend
    console.log("User information to be sent to the backend:", userInformation);

    try {
      const res = await instance.post("checkout", userInformation);
      console.log("Response from backend:", res.data);
      const data = await res.data;
      redirectToCheckout(data.id);
    } catch (error: any) {
      console.log("Error from backend:", error);
      if (error.response.data.code === 401) {
        toast.error("Användaren finns redan, prova att logga in!");
      }
    }
  };

  return (
    <Section className="pt-10">
      <CheckoutSection title="Välj matkasse">
        <h3 className="font-poppins text-lg ">Vilken typ?</h3>
        <div className="flex gap-4">
          {productTypes.map((productType) => {
            return (
              <CheckoutButton
                key={productType.label}
                selected={productType.id === selectedType.id}
                onClick={() => setSelectedType(productType)}
              >
                {productType.label}
              </CheckoutButton>
            );
          })}
        </div>
        <h3 key="interval-title" className="font-poppins text-lg mt-4">
          Välj variant:
        </h3>
        <div className="flex gap-4">
          {selectedType.variants.map((variant) => {
            return (
              <CheckoutButton
                key={variant.label}
                selected={variant.productId === productId}
                onClick={() => setProductId(variant.productId)}
                disabled={variant.disabled}
              >
                {variant.label}
              </CheckoutButton>
            );
          })}
        </div>
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
            className="border border-primary bg-transparent p-2 rounded-md font-bold w-full placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none"
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
                  {deliveryWindowsErrors && deliveryWindows.length == 0 ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="px-8 py-4 bg-primary text-primary-600 bg-opacity-30 rounded-md"
                    >
                      <p className="font-poppins text-md">
                        {deliveryWindowsErrors}
                      </p>
                    </motion.div>
                  ) : (
                    weekdaysWithDays.map((day: any, index: number) => (
                      <motion.div
                        key={day.label}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 0.15 * index }}
                      >
                        <CheckoutButton
                          className="capitalize"
                          selected={selectedWeekday == day.days[0]}
                          onClick={() => {
                            if (selectedWeekday == day.days[0]) {
                              setSelectedWeekday(null);
                              return;
                            }
                            setSelectedWeekday(day.days[0]);
                          }}
                        >
                          {day.weekday}
                        </CheckoutButton>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
              {selectedWeekday != null && (
                <>
                  <h3 className="font-poppins text-lg mt-4">
                    När vill du ha din matkasse?
                  </h3>
                  <div className="flex gap-4 flex-wrap max-w-xl">
                    <AnimatePresence mode="wait">
                      {deliveryWindows
                        .filter(({ start }) => {
                          // Convert UTC seconds to milliseconds and create Date object
                          const date = new Date(start * 1000);
                          // Return whether the day of the week matches the target weekday
                          return date.getDay() === selectedWeekday;
                        })
                        .map((window: any, index: number) => (
                          <motion.div
                            key={window.label}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: 0.15 * index }}
                          >
                            <CheckoutButton
                              selected={deliveryWindow?.start == window.start}
                              onClick={() => {
                                if (deliveryWindow?.start == window.start) {
                                  setDeliveryWindow(null);
                                  return;
                                }
                                setDeliveryWindow(window);
                              }}
                            >
                              {window.label}
                            </CheckoutButton>
                          </motion.div>
                        ))}
                      {selectedWeekday === null ||
                      ![0, 1, 6].includes(selectedWeekday!) ||
                      deliveryWindows.length == 0 ? (
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
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CheckoutSection>

      <CheckoutSection title="Adress">
        <label htmlFor="address" className="font-poppins text-lg mb-2">
          Fyll i din leveransadress
        </label>
        <div className="grid grid-cols-2 gap-4 items-start my-4">
          <Input
            label="Fullständigt namn"
            onChange={(e) => setName(e.target.value)}
            type="text"
            parentClassName="col-span-2"
            id="name"
            placeholder="Förnamn Efternamn"
            error={formErrors.name}
          />

          <Input
            label="Adress"
            onChange={(e) => setStreetAddress(e.target.value)}
            type="text"
            id="address"
            placeholder="Klimatgatan 1"
            error={formErrors.address}
          />
          <Input
            label="Ort"
            onChange={(e) => setCity(e.target.value)}
            type="text"
            id="city"
            placeholder="Göteborg"
            error={formErrors.city}
          />
          <div className="w-full col-span-2 -mt-4">
            <label
              htmlFor="extraInfo"
              className={twMerge(
                `block w-full text-md font-bold text-primary-600 ml-1 px-1 max-w-fit bg-primary-200 translate-y-3 transition`
              )}
            >
              Extra Information
            </label>

            <textarea
              id="extraInfo"
              placeholder="Till exempel våning, portkod eller annan information som kan vara bra för oss att veta."
              onChange={(e) => setExtraInfo(e.target.value)}
              className="border w-full border-primary bg-transparent p-2 rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none"
            ></textarea>
          </div>
        </div>

        <h3 className="font-poppins text-lg mt-4">Kontaktuppgifter</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            label="Telefonnummer"
            type="text"
            placeholder="0701234567"
            parentClassName="col-span-2 -mt-2"
            error={formErrors.phone}
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="E-post"
            type="text"
            placeholder="E-post"
            error={formErrors.email}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            label="Lösenord"
            placeholder="Lösenord"
            type="password"
            error={formErrors.password}
          />
        </div>
        {/* Checkbox */}
        <div className="w-full px-2 my-4">
          <label className="">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAgreeToTerms(e.target.checked)
              }
            />
            Jag godkänner villkoren och förstår att ett konto kommer att skapas.
          </label>
        </div>
      </CheckoutSection>

      <Button onClick={handleConfirm}>Registrera och betala</Button>

      {/* <CheckoutSection title="Tillägg">
        <div className="flex gap-4">
          <AnimatePresence mode="wait">
            {addOnsInfo.map((addOn) => (
              <AddOnTile key={addOn.id} addon={addOn} />
            ))}
          </AnimatePresence>
        </div>
      </CheckoutSection> */}
    </Section>
  );
};

export default Order;
//   return (
//     <Section className="pt-10">
//       <CheckoutSection title="Välj matkasse">
//         <h3 className="font-poppins text-lg ">Vilken typ?</h3>
//         <div className="flex gap-4">
//           <CheckoutButton
//             selected={productType.odd || productType.even}
//             onClick={() => selectNextSubscription(true)}
//           >
//             Prenumeration
//           </CheckoutButton>
//           <CheckoutButton
//             selected={
//               !productType.odd &&
//               !productType.even &&
//               productType.odd !== null &&
//               productType.even !== null
//             }
//             onClick={selectNextOneTimePurchase}
//           >
//             Engångsköp
//           </CheckoutButton>
//           {/* <CheckoutButton
//             selected={!productType.odd && !productType.even}
//             onClick={selectNextOneTimePurchase}
//           >
//             Prova på
//           </CheckoutButton> */}
//         </div>
//         <IntervalButtons
//           show={productType.odd || productType.even}
//           productType={productType}
//           selectNextSubscription={selectNextSubscription}
//         />
//       </CheckoutSection>

//       <CheckoutSection title="Leverans">
//         <div className="flex flex-col items-start my-4">
//           <label htmlFor="postalcode" className="font-poppins text-lg mb-2">
//             Fyll i ditt postnummer för leveransalternativ
//           </label>
//           <input
//             onChange={handleZipCodeChange}
//             id="postalcode"
//             placeholder="12345"
//             className="border border-primary bg-transparent p-2 rounded-md font-bold placeholder-neutral-400 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none"
//           ></input>
//         </div>

//         <AnimatePresence mode="wait">
//           {showDeliveryOptions && (
//             <motion.div
//               key="delivery-options"
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={variants}
//               className=""
//             >
//               <h3 key="title-delivery" className="font-poppins text-lg">
//                 Välj leveransdag:
//               </h3>
//               {/** TODO: Doesn't work for all zips */}

//               <div className="flex gap-4 flex-wrap">
//                 <AnimatePresence mode="wait">
//                   {deliveryDaysError && deliveryDays.length == 0 ? (
//                     <motion.div
//                       key="error"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="px-8 py-4 bg-primary text-primary-600 bg-opacity-30 rounded-md"
//                     >
//                       <p className="font-poppins text-md">
//                         {deliveryDaysError}
//                       </p>
//                     </motion.div>
//                   ) : (
//                     deliveryDaysToChoose.map(
//                       (day: { id: number; label: string }, index: number) => (
//                         <motion.div
//                           key={day.label}
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                           transition={{ delay: 0.15 * index }}
//                         >
//                           <CheckoutButton
//                             selected={preferredWeekDay == day.id}
//                             onClick={() => {
//                               if (preferredWeekDay == day.id) {
//                                 setPreferredWeekDay(null);
//                                 return;
//                               }
//                               setPreferredWeekDay(day.id);
//                             }}
//                           >
//                             {day.label}
//                           </CheckoutButton>
//                         </motion.div>
//                       )
//                     )
//                   )}
//                 </AnimatePresence>
//               </div>
//               <h3 className="font-poppins text-lg mt-4">
//                 När vill du ha din första matkasse?
//               </h3>
//               <div className="flex gap-4 flex-wrap">
//                 <AnimatePresence mode="wait">
//                   {deliveryDays
//                     .filter(({ start }) => {
//                       // Convert UTC seconds to milliseconds and create Date object
//                       const date = new Date(start * 1000);
//                       // Return whether the day of the week matches the target weekday
//                       return date.getDay() === preferredWeekDay;
//                     })
//                     .map((day: any, index: number) => (
//                       <motion.div
//                         key={day.label}
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ delay: 0.1 * index, duration: 0.15 }}
//                       >
//                         <CheckoutButton
//                           selected={deliveryDay?.id == day.id}
//                           onClick={() => {
//                             selectDeliveryDay(day);
//                           }}
//                         >
//                           <span className="">{day.label}</span>
//                           {/* <span className="capitalize">
//                             {new Date(day.start * 1000).toLocaleDateString(
//                               "sv-SE",
//                               { weekday: "long", month: "long", day: "numeric" }
//                             )}
//                           </span> */}
//                         </CheckoutButton>
//                       </motion.div>
//                     ))}
//                   {preferredWeekDay === null ||
//                   ![0, 1, 6].includes(preferredWeekDay) ||
//                   deliveryDays.length == 0 ? (
//                     <motion.div
//                       key="error"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="px-8 py-4 bg-primary text-primary-600 bg-opacity-30 rounded-md"
//                     >
//                       <p className="font-poppins text-md">
//                         Välj en leveransdag först
//                       </p>
//                     </motion.div>
//                   ) : null}
//                 </AnimatePresence>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </CheckoutSection>

//       <CheckoutSection title="Tillägg">
//         <div className="flex gap-4">
//           <AnimatePresence mode="wait">
//             {addOnsInfo.map((addOn) => (
//               <AddOnTile key={addOn.id} addon={addOn} />
//             ))}
//           </AnimatePresence>
//         </div>
//       </CheckoutSection>

//       <Button onClick={() => addMealKit(productInfo[2])}>Prova på</Button>
//     </Section>
//   );
// };

// export default Order;