export const productIdEveryWeek = "934dc035-0cea-449a-8977-7b6778146c99";
export const productIdEveryOtherWeek = "4914f47a-e297-404b-b336-b505b9deedb9";
export const productIdStandard = "bfce226b-994c-42b3-945e-ae1fde089818";
export const productIdStandard8Portions =
 "570897f5-82f5-482e-a2c6-fd94f001486a";

 export const productIdEveryWeekSambo = "prod_PuDcXtmqgiYTAz";
 export const productIdEveryOtherWeekSambo = "prod_PuDtIpxzTIo0Zu";
 export const productIdStandardSambo =
 "prod_PuEPfAjQdxFwRI";

 export const productIdEveryWeekDk = "prod_OjDodUaLk1sKL7";
 export const productIdEveryOtherWeekDk = "prod_OjDo2XfLRppIPa"; 
 export const productIdStandardDk = "prod_OjDoIv8e5Zzek2"; 
 
 export const productIdEveryWeekSamboDk = "prod_PdHycyUnOkL6TL"; 
 export const productIdEveryOtherWeekSamboDk = "prod_QhdGye2ZZDVipp"; 
 export const productIdStandardSamboDk = "prod_OjDo5pqjEixNw4"; 
 

export const priceIdEveryWeek = "price_1RDmlwEhPZIzKmuicMsj4306";
export const priceIdEveryOtherWeek = "price_1RDmnyEhPZIzKmuifW5Ni3Uu";
export const priceIdStandard = "price_1RDmjdEhPZIzKmuip7XRuquc";
export const priceIdStandard8Portions = "price_1NvlKfEhPZIzKmuiDximMRN3";

export const priceIdEveryWeekSambo = "price_1RDmYLEhPZIzKmuiaL3NS3jq";
export const priceIdEveryOtherWeekSambo = "price_1RDmVMEhPZIzKmuijgpFLRYX";
export const priceIdStandardSambo = "price_1RDmTBEhPZIzKmuitSymxMBd";


export const priceIdStockholmEveryWeek = "price_1RDmmsEhPZIzKmuif7eMFzHa";
export const priceIdStockholmEveryOtherWeek =
 "price_1RDmnHEhPZIzKmuifLYRAAQW";
export const priceIdStockholmStandard = "price_1RDmkOEhPZIzKmuiz06oUhwM";
export const priceIdStockholmStandard8Portions = "price_1OY5JkEhPZIzKmuiY9xTWk0K";
export const priceIdStockholmEveryWeekSambo = "price_1RDmY0EhPZIzKmui66vzvn96";
export const priceIdStockholmEveryOtherWeekSambo =
 "price_1RDmWREhPZIzKmuinRpHJ0Zj";
 export const priceIdStockholmStandardSambo = "price_1RDmU0EhPZIzKmuiYTromffP";


export const priceIdSkaneEveryWeek = "price_1RDmlwEhPZIzKmuicMsj4306";
export const priceIdSkaneEveryOtherWeek =
 "price_1RDmnyEhPZIzKmuifW5Ni3Uu";
export const priceIdSkaneStandard = "price_1RDmjdEhPZIzKmuip7XRuquc";
export const priceIdSkaneStandard8Portions = "price_1PDOv0EhPZIzKmuiDcrV96Sz";
export const priceIdSkaneEveryWeekSambo = "price_1RDmYLEhPZIzKmuiaL3NS3jq";
export const priceIdSkaneEveryOtherWeekSambo =
 "price_1RDmVMEhPZIzKmuijgpFLRYX";
 export const priceIdSkaneStandardSambo = "price_1RDmTBEhPZIzKmuitSymxMBd";


 export const priceIdEveryWeekDk = "price_1RDn0cEhPZIzKmui06gMlEwL"; 
 export const priceIdEveryOtherWeekDk = "price_1RDn1NEhPZIzKmui507yAf4y"; 
 export const priceIdStandardDk = "price_1RDmzTEhPZIzKmuiakp6c9gb"; 
 
 export const priceIdEveryWeekSamboDk = "price_1RDmwzEhPZIzKmui9TIMOaJA"; 
 export const priceIdEveryOtherWeekSamboDk = "price_1RDmsWEhPZIzKmuiFXeGCXhL"; 
 export const priceIdStandardSamboDk = "price_1RDmyTEhPZIzKmuiS7nppB1a"; 


  // Lista över danska produkter
  const danishProductPrices = [
      priceIdEveryWeekDk,
      priceIdEveryOtherWeekDk,
      priceIdStandardDk,
      priceIdEveryWeekSamboDk,
      priceIdEveryOtherWeekSamboDk,
      priceIdStandardSamboDk
  ];
  


