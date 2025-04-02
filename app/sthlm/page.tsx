import HeroSthlm from "./components/HeroSthlm";
import IllustrationsBg from "../../components/ui/IllustrationsBg";
import ExplainerVideo from "../../components/section/ExplainerVideo";
import USP from "../../components/section/USP";
import CallToAction from "../../components/section/CallToAction";
import Reviews from "../../components/section/Reviews";
import TextBanner from "../../components/ui/TextBanner";
import FaqSection from "../../components/ui/FaqSection";
import { textBannerText } from "@/lib/general";
import StockholmPopup from "./components/StockholmPopup";


export default function StockholmPage() {
  return (
    <>
      <div className="absolute w-full min-h-screen flex justify-center items-center z-1">
        <IllustrationsBg />
      </div>
      <div className="relative z-1 flex flex-col items-center justify-between pt-0">
      <StockholmPopup />
        <HeroSthlm />
        <ExplainerVideo />
        <USP />
        <CallToAction />
        <Reviews />
        <TextBanner className="bg-primary">{textBannerText}</TextBanner>
        <FaqSection />
      </div>
    </>
  );
}
