export interface Product {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  price: number;
  portions: number;
  recipes?: number;
  favorite?: boolean;
  imgSrc: string;
  subscription?: boolean;
  everyWeek?: boolean;
  type?: string;
}

export const productInfo: Product[] = [
  {
    id: "PRODUCT1",
    title: "Prenumeration varje vecka",
    excerpt:
      "Få hem tolv portioner mat till din dörr varje vecka. Välj leveransdag lör-mån.",
    description:
      'När du beställer en prenumeration får du hem tolv portioner mat till din dörr varje vecka. Prenumerationen har ingen bindningstid och du kan avsluta när du vill. Leveransdag väljer du själv lör-mån när du lägger din beställning. Din prenumeration kan hanteras under "mitt konto" när som.',
    price: 599,
    portions: 12,
    recipes: 3,
    favorite: true,
    subscription: true,
    everyWeek: true,
    imgSrc: "/images/product-1.jpg",
  },
  {
    id: "PRODUCT2",
    title: "Prenumeration varannan vecka",
    excerpt:
      "Få hem tolv portioner mat till din dörr varannan vecka. Välj leveransdag lör-mån.",
    description:
      'När du beställer en prenumeration får du hem tolv portioner mat till din dörr varannan vecka. Prenumerationen har ingen bindningstid och du kan avsluta när du vill. Leveransdag väljer du själv lör-mån när du lägger din beställning. Din prenumeration kan hanteras under "mitt konto" när som.',
    price: 599,
    portions: 12,
    recipes: 3,
    subscription: true,
    everyWeek: false,
    imgSrc: "/images/product-2.jpg",
  },
  {
    id: "PRODUCT3",
    title: "Prova-på-kassen",
    excerpt:
      "Få hem åtta portioner mat och testa på saveabl-kassen. Välj leveransdag lör-mån.",
    description:
      "Få hem åtta portioner mat och testa på saveabl-kassen. Välj leveransdag lör-mån.",
    price: 499,
    portions: 8,
    recipes: 2,
    subscription: false,
    imgSrc: "/images/product-3.jpg",
  },
  {
    id: "PRODUCT4",
    title: "Engångsköp",
    excerpt:
      "Få hem tolv portioner mat till din dörr varje vecka. Välj leveransdag lör-mån.",
    description:
      "Få hem tolv portioner mat till din dörr varje vecka. Välj leveransdag lör-mån.",
    price: 659,
    portions: 12,
    recipes: 3,
    subscription: false,
    imgSrc: "/images/product-4.jpg",
  },
];