export const getProductTypesFromLngCode = (lngCode: string): ProductType[] => {
 console.log("lngCode", lngCode);
 switch (lngCode) {
   case "se":
     return productTypesSe;
   case "en":
     console.log("en");
     return productTypesEn;
   case "da":
     return productTypesDk;
   default:
     return productTypes;
 }
}


export const productTypes = [
 {
   id: "Familybox",
   label: "Familjekassen",
   recipes: "3 recept", 
   persons: "3-4 pers",
   variants: [
     {
       label: "Varje vecka",
       productId: productIdEveryWeek,
       productIdDk: productIdEveryWeekDk,
       disabled: false,
       price: "599kr/vecka",
       portionPrice: "50kr/portion",
       id: "subscription", 
       priceId: priceIdEveryWeek,
       stockholmPriceId: priceIdStockholmEveryWeek,
       skanePriceId: priceIdSkaneEveryWeek,
       danishPriceId: priceIdEveryWeekDk,
     },
     {
       label: "Varannan vecka",
       productId: productIdEveryOtherWeek,
       productIdDk: productIdEveryOtherWeekDk, 
       disabled: false,
       price: "599kr/varannan vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryOtherWeek,
       stockholmPriceId: priceIdStockholmEveryOtherWeek,
       skanePriceId: priceIdSkaneEveryOtherWeek,
       danishPriceId: priceIdEveryOtherWeekDk,
     },
     {
      label: "Engångsköp",
      productId: productIdStandard,
      productIdDk: productIdStandardDk,
      disabled: false,
      price: "659kr",
      portionPrice: "55kr/portion",
      priceId: priceIdStandard,
      stockholmPriceId: priceIdStockholmStandard,
      skanePriceId: priceIdSkaneStandard,
      danishPriceId: priceIdStandardDk,
    },
   ],
 },
 {
  id: "Couplebox",
  label: "Sambokassen",
  recipes: "3 recept", 
  persons: "2-3 pers",
  variants: [
    {
      label: "Varje vecka",
      productId: productIdEveryWeekSambo,
      productIdDk: productIdEveryWeekSamboDk,
      disabled: false,
      price: "599kr/vecka",
      portionPrice: "50kr/portion",
      id: "subscription",
      priceId: priceIdEveryWeekSambo,
      stockholmPriceId: priceIdStockholmEveryWeekSambo,
      skanePriceId: priceIdSkaneEveryWeekSambo,
      danishPriceId: priceIdEveryWeekSamboDk,
    },
    {
      label: "Varannan vecka",
      productId: productIdEveryOtherWeekSambo,
      productIdDk: productIdEveryOtherWeekSamboDk,
      disabled: false,
      price: "599kr/varannan vecka",
      portionPrice: "50kr/portion",
      id: "subscription",
      priceId: priceIdEveryOtherWeekSambo,
      stockholmPriceId: priceIdStockholmEveryOtherWeekSambo,
      skanePriceId: priceIdSkaneEveryOtherWeekSambo,
      danishPriceId: priceIdEveryOtherWeekSamboDk,
    },
    {
     label: "Engångsköp",
     productId: productIdStandardSambo,
     productIdDk: productIdStandardSamboDk,
     disabled: false,
     price: "659kr",
     portionPrice: "55kr/portion",
     priceId: priceIdStandardSambo,
     stockholmPriceId: priceIdStockholmStandardSambo,
     skanePriceId: priceIdSkaneStandardSambo,
     danishPriceId: priceIdStandardSamboDk,

   },
  ],
},
];
export const productTypesSe = [
  {
    id: "Familybox",
    label: "Familjekasse",
    recipes: "3 recept", 
    persons: "3-4 pers",
    variants: [
      {
        label: "Varje vecka",
        productId: productIdEveryWeek,
        productIdDk: productIdEveryWeekDk,
        disabled: false,
        price: "599kr/vecka",
        portionPrice: "50kr/portion",
        id: "subscription", 
        priceId: priceIdEveryWeek,
        stockholmPriceId: priceIdStockholmEveryWeek,
        skanePriceId: priceIdSkaneEveryWeek,
        danishPriceId: priceIdEveryWeekDk,
      },
      {
        label: "Varannan vecka",
        productId: productIdEveryOtherWeek,
        productIdDk: productIdEveryOtherWeekDk,
        disabled: false,
        price: "599kr/varannan vecka",
        portionPrice: "50kr/portion",
        id: "subscription",
        priceId: priceIdEveryOtherWeek,
        stockholmPriceId: priceIdStockholmEveryOtherWeek,
        skanePriceId: priceIdSkaneEveryOtherWeek,
        danishPriceId: priceIdEveryOtherWeekDk,
      },
      {
       label: "Engångsköp",
       productId: productIdStandard,
       productIdDk: productIdStandardDk,
       disabled: false,
       price: "659kr",
       portionPrice: "55kr/portion",
       priceId: priceIdStandard,
       stockholmPriceId: priceIdStockholmStandard,
       skanePriceId: priceIdSkaneStandard,
       danishPriceId: priceIdStandardDk,
     },
    ],
  },
  {
   id: "Couplebox",
   label: "Sambokasse",
   recipes: "3 recept", 
   persons: "2-3 pers",
   variants: [
     {
       label: "Varje vecka",
       productId: productIdEveryWeekSambo,
       productIdDk: productIdEveryWeekSamboDk,
       disabled: false,
       price: "599kr/vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryWeekSambo,
       stockholmPriceId: priceIdStockholmEveryWeekSambo,
       skanePriceId: priceIdSkaneEveryWeekSambo,
       danishPriceId: priceIdEveryWeekSamboDk,
     },
     {
       label: "Varannan vecka",
       productId: productIdEveryOtherWeekSambo,
       productIdDk: productIdEveryOtherWeekSamboDk,
       disabled: false,
       price: "599kr/varannan vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryOtherWeek,
       stockholmPriceId: priceIdStockholmEveryOtherWeekSambo,
       skanePriceId: priceIdSkaneEveryOtherWeekSambo,
       danishPriceId: priceIdEveryOtherWeekDk, 
     },
     {
      label: "Engångsköp",
      productId: productIdStandardSambo,
      productIdDk: productIdStandardSamboDk,
      disabled: false,
      price: "659kr",
      portionPrice: "55kr/portion",
      priceId: priceIdStandardSambo,
      stockholmPriceId: priceIdStockholmStandardSambo,
      skanePriceId: priceIdSkaneStandardSambo,
      danishPriceId: priceIdStandardSamboDk,
    },
   ],
 },
 ];
 
