export const productIdEveryWeek = "934dc035-0cea-449a-8977-7b6778146c99";
export const productIdEveryOtherWeek = "4914f47a-e297-404b-b336-b505b9deedb9";
export const productIdStandard = "bfce226b-994c-42b3-945e-ae1fde089818";
export const productIdStandard8Portions =
 "570897f5-82f5-482e-a2c6-fd94f001486a";

 export const productIdEveryWeekSambo = "prod_PuDcXtmqgiYTAz";
 export const productIdEveryOtherWeekSambo = "prod_PuDtIpxzTIo0Zu";
 export const productIdStandardSambo =
 "prod_PuEPfAjQdxFwRI";

export const priceIdEveryWeek = "price_1Nxu8QEhPZIzKmuikn7uAHzK";
export const priceIdEveryOtherWeek = "price_1NxtncEhPZIzKmuiNZl0xIxC";
export const priceIdStandard = "price_1NvlKkEhPZIzKmuiEozTJBYf";
export const priceIdStandard8Portions = "price_1NvlKfEhPZIzKmuiDximMRN3";

export const priceIdEveryWeekSambo = "price_1PpRu2EhPZIzKmuinWGZBdiX";
export const priceIdEveryOtherWeekSambo = "price_1PpRweEhPZIzKmuinrNVWFZ6";
export const priceIdStandardSambo = "price_1PpRz2EhPZIzKmuia3MD9OxT";


export const priceIdStockholmEveryWeek = "price_1OY5CQEhPZIzKmuiYkWX6DrL";
export const priceIdStockholmEveryOtherWeek =
 "price_1OY5F0EhPZIzKmuinFbez8qr";
export const priceIdStockholmStandard = "price_1OY5GmEhPZIzKmuip8JKjcVY";
export const priceIdStockholmStandard8Portions = "price_1OY5JkEhPZIzKmuiY9xTWk0K";
export const priceIdStockholmEveryWeekSambo = "price_1P4PBIEhPZIzKmuiUDGuWIaL";
export const priceIdStockholmEveryOtherWeekSambo =
 "price_1P4PRqEhPZIzKmuibBlRI0HG";
 export const priceIdStockholmStandardSambo = "price_1PpS0MEhPZIzKmuia0jpXicc";


export const priceIdSkaneEveryWeek = "price_1PDOpXEhPZIzKmuiIXimOxOH";
export const priceIdSkaneEveryOtherWeek =
 "price_1PDOr7EhPZIzKmui4MUY0nvi";
export const priceIdSkaneStandard = "price_1PDOthEhPZIzKmuiqiW23r7x";
export const priceIdSkaneStandard8Portions = "price_1PDOv0EhPZIzKmuiDcrV96Sz";
export const priceIdSkaneEveryWeekSambo = "price_1P4PcfEhPZIzKmuigZevK5c2";
export const priceIdSkaneEveryOtherWeekSambo =
 "price_1PpRweEhPZIzKmuinrNVWFZ6";
 export const priceIdSkaneStandardSambo = "price_1PpRz2EhPZIzKmuia3MD9OxT";



const priceIdDeliveryEveryWeek = "price_1OY5DpEhPZIzKmuidVt8MLqm";
const priceIdDeliveryEveryOtherWeek = "price_1OY5FsEhPZIzKmuiu5PVEK6o";
const priceIdDeliveryStandard = "price_1Po3RKEhPZIzKmuiaAytTZTa";


const priceIdDeliveryStockholmEveryWeek = "price_1OY5DpEhPZIzKmuidVt8MLqm";
const priceIdDeliveryStockholmEveryOtherWeek =
 "price_1OY5FsEhPZIzKmuiu5PVEK6o";
const priceIdDeliveryStockholmStandard = "price_1Po3RKEhPZIzKmuiaAytTZTa";


const priceIdDeliverySkaneEveryWeek = "price_1OY5DpEhPZIzKmuidVt8MLqm";
const priceIdDeliverySkaneEveryOtherWeek =
 "price_1OY5FsEhPZIzKmuiu5PVEK6o";
const priceIdDeliverySkaneStandard = "price_1Po3RKEhPZIzKmuiaAytTZTa";

