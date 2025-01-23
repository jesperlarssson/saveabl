"use client"
import { useLang } from "@/hooks/useLang"; // Hämta språket från LangProvider
import Accordion from "@/components/ui/Accordion"; // Importera Accordion
import React from "react";
import Section from "@/components/ui/Section";
import Button from "../ui/Button";
import router from "next/router";
import Title from "../ui/Title";
import LottieAnimation from "./LottieAnimation";
import clockAnimation from "../../public/anim/Klocka.json";
import globAnimation from "../../public/anim/Jordklot.json";

const FaqSection = () => {
    const { lang, text } = useLang();

  // Mappa om FAQ-datan så att rätt fråga och svar visas baserat på språket
  const translatedFaqs = text.about_us.faqItems.map((faq: { question: { [x: string]: any; }; answer: { [x: string]: any; }; }) => ({
    question: faq.question[lang],
    answer: faq.answer[lang]
  }));

  return (
        <div className="bg-primary-200 w-full relative pt-0">
           <div className="absolute right-5 top-15 opacity-50 w-0 h-0 md:w-64 md:h-48 lg:w-128 lg:h-96 z-0">
             <LottieAnimation animationData={clockAnimation} />
           </div>
          <div id="vanliga-fragor">
            <Accordion faqs={text.about_us.faqItems} title={text.about_us.faq} />
            <div
              style={{ backgroundColor: "#FCF7E8" }}
              className="-mt-4 sm:mt-0 flex justify-center px-4 sm:px-4 md:px-8 mb-20"
            >
              <Button
                onClick={() => router.push("/bestall?id=1")}
                className="mt-0 w-full md:w-96"
              >
                {text.about_us.button}
              </Button>
            </div>
          </div>
        </div>
      );
      
};

export default FaqSection;
