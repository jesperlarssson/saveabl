import { ProductInfo } from "@/types";

export const productInfo: ProductInfo[] = [
  {
    id: "PRODUCT1",
    title: "Prenumeration varje vecka",
    price_id: "price_1NXKg5Jc8QQ33P90Mhta8wAA",
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
    img_src: "/images/product-1.jpg",
  },
  {
    id: "PRODUCT2",
    title: "Prenumeration varannan vecka",
    price_id: "price_1NXKg5Jc8QQ33P90EaNd4V24",
    excerpt:
      "Få hem tolv portioner mat till din dörr varannan vecka. Välj leveransdag lör-mån.",
    description:
      'När du beställer en prenumeration får du hem tolv portioner mat till din dörr varannan vecka. Prenumerationen har ingen bindningstid och du kan avsluta när du vill. Leveransdag väljer du själv lör-mån när du lägger din beställning. Din prenumeration kan hanteras under "mitt konto" när som.',
    price: 599,
    portions: 12,
    recipes: 3,
    subscription: true,
    everyWeek: false,
    img_src: "/images/product-2.jpg",
  },
  {
    id: "PRODUCT3",
    title: "Prova-på-kassen",
    price_id: "price_1NZpuuJc8QQ33P90sXENUpWQ",
    excerpt:
      "Få hem åtta portioner mat och testa på saveabl-kassen. Välj leveransdag lör-mån.",
    description:
      "Få hem åtta portioner mat och testa på saveabl-kassen. Välj leveransdag lör-mån.",
    price: 499,
    portions: 8,
    recipes: 2,
    subscription: false,
    img_src: "/images/product-3.jpg",
  },
  {
    id: "PRODUCT4",
    title: "Engångsköp",
    price_id: "price_1NZptEJc8QQ33P904b6qWtdg",
    excerpt:
      "Få hem tolv portioner mat till din dörr varje vecka. Välj leveransdag lör-mån.",
    description:
      "Få hem tolv portioner mat till din dörr varje vecka. Välj leveransdag lör-mån.",
    price: 659,
    portions: 12,
    recipes: 3,
    subscription: false,
    img_src: "/images/product-4.jpg",
  },
];
