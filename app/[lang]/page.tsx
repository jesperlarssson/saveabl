import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

import Hero from "@/components/section/Hero";
import SellingPoints from "@/components/section/SellingPoints";
import IllustrationsBg from "@/components/ui/IllustrationsBg";
import LottieAnimation from "@/components/ui/LottieAnimation";
import CallToAction from "@/components/section/CallToAction";
import Reviews from "@/components/section/Reviews";
import News from "@/components/section/News";
import TextBanner from "@/components/ui/TextBanner";
import PromotionBanner from "@/components/ui/PromotionBanner";
import Merch from "@/components/section/Merch";
import { textBannerText } from "@/lib/general";
import ExplainerVideo from "@/components/section/ExplainerVideo";
import USP from "@/components/section/USP";
import ProductGrid from "@/components/section/ProductGrid";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang)

  return (
    <>
      <div className="absolute w-full min-h-screen flex justify-center items-center z-1">
        <IllustrationsBg />
      </div>
      <div className="relative z-1 flex min-h-screen flex-col items-center justify-between pt-16">
        <Hero textJson={page.hero} />
        <ExplainerVideo />
        {/* <TextBanner>{textBannerText}</TextBanner> */}
        <USP uspText={page.usp} />
        {/* <SellingPoints /> */}
        <ProductGrid />

        <CallToAction ctaText={page.call_to_action} />
        {/* <TextBanner className="bg-primary">{textBannerText}</TextBanner> */}
        <Reviews reviewsText={page.reviews} />
        <TextBanner className="bg-primary">{textBannerText}</TextBanner>
        <News newsText={page.news} />
        {/* <TextBanner className="bg-accent">{textBannerText}</TextBanner> */}
        {/* <Merch /> */}
      </div>
    </>
  );
}