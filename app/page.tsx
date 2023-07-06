import Hero from "@/components/section/Hero";
import SellingPoints from "@/components/section/SellingPoints";
import IllustrationsBg from "@/components/ui/IllustrationsBg";
import LottieAnimation from "@/components/ui/LottieAnimation";
import animationData from "../public/anim/Jordklot.json";
import CallToAction from "@/components/section/CallToAction";
import Reviews from "@/components/section/Reviews";
import News from "@/components/section/News";
import TextBanner from "@/components/ui/TextBanner";
import PromotionBanner from "@/components/ui/PromotionBanner";
import Merch from "@/components/section/Merch";
import { textBannerText } from "@/lib/general";
import ExplainerVideo from "@/components/section/ExplainerVideo";
import USP from "@/components/section/USP";

export default function Home() {

   
  return (
    <>
      <div className="absolute w-full min-h-screen flex justify-center items-center z-1">
        <IllustrationsBg />
      </div>
      <div className="relative z-1 flex min-h-screen flex-col items-center justify-between pt-16">
        <Hero />
        <ExplainerVideo />
        {/* <TextBanner>{textBannerText}</TextBanner> */}
        <USP />
        {/* <SellingPoints /> */}

        <CallToAction />
        <TextBanner>{textBannerText}</TextBanner>
        <Reviews />
        <TextBanner>{textBannerText}</TextBanner>
        <News />
        <TextBanner>{textBannerText}</TextBanner>
        <Merch />
      </div>
    </>
  );
}
