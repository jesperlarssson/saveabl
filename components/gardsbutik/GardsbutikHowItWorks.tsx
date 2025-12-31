"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "../ui/Section";
import { useLang } from "@/hooks/useLang";

const GardsbutikHowItWorks = () => {
  const { text } = useLang();

  // EN/SV ligger på root: text.how.title + text.how.steps
  const title = text.how.title;
  const steps = text.how.steps;

  const icons = [
    "/icons/utensils.svg",
    "/icons/cart.svg",
    "/icons/truck.svg",
  ];

  return (
    <Section className="pb-20 md:pb-20">
         <div id="hur-gor-jag" className="scroll-mt-24" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-[#6E2936] mb-8 md:mb-10">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {steps.slice(0, 3).map((step: any, idx: number) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Icon */}
              <div
                className={`flex items-center justify-center ${
                  idx === 2 ? "mb-2 md:mb-4" : "mb-4"
                }`}
              >
                <Image
                  src={icons[idx]}
                  alt=""
                  width={40}
                  height={40}
                  className="hidden md:block"
                />
                <Image
                  src={icons[idx]}
                  alt=""
                  width={32}
                  height={32}
                  className="md:hidden"
                />
              </div>

              {/* Title */}
              <p
                className="
                  text-secondary
                  font-semibold
                  text-[20px]
                  text-center
                  whitespace-nowrap
                  leading-tight
                "
              >
                {idx + 1}. {step.title}
              </p>

              {/* Description */}
              <p
                className="
                  text-gray-700
                  text-[16px]
                  leading-relaxed
                  mt-2
                  max-w-[300px] md:max-w-[340px]
                "
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default GardsbutikHowItWorks;
