"use client";
import { useRouter, useSearchParams } from "next/navigation";
import NextImage from "next/image";
import { twMerge } from "tailwind-merge";
import useCheckout from "@/hooks/useCheckout";
import CheckoutStepBar from "./components/CheckoutStepBar";
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Section from "@/components/ui/Section";
import { AnimatePresence, motion } from "framer-motion";
import Title from "@/components/ui/Title";
import getDeliveryWindowsForPostalCode from "@/actions/getDeliveryWindowsForPostalCode";
import { UserInformation } from "@/providers/CheckoutProvider";
import OrderWizard, { OrderWizardHandle } from "./OrderWizard";
import OrderSummary from "./OrderSummary";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import gardAnimation from "@/public/anim/gard.json";
import {
  getProductCostForPriceId,
  isSubscription,
  getProductTypesFromLngCode,
} from "./lib/productTypes";
import Input from "@/components/ui/Input";
import BodyText from "@/components/ui/BodyText";
import PaymentArea from "./components/paymentArea";
import { useLang } from "@/hooks/useLang";
import { CheckoutButton } from "./components/CheckoutButton";
import axios from "axios";
import { formatEpochToTimeString } from "@/helpers/epochFormat";
import {
  stockholmPostalCodes1,
  stockholmPostalCodes2,
  stockholmPostalCodes3,
  skanePostalCodes1,
  skanePostalCodes2,
  vastPostalCodes1,
  vastPostalCodes2,
  vastPostalCodes3,
  vastPostalCodes4,
  vastPostalCodes5,
  vastPostalCodes6,
  vastPostalCodes7,
} from "@/lib/zipCodes";

/* ------------ Animations ------------- */
const variants = {
  open: { opacity: 1, height: "auto", y: 0 },
  closed: { opacity: 0, height: 0, y: -20 },
};

/* ---------- Steg-konfiguration ---------- */
const SUBSTEPS_IN_VAL = 5;

/* ---------- Gemensam typografi ---------- */
const STEP_GROUP = "w-full flex flex-wrap justify-center gap-4 px-2";

/* Enhetligt block: rubrik + hjälptext */
const QBlock: React.FC<{
  title: React.ReactNode;
  help: React.ReactNode;
  className?: string;
}> = ({ title, help, className }) => (
  <div
    className={twMerge(
      "max-w-xl sm:max-w-2xl mx-auto px-2 text-left sm:text-center",
      className
    )}
  >
    <h3 className="font-poppins font-bold text-secondary text-2xl sm:text-[28px] lg:text-[32px] mb-1">
      {title}
    </h3>
    <p className="text-gray-700 text-base leading-relaxed tracking-wide mt-3 mb-3 sm:mb-4">
      {help}
    </p>
  </div>
);

/* Titel-komponent */
const StepHeader: React.FC<{ title?: string; className?: string }> = ({
  title,
  className,
}) => (
  <div className={twMerge("px-4 text-left sm:text-center", className)}>
    {title && (
      <h1 className="font-bold font-poppins text-secondary text-2xl sm:text-[28px] lg:text-[32px] tracking-tight mb-0">
        {title}
      </h1>
    )}
  </div>
);

/* -------------------------------------------------------------------- */

type RowError = { message: string | null };
type FormError = {
  name: RowError | null;
  address: RowError | null;
  phone: RowError | null;
  email: RowError | null;
  password: RowError | null;
  city: RowError | null;
  extraInfo: RowError | null;
};