const priceIdDeliveryEveryWeekSambo = "price_1OY5DpEhPZIzKmuidVt8MLqm";
const priceIdDeliveryEveryOtherWeekSambo = "price_1OY5FsEhPZIzKmuiu5PVEK6o";
const priceIdDeliveryStandardSambo = "price_1Po3RKEhPZIzKmuiaAytTZTa";


const priceIdDeliveryStockholmEveryWeekSambo = "price_1OY5DpEhPZIzKmuidVt8MLqm";
const priceIdDeliveryStockholmEveryOtherWeekSambo =
 "price_1OY5FsEhPZIzKmuiu5PVEK6o";
const priceIdDeliveryStockholmStandardSambo = "price_1Po3RKEhPZIzKmuiaAytTZTa";


const priceIdDeliverySkaneEveryWeekSambo = "price_1OY5DpEhPZIzKmuidVt8MLqm";
const priceIdDeliverySkaneEveryOtherWeekSambo =
 "price_1OY5FsEhPZIzKmuiu5PVEK6o";
const priceIdDeliverySkaneStandardSambo = "price_1Po3RKEhPZIzKmuiaAytTZTa";



export const getProductTypesFromLngCode = (lngCode: string): ProductType[] => {
 console.log("lngCode", lngCode);
 switch (lngCode) {
   case "se":
     return productTypesSe;
   case "en":
     console.log("en");
     return productTypesEn;
   case "dk":
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
       disabled: false,
       price: "599kr/vecka",
       portionPrice: "50kr/portion",
       id: "subscription", 
       priceId: priceIdEveryWeek,
       stockholmPriceId: priceIdStockholmEveryWeek,
       skanePriceId: priceIdSkaneEveryWeek,
     },
     {
       label: "Varannan vecka",
       productId: productIdEveryOtherWeek,
       disabled: false,
       price: "599kr/varannan vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryOtherWeek,
       stockholmPriceId: priceIdStockholmEveryOtherWeek,
       skanePriceId: priceIdSkaneEveryOtherWeek,
     },
     {
      label: "Engångsköp",
      productId: productIdStandard,
      disabled: false,
      price: "659kr",
      portionPrice: "55kr/portion",
      priceId: priceIdStandard,
      stockholmPriceId: priceIdStockholmStandard,
      skanePriceId: priceIdSkaneStandard,
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
      disabled: false,
      price: "599kr/vecka",
      portionPrice: "50kr/portion",
      id: "subscription",
      priceId: priceIdEveryWeekSambo,
      stockholmPriceId: priceIdStockholmEveryWeekSambo,
      skanePriceId: priceIdSkaneEveryWeekSambo,
    },
    {
      label: "Varannan vecka",
      productId: productIdEveryOtherWeekSambo,
      disabled: false,
      price: "599kr/varannan vecka",
      portionPrice: "50kr/portion",
      id: "subscription",
      priceId: priceIdEveryOtherWeekSambo,
      stockholmPriceId: priceIdStockholmEveryOtherWeekSambo,
      skanePriceId: priceIdSkaneEveryOtherWeekSambo,
    },
    {
     label: "Engångsköp",
     productId: productIdStandardSambo,
     disabled: false,
     price: "659kr",
     portionPrice: "55kr/portion",
     priceId: priceIdStandardSambo,
     stockholmPriceId: priceIdStockholmStandardSambo,
     skanePriceId: priceIdSkaneStandardSambo,
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
        disabled: false,
        price: "599kr/vecka",
        portionPrice: "50kr/portion",
        id: "subscription", 
        priceId: priceIdEveryWeek,
        stockholmPriceId: priceIdStockholmEveryWeek,
        skanePriceId: priceIdSkaneEveryWeek,
      },
      {
        label: "Varannan vecka",
        productId: productIdEveryOtherWeek,
        disabled: false,
        price: "599kr/varannan vecka",
        portionPrice: "50kr/portion",
        id: "subscription",
        priceId: priceIdEveryOtherWeek,
        stockholmPriceId: priceIdStockholmEveryOtherWeek,
        skanePriceId: priceIdSkaneEveryOtherWeek,
      },
      {
       label: "Engångsköp",
       productId: productIdStandard,
       disabled: false,
       price: "659kr",
       portionPrice: "55kr/portion",
       priceId: priceIdStandard,
       stockholmPriceId: priceIdStockholmStandard,
       skanePriceId: priceIdSkaneStandard,
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
       disabled: false,
       price: "599kr/vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryWeekSambo,
       stockholmPriceId: priceIdStockholmEveryWeekSambo,
       skanePriceId: priceIdSkaneEveryWeekSambo,
     },
     {
       label: "Varannan vecka",
       productId: productIdEveryOtherWeekSambo,
       disabled: false,
       price: "599kr/varannan vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryOtherWeek,
       stockholmPriceId: priceIdStockholmEveryOtherWeekSambo,
       skanePriceId: priceIdSkaneEveryOtherWeekSambo,
     },
     {
      label: "Engångsköp",
      productId: productIdStandardSambo,
      disabled: false,
      price: "659kr",
      portionPrice: "55kr/portion",
      priceId: priceIdStandardSambo,
      stockholmPriceId: priceIdStockholmStandardSambo,
      skanePriceId: priceIdSkaneStandardSambo,
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
        label: "Varje vecka",
        productId: productIdEveryWeek,
        disabled: false,
        price: "599kr/vecka",
        portionPrice: "50kr/portion",
        id: "subscription", 
        priceId: priceIdEveryWeek,
        stockholmPriceId: priceIdStockholmEveryWeek,
        skanePriceId: priceIdSkaneEveryWeek,
      },
      {
        label: "Varannan vecka",
        productId: productIdEveryOtherWeek,
        disabled: false,
        price: "599kr/varannan vecka",
        portionPrice: "50kr/portion",
        id: "subscription",
        priceId: priceIdEveryOtherWeek,
        stockholmPriceId: priceIdStockholmEveryOtherWeek,
        skanePriceId: priceIdSkaneEveryOtherWeek,
      },
      {
       label: "Engångsköp",
       productId: productIdStandard,
       disabled: false,
       price: "659kr",
       portionPrice: "55kr/portion",
       priceId: priceIdStandard,
       stockholmPriceId: priceIdStockholmStandard,
       skanePriceId: priceIdSkaneStandard,
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
       label: "Varje vecka",
       productId: productIdEveryWeekSambo,
       disabled: false,
       price: "599kr/vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryWeekSambo,
       stockholmPriceId: priceIdStockholmEveryWeekSambo,
       skanePriceId: priceIdSkaneEveryWeekSambo,
     },
     {
       label: "Varannan vecka",
       productId: productIdEveryOtherWeekSambo,
       disabled: false,
       price: "599kr/varannan vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryOtherWeekSambo,
       stockholmPriceId: priceIdStockholmEveryOtherWeekSambo,
       skanePriceId: priceIdSkaneEveryOtherWeekSambo,
     },
     {
      label: "Engångsköp",
      productId: productIdStandardSambo,
      disabled: false,
      price: "659kr",
      portionPrice: "55kr/portion",
      priceId: priceIdStandardSambo,
      stockholmPriceId: priceIdStockholmStandardSambo,
      skanePriceId: priceIdSkaneStandardSambo,
    },
   ],
 },
 ];
