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
import { useRouter } from "next/router";
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
      : undefined; // Om språk inte matchar, blir bylineImage undefined

  return (
    <div className="w-full h-screen -mt-32 flex flex-col justify-center">
      <Section>
        <Parallax speed={10}>
          <div className="flex flex-col  justify-center items-center gap-y-12 text-secondary ">
            <RecipeDisplay />
            {/* <div className="w-128 h-fit overflow-hidden rounded-lg  shadow-primary-800  drop-shadow-xl">
              <LiteYouTubeEmbed
                aspectHeight={9}
                aspectWidth={16}
                id="SxbsaJLzIiE"
                title="Saveabl - explainer video"
              />
            </div> */}
            <div className="-ml-8">
              {/* Rendera bara Image-komponenten om bylineImage är definierad */}
          {bylineImage && (
            <div className="byline-image-wrapper">
              <Image
                width={660 / 2}
                height={140 / 2}
                alt="Hand scribbles"
                src={bylineImage}
                className="byline-image"
              />
               </div>
          )}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="ml-8 -mt-16 font-poppins text-4xl md:text-5xl max-w-3xl text-center"
              >
                {text.page.hero.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="ml-8 mt-4 mb-12 text-gray-700 text-center text-xl tracking-wide"
              >
                {text.page.hero.subtitle}
              </motion.p>
              <Link href={"/bestall"} className="flex justify-center">
                <Button className="ml-8 w-full md:w-96 ">
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