const Order = () => {
  const { text, lang } = useLang();
  const router = useRouter();

  // --- Sticky stepbar under header ---
  const barWrapRef = useRef<HTMLDivElement>(null);
  const [barH, setBarH] = useState(0);
  const [stickyTop, setStickyTop] = useState(0);

  const measureBar = () => setBarH(barWrapRef.current?.offsetHeight ?? 0);
  const recomputeStickyTop = () => {
    const header = document.getElementById("site-header");
    if (!header) return setStickyTop(0);
    const bottom = header.getBoundingClientRect().bottom;
    setStickyTop(Math.max(0, Math.round(bottom)));
  };

  useEffect(() => {
    measureBar();
    recomputeStickyTop();
    const onScroll = () => recomputeStickyTop();
    const onResize = () => {
      measureBar();
      recomputeStickyTop();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, []);

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => {
      recomputeStickyTop(); // uppdatera när headern (mobilmenyn) ändrar höjd
    });
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  // STEG 1: Grön eller Gård
  const [selectedSmartType, setSelectedSmartType] =
    useState<"veg" | "gard" | null>(null);

  // Produkt-typer (3–4 pers / 2–3 pers)
  const [productTypes, setProductTypes] = useState<any[]>(
    getProductTypesFromLngCode(lang)
  );
  const [selectedType, setSelectedType] = useState<any>(null);

  useEffect(() => {
    const next = getProductTypesFromLngCode(lang);
    setProductTypes(next);
    setSelectedType(null); // ingen auto-select → steg 2 låst tills val
  }, [lang]);

  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [selectedDay, setSelectedDay] = useState<any>(null);

  const [wizardStep, setWizardStep] = useState(1);
  const [wizardTotal, setWizardTotal] = useState(5);

  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [canDeliver, setCanDeliver] = useState(false);

  // status för auto-validering av postnummer
  const [serviceStatus, setServiceStatus] = useState<"unknown" | "ok" | "no">(
    "unknown"
  );

  const [stripeCheckoutIsLoading, setStripeCheckoutIsLoading] = useState(false);

  // "Fåtal kvar..."-flagga
  const [showUrgency, setShowUrgency] = useState(false);
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const day = now.getDay(); // tis=2, ons=3
      const hours = now.getHours();
      const minutes = now.getMinutes();
      if (
        (day === 2 && (hours > 18 || (hours === 18 && minutes >= 7))) ||
        day === 3
      ) {
        setShowUrgency(true);
      } else {
        setShowUrgency(false);
      }
    };
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // uppdatera top/height när baren blir synlig
  useEffect(() => {
    if (canDeliver) {
      requestAnimationFrame(() => {
        measureBar();
        recomputeStickyTop();
      });
    }
  }, [canDeliver, wizardStep]);

  const searchParams = useSearchParams();
  const id = searchParams?.get("id") || "1";
  const offerId = parseInt(id, 10);

  const [deliveryWindows, setDeliveryWindows] = useState<any[]>([]);
  const [showLinks, setShowLinks] = useState(false);

  const [deliveryWindowsErrors, setDeliveryWindowsErrors] =
    useState<string | null>(null);

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

  const getDayLabelFromId = (id: number | null | undefined) =>
    id === null || id === undefined
      ? deliveryDaysToChoose.find(
          (d) => d.id === deliveryDaysToChoose[0].id
        )?.label
      : deliveryDaysToChoose.find((d) => d.id === id)?.label;

  // Endast set-delen behövs; vi vill inte läsa värdet → undvik noUnusedLocals
  const [, setWeekdaysWithDays] = useState<{ weekday: string; days: number[] }[]>(
    []
  );

  const [selectedWeekday, setSelectedWeekday] = useState<number | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
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

  // --- Gård-regeln: ta bort måndag i Sverige ---
  const applyGardMondayRule = React.useCallback(
    (days: Array<{ id: number; label: string; description?: string }>) => {
      if (selectedSmartType === "gard" && !isDk) {
        return days.filter((d) => d.id !== 1); // 1 = måndag
      }
      return days;
    },
    [selectedSmartType, isDk]
  );

  // Tålig mot både { windows } och ren array
  const updateWeekdaysList = (payload: any) => {
    const wins: any[] = Array.isArray(payload) ? payload : payload?.windows ?? [];
    const temp: { weekday: string; days: number[] }[] = [];
    wins.forEach((window: any) => {
      const date = new Date(window.start * 1000);
      const weekday = date.toLocaleDateString("sv-SE", { weekday: "long" });
      const day = date.getDay();
      if (day === 2) return;
      const existing = temp.find((i) => i.weekday === weekday);
      if (existing) existing.days.push(day);
      else temp.push({ weekday, days: [day] });
    });
    setWeekdaysWithDays(temp);
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

  /** ------------ AUTO: validera postnummer medan man skriver ------------- */
  // Kontroll av leveransområde — DK pausad
const serviceable = (pcRaw: string) => {
  const pc = pcRaw.trim();
  // Endast svenska postnummer (5 siffror)
  const isSE = pc.length === 5;

  const okSE =
    isSE &&
    (stockholmPostalCodes1.includes(pc) ||
      stockholmPostalCodes2.includes(pc) ||
      stockholmPostalCodes3.includes(pc) ||
      skanePostalCodes1.includes(pc) ||
      skanePostalCodes2.includes(pc) ||
      vastPostalCodes1.includes(pc) ||
      vastPostalCodes2.includes(pc) ||
      vastPostalCodes3.includes(pc) ||
      vastPostalCodes4.includes(pc) ||
      vastPostalCodes5.includes(pc) ||
      vastPostalCodes6.includes(pc) ||
      vastPostalCodes7.includes(pc));

  // DK pausad: inga 4-siffriga postnummer behandlas
  return { ok: okSE, isDK: false };
};


const handleZipCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const zip = e.target.value;
  const clean = zip.replace(/\D/g, "");
  setPostalCode(clean);

  // Endast svenska postnummer: agera först NÄR vi har 5 siffror
  if (clean.length === 5) {
    const { ok, isDK } = serviceable(clean); // isDK kommer alltid vara false i din nuvarande serviceable
    setIsDk(isDK);
    setServiceStatus(ok ? "ok" : "no");
    setShowDeliveryOptions(true);

    try {
      const dw = await getDeliveryWindowsForPostalCode(clean, "se");
      updateWeekdaysList(dw.windows ?? dw);
      setDeliveryWindows(dw.windows ?? []);
      setDeliveryPeriodId(dw.deliveryPeriodId);
    } catch {
      setDeliveryWindowsErrors("Något gick fel. Kontrollera postkoden!");
    }
  } else {
    // Under 5 tecken: visa neutralt läge utan hopp
    setIsDk(false);
    setServiceStatus("unknown");
    setShowDeliveryOptions(false);
    setDeliveryWindows([]); // rensa ev. gamla slots så inget blinkar
  }
};


  /** Knappen: om vi levererar → gå vidare, annars visa fel */
  const handleContinue = () => {
    if (serviceStatus !== "ok") {
      toast.error("Skriv ett giltigt postnummer först");
      return;
    }
    setShowLinks(false);
    setShowAddressFields(true);
    setCanDeliver(true);
    requestAnimationFrame(() => {
      measureBar();
      recomputeStickyTop();
    });
  };

  const handleConfirm = async () => {
    const country = isDk ? "DK" : "SE";
    setCountry(country);
    const countryCode = isDk ? "DK" : "SE";
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

    if (!name || name.length < 2)
      errors.name = { message: "Fyll i ditt fullständiga namn" };
    if (!address.street || address.street.length < 2)
      errors.address = { message: "Fyll i din adress" };
    if (!phone || phone.length < 2)
      errors.phone = {
        message:
          country === "SE"
            ? "Fyll i ditt telefonnummer"
            : "Fyll i ditt telefonnummer (DK)",
      };
    if (!email || email.length < 2)
      errors.email = { message: "Fyll i din e-post" };
    if (!password || password.length < 6)
      errors.password = { message: "Fyll i ditt lösenord längre än 6 tecken" };
    if (!address.city || address.city.length < 2)
      errors.city = {
        message: country === "SE" ? "Fyll i din stad" : "Fyll i din stad (DK)",
      };

    setFormErrors(errors);
    const hasErrors = Object.values(errors).some((e) => e !== null);
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
      const deliveryDayLabel = getDayLabelFromId(selectedWeekday) ?? "Okänt";
      const people = (selectedType?.label ?? "").replace(/\s*[-–]\s*/g, "-");
      const descriptionForStripe =
  `Vald leverans: ${deliveryDayLabel}\n` +
  `Antal personer: ${people}\n` +
  `Matkasse: ${selectedSmartType === "gard" ? "Saveabl Gård" : "Saveabl Grön"}\n` +
  `Extra info: ${userInformation.extraInfo || ""}`;


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
        description: descriptionForStripe,

        phone: userInformation.phone,
        extraInfo: userInformation.extraInfo,
      });
      const stripeUserId = response.data.stripeUser.id;
      const sessionResponse = await axios.post("/api/checkout_sessions", {
        customerId: stripeUserId,
        mode: isSubscription(productId) ? "subscription" : "payment",
        country: countryCode,
        items: [{ price: productId, quantity: 1 }],
      });
      router.push(sessionResponse.data.url);
    } catch (error) {
      setFormErrors({
        ...formErrors,
        email: { message: "Kontrollera att alla rutor är ifyllda korrekt" },
      });
      setStripeCheckoutIsLoading(false);
    }
  };

  // Bygg leveransdagar per postnummer
  useEffect(() => {
    if (address.postalCode && address.postalCode.length < 4) setShowLinks(false);

    if (typeof address.postalCode === "string") {
      // Stockholm
      if (stockholmPostalCodes1.includes(address.postalCode)) {
        setDeliveryDaysToChoose([
          { label: text.order.stockholm_sunday, id: 0, description: text.order.sunday_description_stockholm },
          { label: text.order.stockholm_monday, id: 1, description: text.order.monday_description_stockholm },
        ]);
      } else if (stockholmPostalCodes2.includes(address.postalCode)) {
        setDeliveryDaysToChoose([
          { label: text.order.stockholm_sunday, id: 0, description: text.order.sunday_description_stockholm },
        ]);
      } else if (stockholmPostalCodes3.includes(address.postalCode)) {
        setDeliveryDaysToChoose([
          { label: text.order.stockholm_monday, id: 1, description: text.order.monday_description_stockholm },
        ]);
      }

      // Skåne
      else if (skanePostalCodes1.includes(address.postalCode)) {
        setDeliveryDaysToChoose([
          { label: text.order.delivery_sunday, id: 0, description: text.order.sunday_description },
          { label: text.order.delivery_monday, id: 1, description: text.order.monday_description },
        ]);
      } else if (skanePostalCodes2.includes(address.postalCode)) {
        setDeliveryDaysToChoose([
          { label: text.order.delivery_monday, id: 1, description: text.order.monday_description },
        ]);
      }

      // Västra Götaland
      else if (vastPostalCodes1.includes(address.postalCode)) {
        setDeliveryDaysToChoose([
          { label: text.order.delivery_saturday, id: 6, description: text.order.saturday_description },
          { label: text.order.delivery_sunday, id: 0, description: text.order.sunday_description },
          { label: text.order.delivery_monday, id: 1, description: text.order.monday_description },
        ]);
      } else if (vastPostalCodes2.includes(address.postalCode)) {
        setDeliveryDaysToChoose([
          { label: text.order.delivery_saturday, id: 6, description: text.order.saturday_description },
          { label: text.order.delivery_monday, id: 1, description: text.order.monday_description },
        ]);
      } else if (vastPostalCodes3.includes(address.postalCode)) {
        setDeliveryDaysToChoose([{ label: text.order.delivery_monday, id: 1, description: text.order.monday_description }]);
      } else if (vastPostalCodes4.includes(address.postalCode)) {
        setDeliveryDaysToChoose([{ label: text.order.delivery_saturday, id: 6, description: text.order.saturday_description }]);
      } else if (vastPostalCodes5.includes(address.postalCode)) {
        setDeliveryDaysToChoose([{ label: text.order.delivery_sunday, id: 0, description: text.order.sunday_description }]);
      } else if (vastPostalCodes6.includes(address.postalCode)) {
        setDeliveryDaysToChoose([
          { label: text.order.delivery_saturday, id: 6, description: text.order.saturday_description },
          { label: text.order.delivery_sunday, id: 0, description: text.order.sunday_description },
        ]);
      } else if (vastPostalCodes7.includes(address.postalCode)) {
        setDeliveryDaysToChoose([
          { label: text.order.delivery_sunday, id: 0, description: text.order.sunday_description },
          { label: text.order.delivery_monday, id: 1, description: text.order.monday_description },
        ]);
      }
    }

    // Danmark
    if (typeof address.postalCode === "string" && shippingDk.includes(address.postalCode)) {
      setDeliveryDaysToChoose([
        { label: text.order.copenhagen_monday, id: 0, description: text.order.monday_description_copenhagen },
      ]);
    }

    // → Applicera Gård-regeln efter att listan satts
    setDeliveryDaysToChoose((prev) => applyGardMondayRule(prev));
  }, [address.postalCode, text.order, applyGardMondayRule]);

  // Reagera om man växlar mellan Grön/Gård eller DK-flaggan ändras
  useEffect(() => {
    setDeliveryDaysToChoose((prev) => {
      const next = applyGardMondayRule(prev);

      // Om måndag var vald och nu ej tillåten → rensa
      if (
        selectedSmartType === "gard" &&
        !isDk &&
        (selectedDay?.id === 1 || selectedWeekday === 1)
      ) {
        setSelectedDay(null);
        setSelectedWeekday(null);
        setDeliveryWindow(null);
      }

      return next;
    });
  }, [selectedSmartType, isDk, applyGardMondayRule]); // eslint-disable-line react-hooks/exhaustive-deps

  // Räkna ut phase + within (3 steg)
  const progress = useMemo(() => {
    let ph: 1 | 2 | 3 = 1;
    let w = 0;

    if (wizardStep <= SUBSTEPS_IN_VAL) {
      w = (wizardStep - 1) / (SUBSTEPS_IN_VAL - 1);
    } else if (wizardStep === SUBSTEPS_IN_VAL + 1) {
      ph = 2;
      w = 0;
    } else {
      ph = 2;
      w = 0;
    }

    if (stripeCheckoutIsLoading) {
      ph = 3;
      w = 0;
    }
    return { ph, w };
  }, [wizardStep, stripeCheckoutIsLoading]);

  // Etiketter
  const stepLabels: [string, string, string] = [
    String(text?.order?.step_val ?? "Val"),
    String(text?.order?.step_details ?? "Uppgifter"),
    String(text?.order?.step_payment ?? "Betalning"),
  ];

  // Back-knappen
  const wizardRef = useRef<OrderWizardHandle>(null);
  const handleBack = () => {
    if (!canDeliver) {
      router.back();
      return;
    }
    if (wizardStep > 1) {
      wizardRef.current?.prev();
    } else {
      setShowAddressFields(false);
      setCanDeliver(false);
    }
  };

  // --- LÅSNING AV "Fortsätt" I ALLA STEG ---
  const canProceedGuard = (step: number) => {
    switch (step) {
      case 1: return !!selectedSmartType;   // valt Smartkasse (veg/gard)
      case 2: return !!selectedType;        // valt antal personer
      case 3: return !!selectedVariant;     // valt frekvens/variant
      case 4: return !!selectedDay;         // valt leveransdag
      case 5:
        return (
          (name?.length ?? 0) > 1 &&
          (address?.street?.length ?? 0) > 1 &&
          (address?.city?.length ?? 0) > 1 &&
          (phone?.length ?? 0) > 1 &&
          (email?.length ?? 0) > 3 &&
          (password?.length ?? 0) >= 6 &&
          agreeToTerms
        );
      default:
        return true;
    }
  };

  return (
    <>
      {canDeliver && (
        <>
          <div
            ref={barWrapRef}
            className="fixed left-0 right-0 bg-[#FCF7E8] z-20 md:z-[60]"
            style={{ top: stickyTop }}
          >
            <div className="w-full max-w-[1120px] mx-auto px-3 sm:px-7">
              <div className="relative pt-6 md:pt-0 md:pl-12">
                {/* Back arrow */}
                <button
                  type="button"
                  aria-label="Tillbaka"
                  onClick={handleBack}
                  className={`
                    absolute
                    -top-1 left-2 w-12 h-12 text-[26px]
                    md:top-1/2 md:-translate-y-1/2 md:left-3 md:w-12 md:h-12 md:text-[24px]
                    rounded-full flex items-center justify-center
                    hover:bg-primary/10 text-secondary
                  `}
                >
                  <span aria-hidden className="leading-none">←</span>
                </button>

                {/* Step bar */}
                <CheckoutStepBar
                  key={stepLabels.join("|")}
                  phase={progress.ph}
                  within={progress.w}
                  labels={stepLabels}
                />
              </div>
            </div>
          </div>
          <div style={{ height: barH }} />
        </>
      )}

      <Section className="pt-16 overflow-visible">
        <div className="w-full flex flex-col items-center ">
          {/* Pre-checkout */}
          {!canDeliver && (
            <>
              {/* Titel + ikon beroende på status */}
              <div className="text-center">
                {serviceStatus === "ok" && (
                  <div className="mx-auto mb-2 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary bg-opacity-90 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-[#6E2936]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                  </div>
                )}

                {serviceStatus === "no" && (
                  <div className="mx-auto mb-2 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary bg-opacity-90 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-[#6E2936]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                )}

                <Title className="text-center">
                  {serviceStatus === "ok"
                    ? (text.order.we_deliver_to_you ?? "Vi levererar till ditt område 🎉")
                    : serviceStatus === "no"
                    ? (text.order.no_delivery_to_you ?? "Vi levererar tyvärr inte till ditt område just nu")
                    : id === "1"
                    ? text.order.title1
                    : text.order.title2}
                </Title>
              </div>

              <BodyText className="text-center max-w-3xl mb-4">
                {id === "1" ? "" : text.order.text}
              </BodyText>

              <div className="my-8 max-w-4xl w-full h-1 border-b border-primary border-opacity-50" />

              <div className="flex flex-col items-center my-4">
                <label
                  htmlFor="postalcode"
                  className="font-poppins text-lg mb-2 text-secondary w-full text-center"
                >
                  {id === "1" ? text.order.label1 : text.order.label2}
                </label>

                <div className="relative w-full max-w-xl">
                  <input
                    onChange={handleZipCodeChange}
                    id="postalcode"
                    placeholder="12345"
                    className={`
                      border bg-transparent p-2 rounded-md font-bold w-full
                      placeholder-secondary placeholder-opacity-10 text-secondary
                      ring-1 ring-transparent focus:ring-primary focus:outline-none
                      pr-10
                      ${
                        serviceStatus === "ok"
                          ? "border-[#6E2936]"
                          : serviceStatus === "no"
                          ? "border-[#B42318]"
                          : "border-primary"
                      }
                    `}
                    aria-describedby="zip-feedback"
                    inputMode="numeric"
                  />

                  {/* ikon till höger i fältet */}
                  {serviceStatus === "ok" && (
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-[#6E2936]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                  )}
                  {serviceStatus === "no" && (
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-[#B42318]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </span>
                  )}

                  <span id="zip-feedback" className="sr-only" aria-live="polite">
                    {serviceStatus === "ok"
                      ? (text.order.zip_ok_sr ?? "Vi levererar till dig")
                      : serviceStatus === "no"
                      ? (text.order.zip_no_sr ?? "Vi levererar tyvärr inte till dig")
                      : ""}
                  </span>
                </div>

                <button
                  disabled={serviceStatus !== "ok"}
                  onClick={handleContinue}
                  className={`
                    w-64 mx-auto py-2 rounded-full font-bold mt-4
                    ${
                      serviceStatus === "ok"
                        ? "bg-primary text-secondary bg-opacity-90 hover:bg-opacity-100"
                        : "bg-primary text-secondary opacity-50 cursor-not-allowed"
                    }
                  `}
                >
                  {serviceStatus === "ok"
                    ? (text.order.continue ?? "Fortsätt")
                    : serviceStatus === "no"
                    ? (text.order.outside_area_badge ?? "Utanför leveransområde")
                    : id === "1"
                    ? text.order.button1
                    : text.order.button2}
                </button>
              </div>

              <div id="deliverySection" className="w-full max-w-md mt-2">
                <Lottie animationData={gardAnimation} loop={true} />
              </div>

              <div className="my-8 max-w-4xl w-full h-1 border-b border-primary border-opacity-50" />

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
            </>
          )}

          {showAddressFields && (
            <>
              <OrderWizard
                ref={wizardRef}
                handleConfirm={handleConfirm}
                stripeCheckoutIsLoading={stripeCheckoutIsLoading}
                selectedType={selectedType}
                selectedSmartType={selectedSmartType}
                selectedVariant={selectedVariant}
                selectedDay={selectedDay}
                setSelectedVariant={setSelectedVariant}
                setSelectedSmartType={setSelectedSmartType}
                setSelectedDay={setSelectedDay}
                setDeliveryWindow={setDeliveryWindow}
                setSelectedWeekday={setSelectedWeekday}
                postalCode={address.postalCode}
                onStepChange={(s, total) => {
                  setWizardStep(s);
                  setWizardTotal(total);
                }}
                canProceedGuard={canProceedGuard}
              >
                {/* --- Steg 1: Smartkasse --- */}
                <>
                  <QBlock title={text.order.smartkasse?.title} help={text.order.help_smartkasse} />
                  <div className={STEP_GROUP}>
                    <CheckoutButton
                      selected={selectedSmartType === "veg"}
                      onClick={() => setSelectedSmartType("veg")}
                      className="w-full sm:w-auto"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-center">{text.order.smartkasse?.options?.veg}</span>
                        <span className="text-xs leading-snug opacity-80 mt-1 text-center">
                          {text.order.smartkasse?.notes?.veg ?? text.order.smartkasse?.noteVeg ?? ""}
                        </span>
                        <div className="relative mt-3 rounded-xl overflow-hidden w-[9.75rem] sm:w-[10.75rem] md:w-[11.75rem]" style={{ aspectRatio: "4 / 3" }}>
                          <NextImage src="/images/saveabl-gron.jpg" alt="Vegetariska middagar gjorda på utvalda råvaror" fill sizes="(min-width:1024px) 188px, (min-width:640px) 172px, 156px" className="object-cover" />
                        </div>
                      </div>
                    </CheckoutButton>

                    <CheckoutButton
                      selected={selectedSmartType === "gard"}
                      onClick={() => setSelectedSmartType("gard")}
                      className="w-full sm:w-auto"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-center">{text.order.smartkasse?.options?.gard}</span>
                        <span className="text-xs leading-snug opacity-80 mt-1 text-center">
                          {text.order.smartkasse?.notes?.gard ?? text.order.smartkasse?.noteGard ?? ""}
                        </span>
                        <div className="relative mt-3 rounded-xl overflow-hidden w-[9.75rem] sm:w-[10.75rem] md:w-[11.75rem]" style={{ aspectRatio: "4 / 3" }}>
                          <NextImage src="/images/saveabl-gard.jpg" alt="Mixade middagar med svenskt kött & fisk + utvalda råvaror" fill sizes="(min-width:1024px) 188px, (min-width:640px) 172px, 156px" className="object-cover" />
                        </div>
                      </div>
                    </CheckoutButton>
                  </div>
                </>

                {/* --- Steg 2: Antal personer --- */}
                <>
                  <QBlock title={text.order.type} help={text.order.help_type} />
                  <div className={STEP_GROUP}>
                    {productTypes.map((productType) => (
                      <CheckoutButton
                        key={productType.label}
                        selected={productType.id === selectedType?.id}
                        onClick={() => {
                          setSelectedType(productType);

                          // lås steg 3 tills variant valts manuellt
                          setSelectedVariant(null);
                          setProductId("");

                          // nollställ leveransval
                          setSelectedDay(null);
                          setDeliveryWindow(null);
                          setSelectedWeekday(null);
                        }}
                        className="w-full sm:w-auto"
                      >
                        {productType.label}
                        <br />
                        <span className="text-xs">{productType.recipes}</span>
                      </CheckoutButton>
                    ))}
                  </div>
                </>

                {/* Steg 3: Hur ofta */}
                <>
                  <QBlock title={text.order.variant} help={text.order.help_variant} />
                  <div className={`${STEP_GROUP} max-w-2xl mx-auto`}>
                    {selectedType?.variants?.map((variant: any) => {
                      const postalCode = address.postalCode || "";
                      const sthlmCustomer =
                        stockholmPostalCodes1.includes(postalCode) ||
                        stockholmPostalCodes2.includes(postalCode) ||
                        stockholmPostalCodes3.includes(postalCode);
                      const skaneCustomer =
                        skanePostalCodes1.includes(postalCode) ||
                        skanePostalCodes2.includes(postalCode);
                      const dkCustomer = shippingDk.includes(postalCode);

                      // Välj rätt regions-objekt (har .veg och .gard)
                      const regional =
                        sthlmCustomer
                          ? variant.stockholmPriceId
                          : skaneCustomer
                          ? variant.skanePriceId
                          : dkCustomer
                          ? variant.danishPriceId
                          : variant.priceId;

                      // Välj veg/gard från steg 1
                      const currentPriceId =
                        (selectedSmartType === "gard" ? regional?.gard : regional?.veg) || "";

                      return (
                        <CheckoutButton
                          key={variant.label}
                          selected={currentPriceId === productId}
                          onClick={() => {
                            setProductId(currentPriceId); // Stripe PRICE id
                            setSelectedVariant(variant);
                            setSelectedDay(null);
                            setDeliveryWindow(null);
                            setSelectedWeekday(null);
                          }}
                          disabled={variant.disabled}
                          className="w-full sm:w-auto"
                        >
                          <span className="text-center">{variant.label}</span>
                          <br />
                          <span className="text-xs text-center">
                            {getProductCostForPriceId(currentPriceId, lang)}
                          </span>
                        </CheckoutButton>
                      );
                    })}
                  </div>
                </>

                {/* Steg 4: Leveransdag (+ sammanfattning) */}
                <>
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
                        <StepHeader />
                        <QBlock title={text.order.deliveryDay} help={text.order.help_deliveryDay} />
                        <div className={`${STEP_GROUP} max-w-3xl mx-auto`}>
                          <AnimatePresence mode="wait">
                            {deliveryDaysToChoose.map((day: any, index: number) => (
                              <motion.div
                                key={day.label}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: 0.05 * index }}
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
                                  {showUrgency && <h4 className="text-xs mt-2">{text.order.urgency}</h4>}
                                </CheckoutButton>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}

                    {selectedVariant && selectedDay && (
                      <OrderSummary
                        selectedType={selectedType}
                        selectedSmartType={selectedSmartType}
                        selectedVariant={selectedVariant}
                        selectedDay={selectedDay}
                        postalCode={address.postalCode}
                        isDk={isDk}
                        productTypes={productTypes}
                        lang={lang}
                      />
                    )}
                  </AnimatePresence>
                </>

                {/* Adress- och kontaktinformation */}
                <>
                  <QBlock title={text.order.address} help={text.order.help_address} />
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
                        className="border w-full border-primary bg-transparent p-2 rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none mb-4"
                      />
                    </div>
                  </div>

                  <QBlock title={text.order.contact} help={text.order.help_contact} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      onChange={(e) => setPhone(e.target.value)}
                      id="phone"
                      label={text.order.phonenumber}
                      type="text"
                      inputMode="tel"
                      pattern="[\+]*[0-9\- ]*"
                      placeholder={text.order.phonenumber_example}
                      parentClassName="col-span-2 -mt-4"
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
                        {lang.order}{" "}
                        <a
                          href="https://www.saveabl.com/villkor"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "underline" }}
                        >
                          {text.order.terms}
                        </a>
                      </span>
                    </label>
                  </div>
                </>
              </OrderWizard>

              {wizardStep === 5 && (
                <p
                  className="
                    mx-auto mt-6 mb-8 max-w-[40rem]
                    text-center font-semibold
                    text-[#6E2936]
                    whitespace-nowrap
                    text-[13px] leading-tight
                    sm:text-[15px] sm:leading-normal
                  "
                >
                  <span className="whitespace-nowrap align-middle">
                    {text.order.reassurance.noBind}
                  </span>

                  <span
                    aria-hidden="true"
                    className="
                      mx-2 text-[11px] align-middle text-[#6E2936]
                      sm:mx-3 sm:text-sm
                    "
                  >●</span>

                  <span className="whitespace-nowrap align-middle">
                    {text.order.reassurance.fast}
                  </span>

                  <span
                    aria-hidden="true"
                    className="
                      mx-2 text-[11px] align-middle text-[#6E2936]
                      sm:mx-3 sm:text-sm
                    "
                  >●</span>

                  <a
                    href="https://www.trustpilot.com/review/saveabl.se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap underline-offset-4 hover:underline align-middle"
                  >
                    {text.order.reassurance.trust}
                  </a>
                </p>
              )}
            </>
          )}

          {/* Global overlay som “släcker” även stepbaren vid Stripe-redirect */}
          {stripeCheckoutIsLoading && (
            <div
              className="fixed inset-0 z-[9999] bg-primary bg-opacity-70 flex justify-center items-center"
              role="alert"
              aria-live="assertive"
            >
              <Title>Laddar...</Title>
            </div>
          )}
        </div>
      </Section>
    </>
  );
};

export default Order;

// Paus: vi levererar inte till DK just nu
const shippingDk: string[] = [];