export const productTypesDk = [
  {
    id: "Familybox",
    label: "Familjekasse",
    recipes: "3 recipes",
    persons: "3-4 pers",
    variants: [
      {
        label: "Varje vecka",
        productId: productIdEveryWeek,
        disabled: false,
        price: "599kr/vecka",
        portionPrice: "50kr/portion",
        id: "subscription", 
        priceId: priceIdEveryWeek,
        stockholmPriceId: priceIdStockholmEveryWeek,
        skanePriceId: priceIdSkaneEveryWeek,
      },
      {
        label: "Varannan vecka",
        productId: productIdEveryOtherWeek,
        disabled: false,
        price: "599kr/varannan vecka",
        portionPrice: "50kr/portion",
        id: "subscription",
        priceId: priceIdEveryOtherWeek,
        stockholmPriceId: priceIdStockholmEveryOtherWeek,
        skanePriceId: priceIdSkaneEveryOtherWeek,
      },
      {
       label: "Engångsköp",
       productId: productIdStandard,
       disabled: false,
       price: "659kr",
       portionPrice: "55kr/portion",
       priceId: priceIdStandard,
       stockholmPriceId: priceIdStockholmStandard,
       skanePriceId: priceIdSkaneStandard,
     },
    ],
  },
  {
   id: "Couplebox",
   label: "Sambokasse",
   recipes: "3 recipes",
   persons: "2-3 pers",
   variants: [
     {
       label: "Varje vecka",
       productId: productIdEveryWeekSambo,
       disabled: false,
       price: "599kr/vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryWeekSambo,
       stockholmPriceId: priceIdStockholmEveryWeekSambo,
       skanePriceId: priceIdSkaneEveryWeekSambo,
     },
     {
       label: "Varannan vecka",
       productId: productIdEveryOtherWeekSambo,
       disabled: false,
       price: "599kr/varannan vecka",
       portionPrice: "50kr/portion",
       id: "subscription",
       priceId: priceIdEveryOtherWeekSambo,
       stockholmPriceId: priceIdStockholmEveryOtherWeekSambo,
       skanePriceId: priceIdSkaneEveryOtherWeekSambo,
     },
     {
      label: "Engångsköp",
      productId: productIdStandardSambo,
      disabled: false,
      price: "659kr",
      portionPrice: "55kr/portion",
      priceId: priceIdStandardSambo,
      stockholmPriceId: priceIdStockholmStandardSambo,
      skanePriceId: priceIdSkaneStandardSambo,
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
        variant.skanePriceId === priceId
      ) {
        return variant.id === "subscription"; // Kolla om varianten är en prenumeration
      }
    }
  }
  return false;
};


