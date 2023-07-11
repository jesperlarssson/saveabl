export interface AddOn {
  id: string;
  title: string;
  excerpt: string;
  price: number;
  imgSrc: string;
  quantity?: number; // We add the quantity here for multiple same add-ons
}

export const addOnsInfo: AddOn[] = [
  {
    id: "ADDON1",
    title: "Granola",
    excerpt:
      "Vår handgjorda Granola är helt utan tillsatt socker och innehåller 13,7% protein, så att du ska hålla dig mätt längre! Granolan är smaksatt med mandel, kanel och krokiga morötter som vi räddar från att slängas just för de är krokiga. Genom att pressa dem till morotsjuice och blanda dem i Granolan, får den sin unika och naturligt goda smak. ",
    price: 39,
    imgSrc: "/images/granola.png",
  },
  {
    id: "ADDON2",
    title: "T-shirt",
    excerpt: "Rocka vår t-shirt och visa att du är en räddare!",
    price: 199,
    imgSrc: "/images/t-shirt.png",
  },
];
