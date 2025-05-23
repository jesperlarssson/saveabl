import Hero from "@/components/section/Hero";
import SellingPoints from "@/components/section/SellingPoints";
import IllustrationsBg from "@/components/ui/IllustrationsBg";
import CallToAction from "@/components/section/CallToAction";
import Reviews from "@/components/section/Reviews";
import TextBanner from "@/components/ui/TextBanner";
import PromotionBanner from "@/components/ui/PromotionBanner";
import Merch from "@/components/section/Merch";
import { textBannerText } from "@/lib/general";
import ExplainerVideo from "@/components/section/ExplainerVideo";
import USP from "@/components/section/USP";
import ProductGrid from "@/components/section/ProductGrid";
import { getAllPostsForHome } from "@/lib/hygraph";
import FaqSection from "@/components/ui/FaqSection";
import ScrollToHash from "@/components/general/ScrollToHash";


export default async function Home() {

  const news = (await getAllPostsForHome(false)) || [];
  return (
    <>
    <ScrollToHash />
      <div className="absolute w-full min-h-screen flex justify-center items-center z-1">
        <IllustrationsBg />
      </div>
      <div className="relative z-1 flex min-h-screen flex-col items-center justify-between pt-0">
        <Hero />
        <ExplainerVideo />
        {/* <TextBanner>{textBannerText}</TextBanner> */}
        <USP />
        {/* <SellingPoints /> */}
        {/* <ProductGrid /> */}

        <CallToAction />
        {/* <TextBanner className="bg-primary">{textBannerText}</TextBanner> */}
        <Reviews />
        <TextBanner className="bg-primary">{textBannerText}</TextBanner>
        {/* <TextBanner className="bg-accent">{textBannerText}</TextBanner> */}
        {/* <Merch /> */}
        <FaqSection />
      </div>
    </>
  );
}
