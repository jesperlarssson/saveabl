"use client";
import { useRouter } from "next/navigation";
import Accordion from "@/components/ui/Accordion";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui/Button";
import useCheckout from "@/hooks/useCheckout";
import React, { ChangeEvent, use, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Section from "@/components/ui/Section";
import { deliveryDayParser, getWeekNumber } from "@/helpers/format";
import { AnimatePresence, motion } from "framer-motion";
import Title from "@/components/ui/Title";
import CheckoutSection from "@/components/ui/CheckoutSection";
import getDeliveryWindowsForPostalCode from "@/actions/getDeliveryWindowsForPostalCode";
import { UserInformation } from "@/providers/CheckoutProvider";
import OrderWizard from './OrderWizard';
import OrderSummary from './OrderSummary'; 
import {
  getProductCostForPriceId,
  getShippingCostForProductId,
  isSubscription,
  priceIdEveryWeek,
  getProductTypesFromLngCode,
} from "./lib/productTypes";
import Input from "@/components/ui/Input";
import BodyText from "@/components/ui/BodyText";
import { getShippingCostFromPostalCode } from "./lib/getShippingCost";
import PaymentArea from "./components/paymentArea";
import { useLang } from "@/hooks/useLang";
import { useSearchParams } from "next/navigation";
import { CheckoutButton } from "./components/CheckoutButton";
import axios from "axios";
import { formatEpochToTimeString } from "@/helpers/epochFormat";
import {
  free,
  shippingCostStage1,
  shippingCostStage2,
  shippingCostStage3,
  stockholmPostalCodes,
} from "@/lib/zipCodes";

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

const variants = {
  open: { opacity: 1, height: "auto", y: 0 },
  closed: { opacity: 0, height: 0, y: -20 },
};

const Order = () => {

  const { text, lang } = useLang();

  
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null); // Hur ofta matkassen ska levereras
  const [selectedDay, setSelectedDay] = useState<any>(null); // Kan lagra hela objektet



  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [stripeCheckoutIsLoading, setStripeCheckoutIsLoading] = useState(false);

  const [productTypes, setProductTypes] = useState<any[]>(
    getProductTypesFromLngCode(lang)
  );

  useEffect(() => {
    setProductTypes(getProductTypesFromLngCode(lang));
  }, [lang]);

  

  const searchParams = useSearchParams();
  const id = searchParams?.get("id") || "1";
  const offerId = parseInt(id, 10);
  

  const [deliveryDaysLoading, setDeliveryDaysLoading] = useState(false);

  const fetchDeliveryDays = () => {
    return ["Lördag", "Söndag", "Måndag"];
  };

  const [selectedType, setSelectedType] = useState(productTypes[0]);
  const [deliveryWindows, setDeliveryWindows] = useState([]);
  const [showLinks, setShowLinks] = useState(false);

  const [deliveryWindowsErrors, setDeliveryWindowsErrors] = useState<
    string | null
  >(null);

  const [deliveryDaysToChoose, setDeliveryDaysToChoose] = useState<any[]>([
    {
      label: text.order.delivery_saturday,
      id: 6,
      description: text.order.saturday_description,
    },
    {
      label: text.order.delivery_sunday,
      id: 0,
      description: text.order.sunday_description,
    },
    {
      label: text.order.delivery_monday,
      id: 1,
      description: text.order.monday_description,
    },
  ]);

  const getDayLabelFromId = (id: number | null | undefined) => {
    if (id === null || id === undefined) {
      return deliveryDaysToChoose.find(
        (day) => day.id === deliveryDaysToChoose[0].id
      )?.label;
    }
    return deliveryDaysToChoose.find((day) => day.id === id)?.label;
  };

  const selectDeliveryDay = (day: any) => {
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
  const [shippingCostInfo, setShippingCostInfo] = useState<string | null>();
  const [formErrors, setFormErrors] = useState<FormError>({
    name: null,
    address: null,
    phone: null,
    email: null,
    password: null,
    city: null,
    extraInfo: null,
  });
  const [isDk, setIsDk] = useState(false);

  const router = useRouter();

  const updateWeekdaysList = (deliveryWindows: any) => {
    const tempWeekdaysWithDays: { weekday: string; days: number[] }[] = [];

    deliveryWindows.windows.forEach((window: any) => {
      const date = new Date(window.start * 1000);
      const weekday = date.toLocaleDateString("sv-SE", { weekday: "long" });
      const day = date.getDay();

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

    setWeekdaysWithDays(tempWeekdaysWithDays);
  };

  const handleZipCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const zipCode = e.target.value;
    const zipCodeClean = zipCode.replace(/\D/g, "");
    if (zipCodeClean.length === 4) {
      setPostalCode(zipCodeClean);
  
      if (shippingDk.includes(zipCodeClean)) {
        setShowDeliveryOptions(true);
        try {
          const deliveryWindows = await getDeliveryWindowsForPostalCode(zipCodeClean, "dk");
          updateWeekdaysList(deliveryWindows.windows);
          setShippingCostInfo(getShippingCostFromPostalCode(zipCodeClean));
          setDeliveryWindows(deliveryWindows.windows);
          setDeliveryPeriodId(deliveryWindows.deliveryPeriodId);
        } catch (error) {
          setDeliveryWindowsErrors("Något gick fel. Kontrollera postkoden!");
        }
        setIsDk(true);
        return;
      }
    }
    if (zipCodeClean.length === 5) {
      setPostalCode(zipCodeClean);
      setShowDeliveryOptions(true);
      try {
        const deliveryWindows = await getDeliveryWindowsForPostalCode(
          zipCode,
          "se"
        );

        updateWeekdaysList(deliveryWindows);
        setShippingCostInfo(getShippingCostFromPostalCode(zipCode));
        setDeliveryWindows(deliveryWindows.windows);
        setDeliveryPeriodId(deliveryWindows.deliveryPeriodId);
      } catch (error) {
        setDeliveryWindowsErrors("Något gick fel. Kontrollera postkoden!");
      }
    }
  };

  const handleGetLinks = () => {
    if (!address.postalCode || address.postalCode.length < 4) {
      toast.error("Du måste ange ett postnummer");
      return;
    }

    if (
      address.postalCode.length === 5 &&
      (stockholmPostalCodes.includes(address.postalCode) ||
        shippingCostStage3.includes(address.postalCode) ||
        shippingCostStage2.includes(address.postalCode) ||
        shippingCostStage1.includes(address.postalCode) ||
        free.includes(address.postalCode))
    ) {
      setIsDk(false);
      setShowLinks(false);
      setShowAddressFields(true);
    } 
    else if (
      address.postalCode.length === 4 &&
      shippingDk.includes(address.postalCode)
    ) {
      setIsDk(true);
      setShowLinks(false);
      setShowAddressFields(true);
    } 
    else {
      setShowLinks(false);
      setShowAddressFields(false);
      toast.error("Vi kan tyvärr inte leverera till ditt postnummer");
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

  const handleConfirm = async () => {
    const country = isDk ? "DK" : "SE";
    setCountry(country);
    setStripeCheckoutIsLoading(true);

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
        message: country === "SE" ? "Fyll i ditt telefonnummer" : "Fyll i ditt telefonnummer (DK)",
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
        message: country === "SE" ? "Fyll i din stad" : "Fyll i din stad (DK)",
      };
    }

    setFormErrors(errors);
    const hasErrors = Object.values(errors).some((error) => error !== null);
    if (hasErrors) {
      setStripeCheckoutIsLoading(false);
      return;
    }
    if (!agreeToTerms) {
      toast.error("Du måste godkänna villkoren för att gå vidare!");
      setStripeCheckoutIsLoading(false);
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
      addOns: [],
    };
       userInformation.address.country = country;
    try {
      const response = await axios.post("/api/create_stripe_customer", {
        email: userInformation.email,
        password: userInformation.password,
        name: userInformation.name,
        metadata: {
          deliveryDay: formatEpochToTimeString({
            start: deliveryWindow?.start || undefined,
            end: deliveryWindow?.end || undefined,
          }),
        },
        address: {
          city: userInformation.address.city,
          country: userInformation.address.country,
          line1: userInformation.address.street,
          postal_code: userInformation.address.postalCode,
        },
        description: `Vald leverans: ${getDayLabelFromId(
          selectedWeekday
        )} Extra info: ${userInformation.extraInfo}`,
        phone: userInformation.phone,
        extraInfo: userInformation.extraInfo,
      });
      const stripeUserId = response.data.stripeUser.id;
      const shippingPriceId = getShippingCostForProductId(productId);
      const sessionResponse = await axios.post("/api/checkout_sessions", {
        customerId: stripeUserId,
        mode: isSubscription(productId) ? "subscription" : "payment",
        items: [
          {
            price: productId,
            quantity: 1,
          },
          {
            price: shippingPriceId,
            quantity: 1,
          },
        ],
      });

      router.push(sessionResponse.data.url);
    } catch (error) {
      setFormErrors({
        ...formErrors,
        email: {
          message: "Kontrollera att alla rutor är ifyllda korrekt",
        },
      });
      setStripeCheckoutIsLoading(false);
    }
  };

  useEffect(() => {
    if (address.postalCode && address.postalCode.length < 4) {
      setShowLinks(false);
    }
    if (
      typeof address.postalCode === 'string' &&
      (stockholmPostalCodes.includes(address.postalCode) ||
        (shippingCostStage3 && shippingCostStage3.includes(address.postalCode)))
    ) {
      setDeliveryDaysToChoose([
        {
          label: text.order.stockholm_sunday, 
          id: 0,
          description: text.order.sunday_description_stockholm,
        },
        {
          label: text.order.stockholm_monday,
          id: 1,
          description: text.order.monday_description_stockholm,
        },
      ]);
    }
    if (
      typeof address.postalCode === 'string' &&
      (shippingDk.includes(address.postalCode))
    ) {
      setDeliveryDaysToChoose([
        {
          label: text.order.copenhagen_monday,
          id: 0,
          description: text.order.monday_description_copenhagen,
        },
      ]);
    }
  }, [address.postalCode]);

  return (
    <>
      <Section className="pt-16">
        <div className="w-full flex flex-col items-center ">
          <Title className="text-center">
            {id === "1" ? text.order.title1 : text.order.title2}
          </Title>
          <BodyText className="text-center max-w-3xl mb-10">
            {id === "1" ? "" : text.order.text}
          </BodyText>
  
          <div className="my-8 max-w-4xl w-full h-1 border-b border-primary border-opacity-50"></div>
          <div className="flex flex-col items-center my-4">
            <label
              htmlFor="postalcode"
              className="font-poppins text-lg mb-2 text-secondary w-full text-center sm:text-left"
            >
              {id === "1" ? text.order.label1 : text.order.label2}
            </label>
            <input
              onChange={handleZipCodeChange}
              id="postalcode"
              placeholder="12345"
              className="border border-primary bg-transparent p-2 rounded-md font-bold w-full placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none"
            ></input>
            <button
              className="w-64 mx-auto py-2 bg-primary mt-4 rounded-full text-secondary font-bold bg-opacity-90 hover:bg-opacity-100"
              onClick={handleGetLinks}
            >
              {id === "1" ? text.order.button1 : text.order.button2}
            </button>
          </div>
  
          <div className="my-8 max-w-4xl w-full h-1 border-b border-primary border-opacity-50"></div>
          {showLinks && (
            <>
              <Title>{text.order.linkTitle}</Title>
              <BodyText> {text.order.linkDescription}</BodyText>
              <div className="flex flex-col text-gray-700 mt-4 mb-4">
                <p>{text.order.bullet1}</p>
                <p>{text.order.bullet2}</p>
                <p>{text.order.bullet3}</p>
              </div>
              <PaymentArea
                deliveryWindows={deliveryWindows}
                dk={isDk}
                offerId={offerId}
              />
            </>
          )}
          
          {showAddressFields && (
            
            <OrderWizard 
            handleConfirm={handleConfirm}
            stripeCheckoutIsLoading={stripeCheckoutIsLoading}
            selectedType={selectedType} // Matkasse-val
            selectedVariant={selectedVariant} // Hur ofta-val
            selectedDay={selectedDay} // Leveransdag
             >
              {/* Steg 1: Välj matkasse */}
              <>
              <h1 className="font-bold font-poppins text-secondary text-3xl sm:text-5xl max-w-4xl mb-4 col-span-2 px-2">
               {text.order.linkTitle}
               </h1>
                  <h3 className="font-poppins text-lg text-secondary px-2">
                    {text.order.type}
                  </h3> 
                  <div className="flex gap-4 px-2">
                    {productTypes.map((productType) => {
                      return (
                        <CheckoutButton
                          key={productType.label}
                          selected={productType.id === selectedType.id}
                          onClick={() => setSelectedType(productType)}
                          className="w-full sm:w-auto"
                        >
                          {productType.label}
                          <br />
                          <span className="text-xs">{productType.recipes}</span>
                          <br />
                          <span className="text-xs">{productType.persons}</span>
                        </CheckoutButton>
                      );
                    })}
                  </div>
                
  
                <h3
                  key="interval-title"
                  className="font-poppins text-lg mt-6 text-secondary text-left px-2"
                >
                  {text.order.variant}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 mb-4 max-w-full sm:max-w-xxs px-2">
                  {selectedType.variants.map((variant: any) => {
                    const postalCode = address.postalCode || "";
                    const sthlmCustomer = stockholmPostalCodes.includes(postalCode);
                    const skaneCustomer = shippingCostStage3.includes(postalCode);
                    const dkCustomer = shippingDk.includes(postalCode);
  
                    return (
                      <CheckoutButton
                        key={variant.label}
                        selected={
                          sthlmCustomer
                            ? variant.stockholmPriceId === productId
                            : skaneCustomer
                            ? variant.skanePriceId === productId
                            : dkCustomer
                            ? variant.danishPriceId === productId
                            : variant.priceId === productId
                        }
                        onClick={() => {
                          setProductId(
                            sthlmCustomer
                              ? variant.stockholmPriceId
                              : skaneCustomer
                              ? variant.skanePriceId
                              : dkCustomer
                              ? variant.danishPriceId
                              : variant.priceId
                          );
                          setSelectedVariant(variant); // Uppdatera selectedVariant när användaren gör ett val
                        }}
                        disabled={variant.disabled}
                        className="mt-2 mb-0 max-w-full max-w-md"
                      >
                        <span className="text-center">{variant.label}</span>
                        <br />
                        <span className="text-xs text-center">
                          {getProductCostForPriceId(
                            sthlmCustomer
                              ? variant.stockholmPriceId
                              : skaneCustomer
                              ? variant.skanePriceId
                              : dkCustomer
                              ? variant.danishPriceId
                              : variant.priceId,
                            lang
                          )}
                        </span>
                      </CheckoutButton>
                    );
                  })}
                </div>
              </>
  
              <>
  {/* Steg 3: Välj leveransdag */}
  <AnimatePresence mode="wait">
    {showDeliveryOptions && (
      <motion.div
        key="delivery-options"
        initial="closed"
        animate="open"
        exit="closed"
        variants={variants}
        className="mt-2 mb-4"
      >
        <h3
          key="title-delivery"
          className="font-poppins mt-2 text-lg text-secondary text-left px-4"
        >
          {text.order.deliveryDay}
        </h3>

        <div className="flex flex-col sm:flex-row sm:flex-wrap w-screen sm:w-auto gap-4 px-4">
          <AnimatePresence mode="wait">
            {deliveryDaysToChoose.map((day: any, index: number) => (
              <motion.div
                key={day.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.15 * index }}
                className="w-full sm:w-auto"
              >
                <CheckoutButton
                  className={`w-full sm:w-auto px-8 py-4 border bg-transparent text-neutral-700 font-medium border-primary rounded-md transition-all hover:bg-primary ${
                    selectedDay?.id === day.id ? "bg-primary text-[#6E2936] font-bold" : ""
                  }`}
                  selected={selectedWeekday == day.id}
                  onClick={() => {
                    if (selectedWeekday == day.id) {
                      setSelectedWeekday(null);
                      setDeliveryWindow(null);
                      setSelectedDay(null);
                      return;
                    }
                    setSelectedWeekday(day.id);
                    setDeliveryWindow(day);
                    setSelectedDay(day);
                  }}
                >
                  {day.label}
                  <p className="text-xs mt-1">{day.description}</p>
                </CheckoutButton>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    )}

    {/* OrderSummary visas här om variant och dag är valda */}
    {selectedVariant && selectedDay && (
      <OrderSummary
        selectedType={selectedType} // Vald matkasse, t.ex. "Familjekassen"
    selectedVariant={selectedVariant} // Den valda varianten, t.ex. "Prenumeration" eller "Engångsköp"
    selectedDay={selectedDay} // Vald leveransdag
    postalCode={address.postalCode} // Postnummer
    isDk={isDk} // Om postnumret tillhör Danmark
    productTypes={productTypes} // Skicka med produktdata
  lang={lang} // Skicka med det aktuella språket
      />
    )}
  </AnimatePresence>
</>

  
              {/* Steg 4: Adress- och kontaktinformation */}
              <>
                <label
                  htmlFor="address"
                  className="font-poppins mt-8 text-lg mb-2 text-secondary"
                >
                  {text.order.address}
                </label>
                <div className="grid grid-cols-2 gap-4 items-start my-2">
                  <Input
                    label={text.order.full_name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    parentClassName="col-span-2"
                    id="name"
                    placeholder={text.order.name_example}
                    error={formErrors.name}
                  />
                  <Input
                    label={text.order.delivery_address}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    type="text"
                    id="address"
                    placeholder="Klimatgatan 1"
                    error={formErrors.address}
                  />
                  <Input
                    label={text.order.city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    id="city"
                    placeholder={text.order.city_example}
                    error={formErrors.city}
                  />
                  <div className="w-full col-span-2 -mt-4">
                    <label
                      htmlFor="extraInfo"
                      className={twMerge(
                        `block w-full text-md font-bold text-primary-600 ml-1 px-1 max-w-fit bg-primary-200 translate-y-3 transition`
                      )}
                    >
                      {text.order.extra_info}
                    </label>
  
                    <textarea
                      id="extraInfo"
                      placeholder={text.order.extra_example}
                      onChange={(e) => setExtraInfo(e.target.value)}
                      className="border w-full border-primary bg-transparent p-2 rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none"
                    ></textarea>
                  </div>
                </div>
          
                <h3 className="font-poppins text-lg mt-3 text-secondary">
                  {text.order.contact}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    onChange={(e) => setPhone(e.target.value)}
                    id="phone"
                    label={text.order.phonenumber}
                    type="text"
                    inputMode="tel" // Allows the phone keypad on mobile devices
                    pattern="[\+]*[0-9\- ]*" // This pattern allows an optional "+" followed by numbers
                    placeholder={text.order.phonenumber_example}
                    parentClassName="col-span-2 -mt-2"
                    error={formErrors.phone}
                  />
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    label={text.order.email}
                    type="text"
                    placeholder={text.order.email_example}
                    error={formErrors.email}
                  />
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    label={text.order.password}
                    placeholder={text.order.password_example}
                    type="password"
                    error={formErrors.password}
                  />
                </div>
                <div className="w-full px-2 my-4">
                  <label className="">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setAgreeToTerms(e.target.checked)
                      }
                    />
                    <span>
                      {lang.order}{' '}
                      <a
                        href="https://www.saveabl.com/villkor"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'underline' }}
                      >
                        {text.order.terms}
                      </a>
                    </span>
                  </label>
                </div>
              </>
            </OrderWizard>
          )}
  
          {stripeCheckoutIsLoading && (
            <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-primary bg-opacity-70 flex justify-center items-center">
              <Title>Laddar...</Title>
            </div>
          )}
        </div>
      </Section>
       {/* Behåller FAQ och andra avsnitt */}
       <div id="vanliga-fragor">
            <Accordion faqs={text.order.faqItems} title={text.order.faq} />
          </div>
    </>
  )};
  
  // Export statement and shipping constants
  export default Order;
  
  const shippingDk = [
  "2620",
  "3450",
  "2880",
  "2750",
  "3460",
  "4632",
  "4140",
  "2605",
  "2660",
  "2700",
  "2920",
  "2791",
  "3120",
  "2870",
  "3060",
  "3520",
  "4173",
  "3480",
  "2000",
  "1800",
  "1801",
  "1802",
  "1803",
  "1804",
  "1805",
  "1806",
  "1807",
  "1808",
  "1809",
  "1810",
  "1811",
  "1812",
  "1813",
  "1814",
  "1815",
  "1816",
  "1817",
  "1818",
  "1819",
  "1820",
  "1822",
  "1823",
  "1824",
  "1825",
  "1826",
  "1827",
  "1828",
  "1829",
  "1850",
  "1851",
  "1852",
  "1853",
  "1854",
  "1855",
  "1856",
  "1857",
  "1860",
  "1861",
  "1862",
  "1863",
  "1864",
  "1865",
  "1866",
  "1867",
  "1868",
  "1870",
  "1871",
  "1872",
  "1873",
  "1874",
  "1875",
  "1876",
  "1877",
  "1878",
  "1879",
  "1900",
  "1901",
  "1902",
  "1903",
  "1904",
  "1905",
  "1906",
  "1908",
  "1909",
  "1910",
  "1911",
  "1912",
  "1913",
  "1914",
  "1915",
  "1916",
  "1917",
  "1920",
  "1921",
  "1922",
  "1923",
  "1924",
  "1925",
  "1926",
  "1927",
  "1928",
  "1950",
  "1951",
  "1952",
  "1953",
  "1954",
  "1955",
  "1956",
  "1957",
  "1958",
  "1959",
  "1960",
  "1961",
  "1962",
  "1963",
  "1964",
  "1965",
  "1966",
  "1967",
  "1970",
  "1971",
  "1972",
  "1973",
  "1974",
  "3600",
  "3300",
  "4621",
  "2820",
  "3250",
  "2600",
  "4171",
  "2670",
  "3230",
  "3330",
  "4622",
  "2640",
  "3150",
  "2900",
  "3200",
  "3000",
  "2730",
  "4160",
  "3400",
  "4300",
  "2840",
  "3100",
  "3050",
  "3390",
  "4330",
  "2650",
  "2970",
  "2635",
  "4040",
  "4174",
  "3630",
  "2690",
  "2770",
  "4360",
  "4070",
  "4060",
  "2930",
  "2980",
  "2800",
  "3490",
  "1050",
  "1051",
  "1052",
  "1053",
  "1054",
  "1055",
  "1056",
  "1057",
  "1058",
  "1059",
  "1060",
  "1061",
  "1062",
  "1063",
  "1064",
  "1065",
  "1066",
  "1067",
  "1068",
  "1069",
  "1070",
  "1071",
  "1072",
  "1073",
  "1074",
  "1100",
  "1101",
  "1102",
  "1103",
  "1104",
  "1105",
  "1106",
  "1107",
  "1110",
  "1111",
  "1112",
  "1113",
  "1114",
  "1115",
  "1116",
  "1117",
  "1118",
  "1119",
  "1120",
  "1121",
  "1122",
  "1123",
  "1124",
  "1125",
  "1126",
  "1127",
  "1128",
  "1129",
  "1130",
  "1131",
  "1150",
  "1151",
  "1152",
  "1153",
  "1154",
  "1155",
  "1156",
  "1157",
  "1158",
  "1159",
  "1160",
  "1161",
  "1162",
  "1164",
  "1165",
  "1166",
  "1167",
  "1168",
  "1169",
  "1170",
  "1171",
  "1172",
  "1173",
  "1174",
  "1175",
  "1200",
  "1201",
  "1202",
  "1203",
  "1204",
  "1205",
  "1206",
  "1207",
  "1208",
  "1209",
  "1210",
  "1211",
  "1212",
  "1213",
  "1214",
  "1215",
  "1216",
  "1218",
  "1219",
  "1220",
  "1221",
  "1250",
  "1251",
  "1252",
  "1253",
  "1254",
  "1255",
  "1256",
  "1257",
  "1259",
  "1260",
  "1261",
  "1263",
  "1264",
  "1265",
  "1266",
  "1267",
  "1268",
  "1270",
  "1271",
  "1300",
  "1301",
  "1302",
  "1303",
  "1304",
  "1306",
  "1307",
  "1308",
  "1309",
  "1310",
  "1311",
  "1312",
  "1313",
  "1314",
  "1315",
  "1316",
  "1317",
  "1318",
  "1319",
  "1320",
  "1321",
  "1322",
  "1323",
  "1324",
  "1325",
  "1326",
  "1327",
  "1328",
  "1329",
  "1350",
  "1352",
  "1353",
  "1354",
  "1355",
  "1356",
  "1357",
  "1358",
  "1359",
  "1360",
  "1361",
  "1362",
  "1363",
  "1364",
  "1365",
  "1366",
  "1367",
  "1368",
  "1369",
  "1370",
  "1371",
  "1400",
  "1401",
  "1402",
  "1403",
  "1406",
  "1407",
  "1408",
  "1409",
  "1410",
  "1411",
  "1412",
  "1413",
  "1414",
  "1415",
  "1416",
  "1417",
  "1418",
  "1419",
  "1420",
  "1421",
  "1422",
  "1423",
  "1424",
  "1425",
  "1426",
  "1427",
  "1428",
  "1429",
  "1430",
  "1432",
  "1434",
  "1435",
  "1436",
  "1437",
  "1438",
  "1439",
  "1440",
  "1441",
  "1450",
  "1451",
  "1452",
  "1453",
  "1454",
  "1455",
  "1456",
  "1457",
  "1458",
  "1459",
  "1460",
  "1461",
  "1462",
  "1463",
  "1464",
  "1465",
  "1466",
  "1467",
  "1468",
  "1470",
  "1471",
  "1472",
  "1473",
  "2200",
  "2400",
  "2300",
  "2450",
  "1550",
  "1551",
  "1552",
  "1553",
  "1554",
  "1555",
  "1556",
  "1557",
  "1558",
  "1559",
  "1560",
  "1561",
  "1562",
  "1563",
  "1564",
  "1567",
  "1568",
  "1569",
  "1570",
  "1571",
  "1572",
  "1573",
  "1574",
  "1575",
  "1576",
  "1577",
  "1600",
  "1601",
  "1602",
  "1603",
  "1604",
  "1605",
  "1606",
  "1607",
  "1608",
  "1609",
  "1610",
  "1611",
  "1612",
  "1613",
  "1614",
  "1615",
  "1616",
  "1617",
  "1618",
  "1619",
  "1620",
  "1621",
  "1622",
  "1623",
  "1624",
  "1631",
  "1632",
  "1633",
  "1634",
  "1635",
  "1650",
  "1651",
  "1652",
  "1653",
  "1654",
  "1655",
  "1656",
  "1657",
  "1658",
  "1659",
  "1660",
  "1661",
  "1662",
  "1663",
  "1664",
  "1665",
  "1666",
  "1667",
  "1668",
  "1669",
  "1670",
  "1671",
  "1672",
  "1673",
  "1674",
  "1675",
  "1676",
  "1677",
  "1699",
  "1700",
  "1701",
  "1702",
  "1703",
  "1704",
  "1705",
  "1706",
  "1707",
  "1708",
  "1709",
  "1710",
  "1711",
  "1712",
  "1714",
  "1715",
  "1716",
  "1717",
  "1718",
  "1719",
  "1720",
  "1721",
  "1722",
  "1723",
  "1724",
  "1725",
  "1726",
  "1727",
  "1728",
  "1729",
  "1730",
  "1731",
  "1732",
  "1733",
  "1734",
  "1735",
  "1736",
  "1737",
  "1738",
  "1739",
  "1749",
  "1750",
  "1751",
  "1752",
  "1753",
  "1754",
  "1755",
  "1756",
  "1757",
  "1758",
  "1759",
  "1760",
  "1761",
  "1762",
  "1763",
  "1764",
  "1765",
  "1766",
  "1770",
  "1771",
  "1772",
  "1773",
  "1774",
  "1775",
  "1777",
  "1799",
  "2100",
  "4600",
  "4320",
  "4623",
  "3360",
  "3540",
  "3370",
  "4190",
  "2760",
  "2990",
  "2150",
  "2850",
  "4100",
  "4000",
  "2960",
  "2610",
  "4050",
  "2942",
  "2740",
  "3320",
  "3550",
  "2765",
  "3070",
  "2680",
  "4180",
  "3660",
  "4370",
  "2860",
  "2630",
  "3080",
  "3220",
  "4030",
  "4340",
  "4350",
  "2500",
  "2625",
  "2665",
  "2720",
  "2950",
  "3210",
  "3670",
  "4130",
  "4390",
  "2830",
  "3500",
  "3140",
  "3310",
  "3650",
  "4792",
  "4942",
  "4550",
  "4941",
  "4242",
  "4793",
  "4791",
  "4261",
  "4983",
  "4293",
  "4895",
  "4593",
  "4863",
  "4640",
  "4654",
  "4250",
  "4540",
  "4591",
  "4874",
  "4532",
  "4571",
  "4862",
  "4281",
  "4912",
  "4690",
  "4681",
  "4960",
  "4684",
  "4871",
  "4913",
  "4652",
  "4573",
  "4270",
  "4534",
  "4872",
  "4490",
  "4450",
  "4400",
  "4771",
  "4653",
  "4736",
  "4892",
  "4672",
  "4220",
  "4772",
  "4750",
  "4930",
  "4735",
  "4440",
  "4900",
  "4800",
  "4500",
  "4296",
  "4880",
  "4700",
  "4840",
  "4572",
  "4951",
  "4720",
  "4420",
  "4243",
  "4291",
  "4970",
  "4673",
  "4683",
  "4581",
  "4990",
  "4262",
  "4583",
  "4230",
  "4200",
  "4460",
  "4780",
  "4295",
  "4773",
  "4952",
  "4480",
  "4660",
  "4671",
  "4850",
  "4470",
  "4520",
  "4920",
  "4733",
  "4891",
  "4943",
  "4682",
  "4241",
  "4953",
  "4560",
  "4760",
  "4873",
  "4894",
]; 