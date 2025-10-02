"use client";
import React from "react";
import { 
  stockholmPostalCodes1, stockholmPostalCodes2, stockholmPostalCodes3,
  skanePostalCodes1, skanePostalCodes2,
} from "@/lib/zipCodes";
import { useLang } from "@/hooks/useLang";

type SmartType = "veg" | "gard" | null;

interface SelectedType { id?: string; label: string; }
interface SelectedVariant { label: string; productId?: string; }
interface SelectedDay { label: string; }

interface OrderSummaryProps {
  selectedType: SelectedType;
  selectedSmartType: SmartType;
  selectedVariant: SelectedVariant | string;
  selectedDay: SelectedDay;
  postalCode: string | null;
  isDk: boolean;
  productTypes: any;
  lang: string;
}

/* --- helpers --- */
const isFamilyType = (t: SelectedType) =>
  !!t && (t.id === "Familybox" || /(^|\s)3\s*[–-]?\s*4(\s|$)|3–4|3-4/i.test(t.label));

const isCoupleType = (t: SelectedType) =>
  !!t && (t.id === "Couplebox" || /(^|\s)2\s*[–-]?\s*3(\s|$)|2–3|2-3/i.test(t.label));

const mapVariant = (label: string, lang: string) => {
  const m: Record<string, Record<string, string>> = {
    sv: { "Varje vecka": "Varje vecka", "Varannan vecka": "Varannan vecka", "Engångsköp": "Engångsköp" },
    en: { "Every week": "Every week", "Every other week": "Every other week", "One time order": "One time order" },
    da: { "Hver uge": "Hver uge", "Hver anden uge": "Hver anden uge", "Engangskøb": "Engangskøb" },
  };
  return m[lang]?.[label] ?? label;
};

const normalizeVariantLabel = (label: string) => {
  const l = label.toLowerCase();
  if (/(engångsköp|one\s*time|engangskøb)/i.test(l)) return "one";
  if (/(varje vecka|every week|hver uge)/i.test(l)) return "weekly";
  if (/(varannan vecka|every other week|hver anden uge)/i.test(l)) return "biweekly";
  return "unknown";
};

const getSmartTitle = (t: SmartType, text: any) => {
  if (t === "veg") return text?.order?.smartTitle?.veg ?? "Saveabl Grön";
  if (t === "gard") return text?.order?.smartTitle?.gard ?? "Saveabl Gård";
  return text?.order?.smartTitle?.base ?? "Saveabl";
};

/* =========================================================
   HÅRDKODADE TOTALPRISER (per kasse, exkl. frakt)
   - SE Grön = dina tidigare nivåer
   - SE Gård = lite högre (exempel) – ändra fritt till era faktiska
   - DK = samma för Gård som Grön (ändra om ni vill)
   ========================================================= */

type Bucket = { family: { sub: number; one: number }; couple: { sub: number; one: number } };

const PRICES = {
  seStockholm: {
    veg: { family: { sub: 708, one: 828 }, couple: { sub: 621, one: 711 } },
    gard: { family: { sub: 828, one: 948 }, couple: { sub: 711, one: 801 } },
  },
  seOther: {
    veg: { family: { sub: 708, one: 828 }, couple: { sub: 621, one: 711 } },
    gard: { family: { sub: 828, one: 948 }, couple: { sub: 711, one: 801 } },
  },
  dk: {
    veg: { family: { sub: 539, one: 599 }, couple: { sub: 449, one: 519 } },
    gard: { family: { sub: 660, one: 720 }, couple: { sub: 540, one: 612 } }, // justera om Gård skiljer sig i DK
  },
} as const;

const pickPrice = ({
  lineup,
  region,
  typeKey,
  isSub,
}: {
  lineup: "veg" | "gard";
  region: "seStockholm" | "seOther" | "dk";
  typeKey: "family" | "couple";
  isSub: boolean;
}) => {
  const bucket: Bucket = (PRICES as any)[region][lineup];
  return isSub ? bucket[typeKey].sub : bucket[typeKey].one;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedType,
  selectedSmartType,
  selectedVariant,
  selectedDay,
  postalCode,
  isDk,
}) => {
  const { lang, text } = useLang();

  const typeKey: "family" | "couple" | null =
    isFamilyType(selectedType) ? "family" : isCoupleType(selectedType) ? "couple" : null;

  // prenumeration vs engångsköp baserat på variantens label (robust för alla språk)
  const variantLabel =
    typeof selectedVariant === "string" ? selectedVariant : selectedVariant?.label ?? "";
  const norm = normalizeVariantLabel(variantLabel);
  const isSub = norm === "weekly" || norm === "biweekly";

  // region
  const inSTH =
    !!postalCode &&
    (stockholmPostalCodes1.includes(postalCode) ||
      stockholmPostalCodes2.includes(postalCode) ||
      stockholmPostalCodes3.includes(postalCode));

  const inSkane =
    !!postalCode &&
    (skanePostalCodes1.includes(postalCode) || skanePostalCodes2.includes(postalCode));
  // (Skåne använder seOther-bucket tills ni vill särskilja)

  const region: "seStockholm" | "seOther" | "dk" = isDk ? "dk" : inSTH ? "seStockholm" : "seOther";

  // lineup (Grön/Gård)
  const lineup: "veg" | "gard" = selectedSmartType === "gard" ? "gard" : "veg";

  // totalpris (exkl. frakt)
  const totalPrice =
    typeKey ? pickPrice({ lineup, region, typeKey, isSub }) : 0;

  // frakt
  const shippingCost = isDk ? 49 : 79;

  const frequency = mapVariant(variantLabel, lang);

  return (
    <div className="mx-auto max-w-full sm:max-w-[500px] pt-8 sm:pt-12">
      <div className="order-summary relative border-2 border-[#6E2936] p-4 rounded-lg mx-auto">
        {/* Pillret följer boxen */}
        <div className="absolute -top-3 left-7 sm:left-3 px-2 py-0.5 rounded-md text-sm font-semibold text-[#6E2936] bg-[#FCF7E8]">
          {text?.order?.your_choices ?? "Dina val"}
        </div>

        {/* Rubrik */}
        <h3 className="text-lg font-bold mb-2 text-[#6E2936]">
          {getSmartTitle(selectedSmartType, text)}
        </h3>

        <p className="text-[#6E2936]">
          <strong>{text?.order?.personsLabel ?? "Antal personer"}:</strong> {selectedType?.label}
        </p>

        <p className="text-[#6E2936]">
          <strong>{text?.order?.frequency ?? "Frekvens"}:</strong> {frequency}
        </p>

        {selectedDay?.label && (
          <p className="text-[#6E2936]">
            <strong>{text?.order?.deliveryDaysummary ?? "Leveransdag"}:</strong> {selectedDay?.label}
          </p>
        )}

        <p className="text-[#6E2936]">
          <strong>{text?.order?.totalPrice ?? "Totalt"}:</strong> {totalPrice} kr + {shippingCost} kr{" "}
          {text?.order?.shipping ?? "frakt"}
        </p>

        <p className="text-[#6E2936] text-md mt-2">{text?.order?.discountNote}</p>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .order-summary {
            max-width: 92%;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderSummary;
