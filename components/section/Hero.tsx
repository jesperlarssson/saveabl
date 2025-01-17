"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { motion } from "framer-motion";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Image from "next/image";
import Button from "../ui/Button";
import Section from "../ui/Section";
import { Parallax } from "react-scroll-parallax";
import RecipeDisplay from "../general/RecipeDisplay";
import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import router from "next/router";

const Hero = () => {
  const { lang, text } = useLang();

  const hero_picImage =
    lang === "sv"
      ? "/images/hero_pic.png"
      : lang === "en"
      ? "/images/hero_pic_eng.png"
      : lang === "da"
      ? "/images/hero_pic_da.png"
      : undefined;

  return (
    <div className="w-full h-auto -mt-42 sm:-mt-42 flex flex-col justify-center">
      {/* Sektionen reduceras */}
      <Section className="pb-0 sm:pb-2">
        <Parallax speed={10}>
          <div className="flex flex-col justify-center items-center gap-y-4 text-secondary">
            {/* Recepten */}
              <RecipeDisplay />

            {/* Huvudinnehållet */}
            <div className="flex flex-col justify-center items-center text-center">
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
              {/* Knappen */}
              <Button
                onClick={() => router.push("/bestall?id=1")}
                className="w-full md:w-96 mt-6"
              >
                {text.page.hero.order_now}
              </Button>
            </div>

            {/* Hero Pic Bild */}
            {hero_picImage && (
              <div className="mt-4 -mb-16 sm:-mb-12">
                <Image
                  width={660 / 2}
                  height={140 / 2}
                  alt="Hand scribbles"
                  src={hero_picImage}
                  className="object-cover w-66 sm:w-78" // Mindre på mobil, större på större skärmar
                />
              </div>
            )}
          </div>
        </Parallax>
      </Section>
    </div>
  );
};

export default Hero;