export const productTypesEn = [
  {
    id: "Familybox",
    label: "Family kit",
    recipes: "3 recipes", 
    persons: "3-4 pers",
    variants: [
      {
        label: "Every week",
        productId: productIdEveryWeek,
        productIdDk: productIdEveryWeekDk,
        disabled: false,
        price: "599kr/vecka",
        portionPrice: "50kr/portion",
        id: "subscription", 
        priceId: priceIdEveryWeek,
        stockholmPriceId: priceIdStockholmEveryWeek,
        skanePriceId: priceIdSkaneEveryWeek,
        danishPriceId: priceIdEveryWeekDk,
      },
      {
        label: "Every other week",
        productId: productIdEveryOtherWeek,
        productIdDk: productIdEveryOtherWeekDk,
        disabled: false,
        price: "599kr/varannan vecka",
        portionPrice: "50kr/portion",
        id: "subscription",
        priceId: priceIdEveryOtherWeek,
        stockholmPriceId: priceIdStockholmEveryOtherWeek,
        skanePriceId: priceIdSkaneEveryOtherWeek,
        danishPriceId: priceIdEveryOtherWeekDk,
      },
      {
       label: "One time order",
       productId: productIdStandard,
       productIdDk: productIdStandardDk,
       disabled: false,
       price: "659kr",
       portionPrice: "55kr/portion",
       priceId: priceIdStandard,
       stockholmPriceId: priceIdStockholmStandard,
       skanePriceId: priceIdSkaneStandard,
       danishPriceId: priceIdStandardDk,
     },
    ],
  },
  {
   id: "Couplebox",
   label: "Couple kit",
   recipes: "3 recipes",
   persons: "2-3 pers",
   variants: [
     {
       label: "Every week",
       productId: productIdEveryWeekSambo,
       productIdDk: productIdEveryWeekSamboDk,
       disabled: false,
       price: "599kr/vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryWeekSambo,
       stockholmPriceId: priceIdStockholmEveryWeekSambo,
       skanePriceId: priceIdSkaneEveryWeekSambo,
       danishPriceId: priceIdEveryWeekSamboDk, 
     },
     {
       label: "Every other week",
       productId: productIdEveryOtherWeekSambo,
       productIdDk: productIdEveryOtherWeekSamboDk,
       disabled: false,
       price: "599kr/varannan vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryOtherWeekSambo,
       stockholmPriceId: priceIdStockholmEveryOtherWeekSambo,
       skanePriceId: priceIdSkaneEveryOtherWeekSambo,
       danishPriceId: priceIdEveryOtherWeekSamboDk,
     },
     {
      label: "One time order",
      productId: productIdStandardSambo,
      productIdDk: productIdStandardSamboDk,
      disabled: false,
      price: "659kr",
      portionPrice: "55kr/portion",
      priceId: priceIdStandardSambo,
      stockholmPriceId: priceIdStockholmStandardSambo,
      skanePriceId: priceIdSkaneStandardSambo,
      danishPriceId: priceIdStandardSamboDk,
    },
   ],
 },
 ];
