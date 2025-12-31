import GardsbutikHero from "@/components/gardsbutik/GardsbutikHero";
import FarmShopProductsSection from "@/components/gardsbutik/GardsbutikProductsSection";
import GardsbutikHowItWorks from "@/components/gardsbutik/GardsbutikHowItWorks";

export default function GardsbutikPage() {
  return (
    <main>
      <GardsbutikHero />
      <FarmShopProductsSection />
      <GardsbutikHowItWorks />
      {/* resten av sidan sen */}
    </main>
  );
}
