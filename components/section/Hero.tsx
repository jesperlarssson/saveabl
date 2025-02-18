"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { motion } from "framer-motion";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Image from "next/image";
import Button from "../ui/Button";
import Section from "../ui/Section";
import { Parallax } from "react-scroll-parallax";
import RecipeDisplay from "../general/RecipeDisplay";
import { useLang } from "@/hooks/useLang";
import { useRouter } from "next/navigation"; // Korrekt import av useRouter
import { useEffect, useState } from "react";
import ImageDisplay from "../general/ImageDisplay";
import LoadingScreen from "./LoadingScreen";

const Hero = () => {
  const { lang, text } = useLang();
  const router = useRouter(); // Använd useRouter korrekt
  const [activeIndex, setActiveIndex] = useState(0);
  const [recipesCount, setRecipesCount] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);


  const hero_picImage =
    lang === "sv"
      ? "/images/hero_pic.png"
      : lang === "en"
      ? "/images/hero_pic_eng.png"
      : lang === "da"
      ? "/images/hero_pic_da.png"
      : undefined;

  return (
    <div className="w-full h-auto flex flex-col justify-center">
       <ImageDisplay />
      <Section className="pb-0 sm:pb-2">
          <div className="flex flex-col justify-center items-center gap-y-4 text-secondary">

            {/* Huvudinnehållet */}
            <div className="flex flex-col justify-center items-center text-center -mt-10 sm:-mt-8">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-poppins text-3xl md:text-5xl font-semibold mb-6"
              >
                <span className="hidden md:block">
                  {text.page.hero.title.part1} <br />
                  {text.page.hero.title.part2}
                </span>
                <span className="md:hidden">
                  {text.page.hero.title.part1} {text.page.hero.title.part2}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-gray-700 text-md md:text-xl tracking-wide mb-6"
              >
                <span className="hidden md:block">
                  {text.page.hero.subtitle.part1} <br />
                  {text.page.hero.subtitle.part2}
                </span>
                <span className="md:hidden">
                  {text.page.hero.subtitle.part1} {text.page.hero.subtitle.part2}
                </span>
              </motion.p>
              <div className="leading-normal mb-6">
                {Object.entries(text.page.hero.points).map(([key, point]) => (
                  <p
                    key={key}
                    className="text-gray-700 text-md md:text-xl tracking-wide"
                  >
                    {key === "cooking_time" && <strong>15 min</strong>}
                    {key === "delivery" && <strong>100 %</strong>}
                    {key === "chef_prepared" && <strong>80 %</strong>}
                    {" "}{point as string}
                  </p>
                ))}
              </div>

              <Button
                onClick={() => router.push("/bestall?id=1")}
                className="w-full md:w-96 mt-3"
              >
                {text.page.hero.order_now}
              </Button>
            </div>

            {/* Hero Pic Bild */}
            {hero_picImage && (
                <div className="mt-4 -mb-6 sm:-mb-5">
                <Image
                  width={330}
                  height={70}
                  alt="Hand scribbles"
                  src={hero_picImage}
                  className="object-cover w-72 sm:w-72 md:w-80 lg:w-80" // 🔹 Mindre på mobil, större på desktop
                  priority={true}
                />
              </div>
            )}
          </div>
      </Section>
    </div>
  );
};

export default Hero;

