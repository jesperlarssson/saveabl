export const productIdEveryWeek = "934dc035-0cea-449a-8977-7b6778146c99";
export const productIdEveryOtherWeek = "4914f47a-e297-404b-b336-b505b9deedb9";
export const productIdStandard = "bfce226b-994c-42b3-945e-ae1fde089818";
export const productIdStandard8Portions =
  "570897f5-82f5-482e-a2c6-fd94f001486a";

export const priceIdEveryWeek = "price_1Nxu8QEhPZIzKmuikn7uAHzK";
export const priceIdEveryOtherWeek = "price_1NxtncEhPZIzKmuiNZl0xIxC";
export const priceIdStandard = "price_1NvlKkEhPZIzKmuiEozTJBYf";
export const priceIdStandard8Portions = "price_1NvlKfEhPZIzKmuiDximMRN3";

export const priceIdStockholmEveryWeek = "price_1OY5CQEhPZIzKmuiYkWX6DrL";
export const priceIdStockholmEveryOtherWeek =
  "price_1OY5F0EhPZIzKmuinFbez8qr";
export const priceIdStockholmStandard = "price_1OY5GmEhPZIzKmuip8JKjcVY";
export const priceIdStockholmStandard8Portions = "price_1OY5JkEhPZIzKmuiY9xTWk0K";

export const priceIdSkaneEveryWeek = "price_1PDOpXEhPZIzKmuiIXimOxOH";
export const priceIdSkaneEveryOtherWeek =
  "price_1PDOr7EhPZIzKmui4MUY0nvi";
export const priceIdSkaneStandard = "price_1PDOthEhPZIzKmuiqiW23r7x";
export const priceIdSkaneStandard8Portions = "price_1PDOv0EhPZIzKmuiDcrV96Sz";


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
    id: "subscription",
    label: "Prenumeration",
    variants: [
      {
        label: "Varje vecka",
        productId: productIdEveryWeek,
        disabled: false,
        price: "599kr/vecka",
        portionPrice: "50kr/portion",
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
        priceId: priceIdEveryOtherWeek,
        stockholmPriceId: priceIdStockholmEveryOtherWeek,
        skanePriceId: priceIdSkaneEveryOtherWeek,
      },
    ],
  },
  {
    id: "standard",
    label: "Engångsköp",
    variants: [
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
      {
        label: "Prova-på kasse",
        productId: productIdStandard8Portions,
        disabled: false,
        price: "439kr",
        portionPrice: "55kr/portion",

        priceId: priceIdStandard8Portions,
        stockholmPriceId: priceIdStockholmStandard8Portions,
        skanePriceId: priceIdSkaneStandard8Portions, 
      },
    ],
  },
];
export const productTypesSe = [
  {
    id: "subscription",
    label: "Prenumeration",
    variants: [
      {
        label: "Varje vecka",
        productId: productIdEveryWeek,
        disabled: false,
        price: "599kr/vecka",
        portionPrice: "50kr/portion",
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
        priceId: priceIdEveryOtherWeek,
        stockholmPriceId: priceIdStockholmEveryOtherWeek,
        skanePriceId: priceIdSkaneEveryOtherWeek, 
      },
    ],
  },
  {
    id: "standard",
    label: "Engångsköp",
    variants: [
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
      {
        label: "Prova-på kasse",
        productId: productIdStandard8Portions,
        disabled: false,
        price: "439kr",
        portionPrice: "55kr/portion",

        priceId: priceIdStandard8Portions,
        stockholmPriceId: priceIdStockholmStandard8Portions,
        skanePriceId: priceIdSkaneStandard8Portions, 
      },
    ],
  },
];
export const productTypesEn = [
  {
    id: "subscription",
    label: "Subscription",
    variants: [
      {
        label: "Every week",
        productId: productIdEveryWeek,
        disabled: false,
        price: "599kr/week",
        portionPrice: "50kr/portion",
        priceId: priceIdEveryWeek,
        stockholmPriceId: priceIdStockholmEveryWeek,
        skanePriceId: priceIdSkaneEveryWeek, 
      },
      {
        label: "Every other week",
        productId: productIdEveryOtherWeek,
        disabled: false,
        price: "599kr/every other week",
        portionPrice: "50kr/portion",
        priceId: priceIdEveryOtherWeek,
        stockholmPriceId: priceIdStockholmEveryOtherWeek,
        skanePriceId: priceIdSkaneEveryOtherWeek, 
      },
    ],
  },
  {
    id: "standard",
    label: "One time order",
    variants: [
      {
        label: "One time order",
        productId: productIdStandard,
        disabled: false,
        price: "659kr",
        portionPrice: "55kr/portion",
        priceId: priceIdStandard,
        stockholmPriceId: priceIdStockholmStandard,
        skanePriceId: priceIdSkaneStandard, 
      },
      {
        label: "Saveabl taste teaser",
        productId: productIdStandard8Portions,
        disabled: false,
        price: "439kr",
        portionPrice: "55kr/portion",

        priceId: priceIdStandard8Portions,
        stockholmPriceId: priceIdStockholmStandard8Portions,
        skanePriceId: priceIdSkaneStandard8Portions, 
      },
    ],
  },
];
export const productTypesDk = [
  {
    id: "subscription",
    label: "Prenumeration",
    variants: [
      {
        label: "Varje vecka",
        productId: productIdEveryWeek,
        disabled: false,
        price: "599kr/vecka",
        portionPrice: "50kr/portion",
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
        priceId: priceIdEveryOtherWeek,
        stockholmPriceId: priceIdStockholmEveryOtherWeek,
        skanePriceId: priceIdSkaneEveryOtherWeek, 
      },
    ],
  },
  {
    id: "standard",
    label: "Engångsköp",
    variants: [
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
      {
        label: "Prova-på kasse",
        productId: productIdStandard8Portions,
        disabled: false,
        price: "439kr",
        portionPrice: "55kr/portion",

        priceId: priceIdStandard8Portions,
        stockholmPriceId: priceIdStockholmStandard8Portions,
        skanePriceId: priceIdSkaneStandard8Portions, 
      },
    ],
  },
];

