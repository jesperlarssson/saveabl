"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import Button from "../ui/Button";
import Lottie from "lottie-react";
import gardAnimation from "../../public/anim/gard.json";
import { useLang } from "@/hooks/useLang";

const GardsbutikHero = () => {
  const { text } = useLang();

  const handleScrollToHow = () => {
    const el = document.getElementById("hur-gor-jag");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* MARKIS */}
      <div className="relative w-full z-10 mt-0 md:mt-[-16px] pointer-events-none">
        <div className="relative w-full overflow-hidden">
          {/* Mobil: INTE fullbredd */}
          <div className="relative mx-auto h-[90px] sm:h-[100px] md:h-[180px] 
                          max-w-[380px] sm:max-w-[520px] md:max-w-none">
            <img
              src="/images/farmshop-awning.svg"
              alt=""
              aria-hidden="true"
              className="
                absolute inset-0
                w-full h-full
                object-contain object-top
              "
              style={{
                transform: "translateY(-6px)",
              }}
            />
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="w-full h-auto flex flex-col justify-center overflow-x-hidden">
        <Section className="pt-10 pb-20 md:pt-10 md:pb-20">
          <div className="flex flex-col justify-center items-center text-secondary">
            <div className="w-full flex justify-start max-w-xl mx-auto -mb-[6px] md:-mb-[4px]">
              <img
                src="/images/saveabl-gardsbutik.svg"
                alt="Saveabl"
                className="w-[140px] md:w-[180px] ml-10 md:ml-20"
              />
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-poppins text-4xl md:text-5xl font-semibold mb-1 md:mb-2"
            >
              {text.farmshop.title}
            </motion.h1>

            <div className="-mt-5 -mb-5 flex justify-center md:mt-1 md:mb-2">
              <Lottie
                animationData={gardAnimation}
                loop
                className="w-[420px] h-[150px] md:w-[850px] md:h-[130px]"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-700 text-md md:text-xl tracking-wide max-w-xl text-center mb-8 md:mb-10"
            >
              <span className="hidden md:block">
                {text.farmshop.description.desktop}
              </span>
              <span className="md:hidden">
                {text.farmshop.description.mobile}
              </span>
            </motion.p>

            <Button
              onClick={handleScrollToHow}
              className="w-full md:w-72 bg-[#6E2936] text-white hover:bg-[#5a2430] mt-2"
            >
              {text.farmshop.cta}
            </Button>
          </div>
        </Section>
      </div>
    </>
  );
};

export default GardsbutikHero;
