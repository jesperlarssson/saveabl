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

const priceIdDeliveryEveryWeek = "price_1NwPXNEhPZIzKmuiPRhwsPNn";
const priceIdDeliveryEveryOtherWeek = "price_1NwPp1EhPZIzKmui6bAHHFac";
const priceIdDeliveryStandard = "price_1NvlQuEhPZIzKmuiG0xEsaxI";

const priceIdDeliveryStockholmEveryWeek = "price_1OY5DpEhPZIzKmuidVt8MLqm";
const priceIdDeliveryStockholmEveryOtherWeek =
  "price_1OY5FsEhPZIzKmuiu5PVEK6o";
const priceIdDeliveryStockholmStandard = "price_1OYG3tEhPZIzKmuiT4C0NZtl";


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
      },
      {
        label: "Varannan vecka",
        productId: productIdEveryOtherWeek,
        disabled: false,
        price: "599kr/varannan vecka",
        portionPrice: "50kr/portion",
        priceId: priceIdEveryOtherWeek,
        stockholmPriceId: priceIdStockholmEveryOtherWeek,
      },
    ],
  },
  {
    id: "standard",
    label: "Engångsköp",
    variants: [
      {
        label: "12 portioner",
        productId: productIdStandard,
        disabled: false,
        price: "659kr",
        portionPrice: "55kr/portion",
        priceId: priceIdStandard,
        stockholmPriceId: priceIdStockholmStandard,
      },
      {
        label: "8 portioner",
        productId: productIdStandard8Portions,
        disabled: false,
        price: "439kr",
        portionPrice: "55kr/portion",

        priceId: priceIdStandard8Portions,
        stockholmPriceId: priceIdStockholmStandard8Portions,
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
      if (variant.priceId === priceId || variant.stockholmPriceId === priceId) {
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

    default:
      throw new Error("No shipping cost found for product id: " + id);
  }
};

export const getProductCostForPriceId = (id: string | null) => {
  switch (id) {
    case priceIdEveryWeek:
      return "12 portioner - 599kr/vecka";
    case priceIdEveryOtherWeek:
      return "12 portioner - 599kr/varannan vecka";
    case priceIdStandard:
      return "659kr";
    case priceIdStandard8Portions:
      return "439kr";
    case priceIdStockholmEveryWeek:
      return "12 portioner -  649kr/vecka";
    case priceIdStockholmEveryOtherWeek:
      return "12 portioner - 649kr/varannan vecka";
    case priceIdStockholmStandard:
      return "719kr";
    case priceIdStockholmStandard8Portions:
      return "479kr";

    default:
      throw new Error("No product id found for price id: " + id);
  }
}