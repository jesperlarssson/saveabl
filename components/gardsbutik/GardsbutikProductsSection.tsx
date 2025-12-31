// components/gardsbutik/FarmShopProductsSection.tsx
import { getFarmShopProducts, getNextWeekFarmShopProducts } from "@/lib/hygraph";
import FarmShopProductsSectionClient from "./FarmShopProductsSectionClient";

const FarmShopProductsSection = async () => {
  const [products, nextWeekProducts] = await Promise.all([
    getFarmShopProducts(),
    getNextWeekFarmShopProducts(),
  ]);

  return (
    <FarmShopProductsSectionClient
      products={products}
      nextWeekProducts={nextWeekProducts}
    />
  );
};

export default FarmShopProductsSection;
