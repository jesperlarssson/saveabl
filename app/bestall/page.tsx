"use client";
import { useRouter } from "next/navigation";
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
  const id = searchParams.get("id") || "1";
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
      label: "Lördag 9/3 kl. 09-18",
      id: 6,
    },
    {
      label: "Söndag 10/3 kl. 10-17",
      id: 0,
    },
    {
      label: "Måndag 11/3 kl. 16-22",
      id: 1,
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
    if (zipCodeClean.length === 4) {
      setPostalCode(zipCodeClean);
    }
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
      shippingDk.includes(address.postalCode) &&
      address.postalCode.length === 4
    ) {
      console.log("DK");
      setIsDk(true);
      setShowLinks(true);
      setShowAddressFields(false);
    } else if (
      address.postalCode.length === 5 &&
      (stockholmPostalCodes.includes(address.postalCode) ||
        shippingCostStage2.includes(address.postalCode) ||
        shippingCostStage1.includes(address.postalCode) ||
        free.includes(address.postalCode))
    ) {
      setIsDk(false);
      setShowLinks(false);
      setShowAddressFields(true);
    } else {
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
    setCountry("SE");
    setStripeCheckoutIsLoading(true);

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
        // description: `Vald leverans: ${formatEpochToTimeString({
        //   start: deliveryWindow?.start || undefined,
        //   end: deliveryWindow?.end || undefined,
        // })} Extra info: ${userInformation.extraInfo}`,
        phone: userInformation.phone,
        extraInfo: userInformation.extraInfo,
      });
      const stripeUserId = response.data.stripeUser.id;
      const shippingPriceId = getShippingCostForProductId(productId);
      // create checkout session
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
          message: "Det finns redan en användare med den e-postadressen",
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
      address.postalCode &&
      stockholmPostalCodes.includes(address.postalCode)
    ) {
      setDeliveryDaysToChoose([
        {
          label: "Söndag 10/3 kl. 10-17",
          id: 0,
        },
        {
          label: "Måndag 11/3 kl. 16-22",
          id: 1,
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
            {/* {shippingCostInfo && (
            <div className="mt-2 font-bold text-secondary">
              {" "}
              Din fraktkostnad: {shippingCostInfo}
            </div>
          )} */}
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
            <CheckoutSection title={text.order.linkTitle}>
              <h3 className="font-poppins text-lg text-secondary ">
                {text.order.type}
              </h3>
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
              <h3
                key="interval-title"
                className="font-poppins text-lg mt-4 text-secondary"
              >
                {text.order.variant}
              </h3>
              <div className="flex gap-4">
                {selectedType.variants.map((variant: any) => {
                  const postalCode = address.postalCode || "";
                  const sthlmCustomer =
                    stockholmPostalCodes.includes(postalCode);
                  return (
                    <CheckoutButton
                      key={variant.label}
                      selected={
                        sthlmCustomer
                          ? variant.stockholmPriceId === productId
                          : variant.priceId === productId
                      }
                      onClick={() =>
                        setProductId(
                          sthlmCustomer
                            ? variant.stockholmPriceId
                            : variant.priceId
                        )
                      }
                      disabled={variant.disabled}
                    >
                      <span>{variant.label}</span>
                      <br />
                      <span className="text-xs">
                        {getProductCostForPriceId(
                          sthlmCustomer
                            ? variant.stockholmPriceId
                            : variant.priceId
                        )}
                      </span>
                    </CheckoutButton>
                  );
                })}
              </div>
              <AnimatePresence mode="wait">
                {showDeliveryOptions && (
                  <motion.div
                    key="delivery-options"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={variants}
                    className="mt-2"
                  >
                    <h3
                      key="title-delivery"
                      className="font-poppins text-lg text-secondary"
                    >
                      {text.order.deliveryDay}
                    </h3>
                    {/** TODO: Doesn't work for all zips */}

                    <div className="flex gap-4 flex-wrap">
                      <AnimatePresence mode="wait">
                        {deliveryDaysToChoose.map((day: any, index: number) => (
                          <motion.div
                            key={day.label}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: 0.15 * index }}
                          >
                            <CheckoutButton
                              className="capitalize"
                              selected={selectedWeekday == day.id}
                              onClick={() => {
                                if (selectedWeekday == day.id) {
                                  setSelectedWeekday(null);
                                  setDeliveryWindow(null);
                                  return;
                                }
                                setSelectedWeekday(day.id);
                                setDeliveryWindow(day);
                              }}
                            >
                              {day.label}
                            </CheckoutButton>
                          </motion.div>
                        ))}

                        {/* {deliveryWindowsErrors &&
                        deliveryWindows.length == 0 ? (
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
                        )} */}
                      </AnimatePresence>
                    </div>
                    {/* {selectedWeekday != null && (
                      <>
                        <h3 className="font-poppins text-lg mt-4 text-secondary">
                          När vill du ha din matkasse?
                        </h3>
                        <div className="flex gap-4 flex-wrap max-w-xl mb-6">
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
                                    selected={
                                      deliveryWindow?.start == window.start
                                    }
                                    onClick={() => {
                                      if (
                                        deliveryWindow?.start == window.start
                                      ) {
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
                    )} */}
                  </motion.div>
                )}
              </AnimatePresence>
              <label
                htmlFor="address"
                className="font-poppins text-lg mb-2 mt-2 text-secondary"
              >
                {text.order.address}
              </label>
              <div className="grid grid-cols-2 gap-4 items-start my-4">
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

              <h3 className="font-poppins text-lg mt-4 text-secondary">
                {text.order.contact}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  label={text.order.phonenumber}
                  type="text"
                  placeholder="0701234567"
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
                  {text.order.terms}
                </label>
              </div>
              <Button onClick={handleConfirm}>{text.order.payButton}</Button>
            </CheckoutSection>
          )}
        </div>
      </Section>
      {stripeCheckoutIsLoading && (
        <div
          className="fixed top-0 left-0 z-50 w-screen h-screen bg-primary bg-opacity-70 flex justify-center items-center
      "
        >
          <Title>Laddar...</Title>
        </div>
      )}
    </>
  );
};

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