export const productTypesDk = [
  {
    id: "Familybox",
    label: "Familiekassen",
    recipes: "3 opskrifter",
    persons: "3-4 pers",
    variants: [
      {
        label: "Hver uge",
        productId: productIdEveryWeekDk,
        disabled: false,
        price: "599kr/vecka",
        portionPrice: "50kr/portion",
        id: "subscription", 
        priceId: priceIdEveryWeek,
        stockholmPriceId: priceIdStockholmEveryWeek,
        skanePriceId: priceIdSkaneEveryWeek,
        danishPriceId: priceIdEveryWeekDk, 
      },
      {
        label: "Hver anden uge",
        productId: productIdEveryOtherWeekDk,
        disabled: false,
        price: "599kr/varannan vecka",
        portionPrice: "50kr/portion",
        id: "subscription",
        priceId: priceIdEveryOtherWeek,
        stockholmPriceId: priceIdStockholmEveryOtherWeek,
        skanePriceId: priceIdSkaneEveryOtherWeek,
        danishPriceId: priceIdEveryOtherWeekDk, 
      },
      {
       label: "Engangskøb",
       productId: productIdStandardDk,
       disabled: false,
       price: "659kr",
       portionPrice: "55kr/portion",
       priceId: priceIdStandard,
       stockholmPriceId: priceIdStockholmStandard,
       skanePriceId: priceIdSkaneStandard,
       danishPriceId: priceIdStandardDk,
     },
    ],
  },
  {
   id: "Couplebox",
   label: "Sambokassen",
   recipes: "3 opskrifter",
   persons: "2-3 pers",
   variants: [
     {
       label: "Hver uge",
       productId: productIdEveryWeekSamboDk,
       disabled: false,
       price: "599kr/vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryWeekSambo,
       stockholmPriceId: priceIdStockholmEveryWeekSambo,
       skanePriceId: priceIdSkaneEveryWeekSambo,
       danishPriceId: priceIdEveryWeekSamboDk,
     },
     {
       label: "Hver anden uge",
       productId: productIdEveryOtherWeekSamboDk,
       disabled: false,
       price: "599kr/varannan vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryOtherWeekSambo,
       stockholmPriceId: priceIdStockholmEveryOtherWeekSambo,
       skanePriceId: priceIdSkaneEveryOtherWeekSambo,
       danishPriceId: priceIdEveryOtherWeekSamboDk, 
     },
     {
      label: "Engangskøb",
      productId: productIdStandardSamboDk,
      disabled: false,
      price: "659kr",
      portionPrice: "55kr/portion",
      priceId: priceIdStandardSambo,
      stockholmPriceId: priceIdStockholmStandardSambo,
      skanePriceId: priceIdSkaneStandardSambo,
      danishPriceId: priceIdStandardSamboDk, 
    },
   ],
 },
 ];

