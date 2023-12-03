export const productIdEveryWeek = "934dc035-0cea-449a-8977-7b6778146c99";
export const productIdEveryOtherWeek = "4914f47a-e297-404b-b336-b505b9deedb9";
export const productIdStandard = "bfce226b-994c-42b3-945e-ae1fde089818";
export const productIdStandard8Portions =
  "570897f5-82f5-482e-a2c6-fd94f001486a";

export const priceIdEveryWeek = "price_1Nxu8QEhPZIzKmuikn7uAHzK";
export const priceIdEveryOtherWeek = "price_1NxtncEhPZIzKmuiNZl0xIxC";
export const priceIdStandard = "price_1NvlKkEhPZIzKmuiEozTJBYf";
export const priceIdStandard8Portions = "price_1NvlKfEhPZIzKmuiDximMRN3";

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
      },
      {
        label: "Varannan vecka",
        productId: productIdEveryOtherWeek, 
        disabled: false,
        price: "599kr/varannan vecka",
        portionPrice: "50kr/portion",
        priceId: priceIdEveryOtherWeek,
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
      },
      {
        label: "8 portioner",
        productId: productIdStandard8Portions, 
        disabled: false,
        price: "439kr",
        portionPrice: "55kr/portion",

        priceId: priceIdStandard8Portions,
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
          if (variant.priceId === priceId) {
              return productType.id === 'subscription';
          }
      }
  }
  return false;
};