type ProductType = {
  id: string;
  label: string;
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
      if (variant.priceId === priceId || variant.stockholmPriceId === priceId || variant.skanePriceId === priceId) {
        return productType.id === "subscription";
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

    default:
      throw new Error("No shipping cost found for product id: " + id);
  }
};

export const getProductCostForPriceId = (id: string | null, lang: string) => {
  const eng = lang !== "sv"
  switch (id) {
    case priceIdEveryWeek:
      return eng ? "3 recipes/week 599kr + delivery 79kr" : "3 recept/vecka 599kr + frakt 79kr";
    case priceIdEveryOtherWeek:
      return eng ? "3 recipes/every other week 599kr + delivery 79kr" : "3 recept/varannan v. 599kr + frakt 79kr";
    case priceIdStandard:
      return eng ? "3 recipes, 3-4 pers 659kr + delivery 79kr" : "3 recept, 3-4 pers 659kr + frakt 79kr";
    case priceIdStandard8Portions:
      return eng ? "2 recipes, 3-4 pers 439kr + delivery 79kr" : "2 recept, 3-4 pers 439kr + frakt 79kr";
    case priceIdStockholmEveryWeek:
      return eng ? "3 recipes/week 649kr + delivery 79kr" : "3 recept/vecka 649kr + frakt 79kr";
    case priceIdStockholmEveryOtherWeek:
      return eng ? "3 recipes/every other week 649kr + delivery 79kr" : "3 recept/varannan v. 649kr + frakt 79kr";
    case priceIdStockholmStandard:
      return eng ? "3 recipes, 3-4 pers 719kr + delivery 79kr" : "3 recept, 3-4 pers 719kr + frakt 79kr";
    case priceIdStockholmStandard8Portions:
      return eng ? "2 recipes, 3-4 pers 479kr + delivery 79kr" : "2 recept, 3-4 pers 479kr + frakt 79kr";

      case priceIdSkaneEveryWeek:
        return eng ? "3 recipes/week 599kr + delivery 79kr" : "3 recept/vecka 599kr + frakt 79kr";
      case priceIdSkaneEveryOtherWeek:
        return eng ? "3 recipes/every other week 599kr + delivery 79kr" : "3 recept/varannan v. 599kr + frakt 79kr";
      case priceIdSkaneStandard:
        return eng ? "3 recipes, 3-4 pers 659kr + delivery 79kr" : "3 recept, 3-4 pers 659kr + frakt 79kr";
      case priceIdSkaneStandard8Portions:
        return eng ? "2 recipes, 3-4 pers 439kr + delivery 79kr" : "2 recept, 3-4 pers 439kr + frakt 79kr";

    default:
      throw new Error("No product id found for price id: " + id);
  }
}