type ProductType = {
 id: string;
 label: string;
 recipes: string;
 persons: string;
 variants: Variant[];
};


type Variant = {
 label: string;
 productId: string;
 disabled: boolean;
 price: string;
 portionPrice: string;
 priceId: string;
};


export const isSubscription = (priceId: string | null): boolean => {
  for (const productType of productTypes) {
    for (const variant of productType.variants) {
      if (
        variant.priceId === priceId ||
        variant.stockholmPriceId === priceId ||
        variant.skanePriceId === priceId ||
        variant.danishPriceId === priceId
      ) {
        return variant.id === "subscription"; // Kolla om varianten är en prenumeration
      }
    }
  }
  return false;
};


export const getProductCostForPriceId = (id: string | null, lang: string) => {
 const eng = lang !== "sv"
 const dk = lang === "da";
 switch (id) {
   case priceIdEveryWeek:
     return eng ? "50kr/portion" : "50kr/portion";
   case priceIdEveryOtherWeek:
     return eng ? "50kr/portion" : "50kr/portion";
   case priceIdStandard:
     return eng ? "55kr/portion" : "55kr/portion";
   case priceIdStandard8Portions:
     return eng ? "50kr/portion" : "50kr/portion";
   case priceIdEveryWeekSambo:
      return eng ? "60kr/portion" : "60kr/portion";
   case priceIdEveryOtherWeekSambo:
        return eng ? "60kr/portion" : "60kr/portion";
   case priceIdStandardSambo:
        return eng ? "65kr/portion" : "65kr/portion";

   case priceIdStockholmEveryWeek:
     return eng ? "55kr/portion" : "55kr/portion";
   case priceIdStockholmEveryOtherWeek:
     return eng ? "55kr/portion" : "55kr/portion";
   case priceIdStockholmStandard:
     return eng ? "60kr/portion" : "60kr/portion";
   case priceIdStockholmStandard8Portions:
     return eng ? "50kr/portion" : "50kr/portion";
   case priceIdStockholmEveryWeekSambo:
      return eng ? "65kr/portion" : "65kr/portion";
   case priceIdStockholmEveryOtherWeekSambo:
      return eng ? "65kr/portion" : "65kr/portion";
   case priceIdStockholmStandardSambo:
      return eng ? "72kr/portion" : "72kr/portion";


     case priceIdSkaneEveryWeek:
       return eng ? "50kr/portion" : "50kr/portion";
     case priceIdSkaneEveryOtherWeek:
       return eng ? "50kr/portion" : "50kr/portion";
     case priceIdSkaneStandard:
       return eng ? "55kr/portion" : "55kr/portion";
     case priceIdSkaneStandard8Portions:
       return eng ? "50kr/portion" : "50kr/portion";
     case priceIdSkaneEveryWeekSambo:
        return eng ? "60kr/portion" : "60kr/portion";
     case priceIdSkaneEveryOtherWeekSambo:
        return eng ? "60kr/portionr" : "60kr/portion";
     case priceIdSkaneStandardSambo:
        return eng ? "65kr/portion" : "65kr/portion";

     case priceIdEveryWeekDk:
        return dk ? "Kuvertpris 45kr" : "45kr/portion";
     case priceIdEveryOtherWeekDk:
        return dk ? "Kuvertpris 45kr" : "45kr/portion";
     case priceIdStandardDk:
        return dk ? "Kuvertpris 50kr" : "50kr/portion";
     case priceIdEveryWeekSamboDk:
        return dk ? "Kuvertpris 50kr" : "50kr/portion";
     case priceIdEveryOtherWeekSamboDk:
        return dk ? "Kuvertpris 50kr" : "50kr/portion";
     case priceIdStandardSamboDk:
        return dk ? "Kuvertpris 58kr" : "58kr/portion";

   default:
     throw new Error("No product id found for price id: " + id);
 }
}
