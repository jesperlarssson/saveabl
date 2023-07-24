export interface AddOn {
  id: string;
  title: string;
  excerpt: string;
  price: number;
  imgSrc: string;
  quantity?: number; // We add the quantity here for multiple same add-ons
  variants?: string[];
}

export const addOnsInfo: AddOn[] = [
  {
    id: "ADDON1",
    title: "Granola",
    excerpt:
      "Vår handgjorda räddade Granola är helt utan tillsatt socker och innehåller 13,7% protein. ",
    price: 39,
    imgSrc: "/images/granola.png",
  },
  {
    id: "ADDON2",
    title: "T-shirt",
    excerpt: "Rocka vår t-shirt och visa att du är en räddare!",
    price: 199,
    imgSrc: "/images/tshirt.png",
    variants: [
      "XS", "S", "M", "L", "XL"
    ],
  },
];
