/* =========================================================
   Saveabl — Produkt/Pris-konfiguration för checkout
   Två produktlinjer: Grön (veg) och Gård (gard).
   Steg 1 (selectedSmartType) avgör vilket priceId som väljs.
   ========================================================= */

   export type DualPrice = { veg: string; gard: string };

   export type Variant = {
     label: string;
     productId?: string;         // legacy (ej använd i själva Stripe-kallet)
     disabled: boolean;
     price: string;
     portionPrice: string;
     id?: "subscription";
     priceId: DualPrice;             // default SE
     stockholmPriceId: DualPrice;    // SE Stockholm (pekar nu på samma som SE)
     skanePriceId: DualPrice;        // SE Skåne (pekar nu på samma som SE)
     danishPriceId: DualPrice;       // DK
   };
   
   export type ProductType = {
     id: string;
     label: string;
     recipes: string;
     persons: string;
     variants: Variant[];
   };
   
   /* =========================================================
      NYA STRIPE-ID (från dig)
      ========================================================= */
   /* SE — GRÖN (Saveabl Grön) */
   export const SE_GRON_EVERY_WEEK_FAMILY   = "price_1SDjZWEhPZIzKmuirNOh8EGR"; // 3–4
   export const SE_GRON_EVERY_WEEK_COUPLE   = "price_1S8z9jEhPZIzKmuiD7oWkhbc"; // 2–3
   export const SE_GRON_EVERY_OTHER_FAMILY  = "price_1SDjdVEhPZIzKmuimTqjfzku"; // 3–4
   export const SE_GRON_EVERY_OTHER_COUPLE  = "price_1S8zD8EhPZIzKmuildqCBNHC"; // 2–3
   export const SE_GRON_ONE_TIME_FAMILY     = "price_1SDjf8EhPZIzKmui3ba2W83t"; // 3–4
   export const SE_GRON_ONE_TIME_COUPLE     = "price_1S8zG8EhPZIzKmuiQDdQLLq1"; // 2–3
   
   /* SE — GÅRD (Saveabl Gård) */
   export const SE_GARD_EVERY_WEEK_FAMILY   = "price_1SDjhVEhPZIzKmui9xYGfdmQ"; // 3–4
   export const SE_GARD_EVERY_WEEK_COUPLE   = "price_1S92BKEhPZIzKmuiVVzivpkn"; // 2–3
   export const SE_GARD_EVERY_OTHER_FAMILY  = "price_1SDjn3EhPZIzKmuiwGh8EQPN"; // 3–4
   export const SE_GARD_EVERY_OTHER_COUPLE  = "price_1S92EvEhPZIzKmuiVb47nEEf"; // 2–3
   export const SE_GARD_ONE_TIME_FAMILY     = "price_1SDjpzEhPZIzKmuiC4gDuKkI"; // 3–4
   export const SE_GARD_ONE_TIME_COUPLE     = "price_1S92GvEhPZIzKmui13XdBjv5"; // 2–3
   
   /* DK — GRØN */
   export const DK_GRON_EVERY_WEEK_FAMILY   = "price_1SDkgJEhPZIzKmuiAD6Mbjqa"; // 3–4
   export const DK_GRON_EVERY_WEEK_COUPLE   = "price_1SDMdKEhPZIzKmuiScDmFR4R"; // 2–3
   export const DK_GRON_EVERY_OTHER_FAMILY  = "price_1SDkkMEhPZIzKmuijgMxqiYZ"; // 3–4
   export const DK_GRON_EVERY_OTHER_COUPLE  = "price_1SDN4MEhPZIzKmui9ngVspE2"; // 2–3
   export const DK_GRON_ONE_TIME_FAMILY     = "price_1SDks9EhPZIzKmuiiz97pQwo"; // 3–4
   export const DK_GRON_ONE_TIME_COUPLE     = "price_1SDN6uEhPZIzKmuilAWXix5w"; // 2–3
   
   /* DK — GÅRD */
   export const DK_GARD_EVERY_WEEK_FAMILY   = "price_1SDkvUEhPZIzKmui7a5u4spP"; // 3–4
   export const DK_GARD_EVERY_WEEK_COUPLE   = "price_1SDNGhEhPZIzKmui5uiW9ter"; // 2–3
   export const DK_GARD_EVERY_OTHER_FAMILY  = "price_1SDkyjEhPZIzKmui0uhEGefW"; // 3–4
   export const DK_GARD_EVERY_OTHER_COUPLE  = "price_1SDNILEhPZIzKmuisGGc30du"; // 2–3
   export const DK_GARD_ONE_TIME_FAMILY     = "price_1SDl2eEhPZIzKmuigD4BBJmV"; // 3–4
   export const DK_GARD_ONE_TIME_COUPLE     = "price_1SDNpjEhPZIzKmuiEQ3mri8L"; // 2–3
   
   /* =========================================================
      Hjälpfunktion: välj rätt textsamling
      ========================================================= */
   export const getProductTypesFromLngCode = (lngCode: string): ProductType[] => {
     switch (lngCode) {
       case "se": return productTypesSe;
       case "en": return productTypesEn;
       case "da": return productTypesDk;
       default:   return productTypesSe;
     }
   };
   
   /* =========================================================
      Produktmatriser (SE)
      ========================================================= */
   
   export const productTypesSe: ProductType[] = [
     {
       id: "Familybox",
       label: "3-4 pers",
       recipes: "3 recept",
       persons: "3-4 pers",
       variants: [
         {
           label: "Varje vecka",
           disabled: false,
           price: "",
           portionPrice: "",
           id: "subscription",
           priceId:          { veg: SE_GRON_EVERY_WEEK_FAMILY,  gard: SE_GARD_EVERY_WEEK_FAMILY },
           stockholmPriceId: { veg: SE_GRON_EVERY_WEEK_FAMILY,  gard: SE_GARD_EVERY_WEEK_FAMILY },
           skanePriceId:     { veg: SE_GRON_EVERY_WEEK_FAMILY,  gard: SE_GARD_EVERY_WEEK_FAMILY },
           danishPriceId:    { veg: DK_GRON_EVERY_WEEK_FAMILY,  gard: DK_GARD_EVERY_WEEK_FAMILY },
         },
         {
           label: "Varannan vecka",
           disabled: false,
           price: "",
           portionPrice: "",
           id: "subscription",
           priceId:          { veg: SE_GRON_EVERY_OTHER_FAMILY, gard: SE_GARD_EVERY_OTHER_FAMILY },
           stockholmPriceId: { veg: SE_GRON_EVERY_OTHER_FAMILY, gard: SE_GARD_EVERY_OTHER_FAMILY },
           skanePriceId:     { veg: SE_GRON_EVERY_OTHER_FAMILY, gard: SE_GARD_EVERY_OTHER_FAMILY },
           danishPriceId:    { veg: DK_GRON_EVERY_OTHER_FAMILY, gard: DK_GARD_EVERY_OTHER_FAMILY },
         },
         {
           label: "Engångsköp",
           disabled: false,
           price: "",
           portionPrice: "",
           priceId:          { veg: SE_GRON_ONE_TIME_FAMILY,    gard: SE_GARD_ONE_TIME_FAMILY },
           stockholmPriceId: { veg: SE_GRON_ONE_TIME_FAMILY,    gard: SE_GARD_ONE_TIME_FAMILY },
           skanePriceId:     { veg: SE_GRON_ONE_TIME_FAMILY,    gard: SE_GARD_ONE_TIME_FAMILY },
           danishPriceId:    { veg: DK_GRON_ONE_TIME_FAMILY,    gard: DK_GARD_ONE_TIME_FAMILY },
         },
       ],
     },
     {
       id: "Couplebox",
       label: "2-3 pers",
       recipes: "3 recept",
       persons: "2-3 pers",
       variants: [
         {
           label: "Varje vecka",
           disabled: false,
           price: "",
           portionPrice: "",
           id: "subscription",
           priceId:          { veg: SE_GRON_EVERY_WEEK_COUPLE,  gard: SE_GARD_EVERY_WEEK_COUPLE },
           stockholmPriceId: { veg: SE_GRON_EVERY_WEEK_COUPLE,  gard: SE_GARD_EVERY_WEEK_COUPLE },
           skanePriceId:     { veg: SE_GRON_EVERY_WEEK_COUPLE,  gard: SE_GARD_EVERY_WEEK_COUPLE },
           danishPriceId:    { veg: DK_GRON_EVERY_WEEK_COUPLE,  gard: DK_GARD_EVERY_WEEK_COUPLE },
         },
         {
           label: "Varannan vecka",
           disabled: false,
           price: "",
           portionPrice: "",
           id: "subscription",
           priceId:          { veg: SE_GRON_EVERY_OTHER_COUPLE, gard: SE_GARD_EVERY_OTHER_COUPLE },
           stockholmPriceId: { veg: SE_GRON_EVERY_OTHER_COUPLE, gard: SE_GARD_EVERY_OTHER_COUPLE },
           skanePriceId:     { veg: SE_GRON_EVERY_OTHER_COUPLE, gard: SE_GARD_EVERY_OTHER_COUPLE },
           danishPriceId:    { veg: DK_GRON_EVERY_OTHER_COUPLE, gard: DK_GARD_EVERY_OTHER_COUPLE },
         },
         {
           label: "Engångsköp",
           disabled: false,
           price: "",
           portionPrice: "",
           priceId:          { veg: SE_GRON_ONE_TIME_COUPLE,    gard: SE_GARD_ONE_TIME_COUPLE },
           stockholmPriceId: { veg: SE_GRON_ONE_TIME_COUPLE,    gard: SE_GARD_ONE_TIME_COUPLE },
           skanePriceId:     { veg: SE_GRON_ONE_TIME_COUPLE,    gard: SE_GARD_ONE_TIME_COUPLE },
           danishPriceId:    { veg: DK_GRON_ONE_TIME_COUPLE,    gard: DK_GARD_ONE_TIME_COUPLE },
         },
       ],
     },
   ];
   
   /* =========================================================
      Språkade etiketter för variant-knapparna
      ========================================================= */
   const VARIANT_LABELS = {
     se: {
       weekly:   "Varje vecka",
       biweekly: "Varannan vecka",
       onetime:  "Engångsköp",
     },
     en: {
       weekly:   "Every week",
       biweekly: "Every other week",
       onetime:  "One-time purchase",
     },
     da: {
       weekly:   "Hver uge",
       biweekly: "Hver anden uge",
       onetime:  "Engangskøb",
     },
   } as const;
   
   const swedishLabelToKey = (label: string) => {
     if (label === VARIANT_LABELS.se.weekly)   return "weekly" as const;
     if (label === VARIANT_LABELS.se.biweekly) return "biweekly" as const;
     if (label === VARIANT_LABELS.se.onetime)  return "onetime" as const;
     return null;
   };
   
   const relabelVariants = (variants: Variant[], lang: "se" | "en" | "da"): Variant[] =>
     variants.map((v) => {
       const key = swedishLabelToKey(v.label);
       if (!key) return v;
       return { ...v, label: VARIANT_LABELS[lang][key] };
     });
   
   /* =========================================================
      Engelska & Danska produktmatriser
      ========================================================= */
   export const productTypesEn: ProductType[] = productTypesSe.map((pt) => ({
     ...pt,
     recipes: "3 recipes",
     variants: relabelVariants(pt.variants, "en"),
   }));
   
   export const productTypesDk: ProductType[] = productTypesSe.map((pt) => ({
     ...pt,
     recipes: "3 opskrifter",
     variants: relabelVariants(pt.variants, "da"),
   }));
   
   /* =========================================================
      Prenumeration? (allt utom Engångsköp)
      ========================================================= */
   export const isSubscription = (priceId: string | null): boolean => {
     if (!priceId) return false;
     const variants = productTypesSe.flatMap((pt) => pt.variants);
     for (const v of variants) {
       const ids = [
         v.priceId?.veg, v.priceId?.gard,
         v.stockholmPriceId?.veg, v.stockholmPriceId?.gard,
         v.skanePriceId?.veg, v.skanePriceId?.gard,
         v.danishPriceId?.veg, v.danishPriceId?.gard,
       ].filter(Boolean) as string[];
       if (ids.includes(priceId)) return v.id === "subscription";
     }
     return false;
   };
   
   /* =========================================================
      Pristext per priceId (LINEUP-SPECIFIKT: Grön vs Gård)
      ========================================================= */
   const PRICE_TEXT_SE = {
     [SE_GRON_EVERY_WEEK_FAMILY]:  "59kr/portion",
     [SE_GRON_EVERY_OTHER_FAMILY]: "59kr/portion",
     [SE_GRON_ONE_TIME_FAMILY]:    "69kr/portion",
   
     [SE_GRON_EVERY_WEEK_COUPLE]:  "69kr/portion",
     [SE_GRON_EVERY_OTHER_COUPLE]: "69kr/portion",
     [SE_GRON_ONE_TIME_COUPLE]:    "79kr/portion",
   
     [SE_GARD_EVERY_WEEK_FAMILY]:  "69kr/portion",
     [SE_GARD_EVERY_OTHER_FAMILY]: "69kr/portion",
     [SE_GARD_ONE_TIME_FAMILY]:    "79kr/portion",
   
     [SE_GARD_EVERY_WEEK_COUPLE]:  "79kr/portion",
     [SE_GARD_EVERY_OTHER_COUPLE]: "79kr/portion",
     [SE_GARD_ONE_TIME_COUPLE]:    "89kr/portion",
   } as const;
   
   const PRICE_TEXT_DK = {
     [DK_GRON_EVERY_WEEK_FAMILY]:  "Kuvertpris 45kr",
     [DK_GRON_EVERY_OTHER_FAMILY]: "Kuvertpris 45kr",
     [DK_GRON_ONE_TIME_FAMILY]:    "Kuvertpris 50kr",
   
     [DK_GRON_EVERY_WEEK_COUPLE]:  "Kuvertpris 50kr",
     [DK_GRON_EVERY_OTHER_COUPLE]: "Kuvertpris 50kr",
     [DK_GRON_ONE_TIME_COUPLE]:    "Kuvertpris 58kr",
   
     [DK_GARD_EVERY_WEEK_FAMILY]:  "Kuvertpris 55kr",
     [DK_GARD_EVERY_OTHER_FAMILY]: "Kuvertpris 55kr",
     [DK_GARD_ONE_TIME_FAMILY]:    "Kuvertpris 60kr",
   
     [DK_GARD_EVERY_WEEK_COUPLE]:  "Kuvertpris 60kr",
     [DK_GARD_EVERY_OTHER_COUPLE]: "Kuvertpris 60kr",
     [DK_GARD_ONE_TIME_COUPLE]:    "Kuvertpris 68kr",
   } as const;
   
   export const getProductCostForPriceId = (id: string | null, lang: string) => {
     if (!id) return "";
     const dk = lang === "da";
     if (dk && id in PRICE_TEXT_DK) return (PRICE_TEXT_DK as any)[id];
     if (id in PRICE_TEXT_SE) return (PRICE_TEXT_SE as any)[id];
     return dk ? "Kuvertpris" : "Pris per portion";
   };
   