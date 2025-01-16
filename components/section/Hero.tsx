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

const Hero = () => {
  const { lang, text } = useLang();

  const bylineImage =
    lang === "sv"
      ? "/images/byline.png"
      : lang === "en"
      ? "/images/byline_eng.png"
      : lang === "da"
      ? "/images/byline_da.png"
      : undefined;

  return (
    <div className="w-full h-screen -mt-28 flex flex-col justify-center">
      <Section>
        <Parallax speed={10}>
          <div className="flex flex-col justify-center items-center gap-y-6 text-secondary">
            <RecipeDisplay />
            <div className="flex flex-col justify-center items-center px-4 text-center">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-poppins text-4xl md:text-5xl font-semibold mb-6"
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
              <div className="leading-normal mb-10">
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
              <Link href={"/bestall"} className="flex justify-center">
                <Button className="w-full md:w-96 mb-0 sm:mb-20">
                  {text.page.hero.order_now}
                </Button>
              </Link>
            </div>
          </div>
        </Parallax>
      </Section>
    </div>
  );
};

export default Hero;
