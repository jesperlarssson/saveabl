import Hero from "@/components/section/Hero";
import SellingPoints from "@/components/section/SellingPoints";
import IllustrationsBg from "@/components/ui/IllustrationsBg";
import LottieAnimation from "@/components/ui/LottieAnimation";
import animationData from "../public/anim/Jordklot.json";
import CallToAction from "@/components/section/CallToAction";
import Reviews from "@/components/section/Reviews";
import News from "@/components/section/News";
import TextBanner from "@/components/ui/TextBanner";

export default function Home() {
  return (
    <>
      <div className="absolute w-full min-h-screen flex justify-center items-center z-1">
        <IllustrationsBg />
      </div>
      <div className="relative z-1 flex min-h-screen flex-col items-center justify-between pt-28">
        <Hero />
        {/* <svg
          id="section-divider"
          viewBox="0 0 1600 800"
          className="w-full h-64 translate-y-48 z-0 relative"
          preserveAspectRatio="none"
        >
          <path
           className="fill-secondary"
            d="M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"
          />
          <path
            className="fill-primary"
            d="M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z"
          />
          <path
            className="fill-primary-300"
            d="M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"
          />
          <path
           className="fill-primary-200 z-0 block"
            d="M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z"
          />
        </svg> */}
        <TextBanner>save time • save food • save earth • save time • save food • save earth • save time • save food • save earth • save time • save food • save earth • save time • save food • save earth •  </TextBanner>
        <SellingPoints />
        <CallToAction />
        <Reviews />
        <News />
      </div>
    </>
  );
}