export const getShippingCostForProductId = (id: string | null) => {
 switch (id) {
   case priceIdEveryWeek:
     return priceIdDeliveryEveryWeek;
   case priceIdEveryOtherWeek:
     return priceIdDeliveryEveryOtherWeek;
   case priceIdStandard:
     return priceIdDeliveryStandard;
   case priceIdStandard8Portions:
     return priceIdDeliveryStandard;
   case priceIdStockholmEveryWeek:
     return priceIdDeliveryStockholmEveryWeek;
   case priceIdStockholmEveryOtherWeek:
     return priceIdDeliveryStockholmEveryOtherWeek;
   case priceIdStockholmStandard:
     return priceIdDeliveryStockholmStandard;
   case priceIdStockholmStandard8Portions:
     return priceIdDeliveryStockholmStandard;
   case priceIdSkaneEveryWeek:
       return priceIdDeliverySkaneEveryWeek;
   case priceIdSkaneEveryOtherWeek:
       return priceIdDeliverySkaneEveryOtherWeek;
   case priceIdSkaneStandard:
       return priceIdDeliverySkaneStandard;
   case priceIdSkaneStandard8Portions:
       return priceIdDeliverySkaneStandard;
 
   case priceIdEveryWeekSambo:
        return priceIdDeliveryEveryWeekSambo;
    case priceIdEveryOtherWeekSambo:
        return priceIdDeliveryEveryOtherWeekSambo;
    case priceIdStandardSambo:
        return priceIdDeliveryStandardSambo;

    case priceIdStockholmEveryWeekSambo:
          return priceIdDeliveryStockholmEveryWeekSambo;
    case priceIdStockholmEveryOtherWeekSambo:
          return priceIdDeliveryStockholmEveryOtherWeekSambo;
    case priceIdStockholmStandardSambo:
          return priceIdDeliveryStockholmStandardSambo;

    case priceIdSkaneEveryWeekSambo:
          return priceIdDeliverySkaneEveryWeekSambo;
    case priceIdSkaneEveryOtherWeekSambo:
          return priceIdDeliverySkaneEveryOtherWeekSambo;
    case priceIdSkaneStandardSambo:
          return priceIdDeliverySkaneStandardSambo;
  

   default:
     throw new Error("No shipping cost found for product id: " + id);
 }
};


export const getProductCostForPriceId = (id: string | null, lang: string) => {
 const eng = lang !== "sv"
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
       return eng ? "50kr/portionr" : "50kr/portion";
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

   default:
     throw new Error("No product id found for price id: " + id);
 }
}
