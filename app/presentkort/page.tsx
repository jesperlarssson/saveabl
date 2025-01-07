"use client";
import React from "react";
import { useLang } from "@/hooks/useLang";

const PresentkortPage = () => {
  const { text, lang } = useLang(); // Hämtar text och språk från språksystemet

  // Kontrollera att text.presentkort finns
  if (!text?.presentkort) {
    return <div>Laddar...</div>; // Visar en laddningsindikator om språket inte är laddat
  }

  // Bestäm bild baserat på språk
  const imageSrc =
    lang === "da"
      ? "/images/saveabl_presentkort_da.png"
      : lang === "en"
      ? "/images/saveabl_presentkort_en.png"
      : "/images/saveabl_presentkort.png";

  return (
    <div className="min-h-screen flex items-center justify-center text-[#6E2936] px-6 sm:px-4 sm:pt-0 pt-6">
      {/* Innehåll med bild och text */}
      <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl w-full sm:mr-[5%]">
        {/* Bildsektion */}
        <div className="flex-shrink-0 md:w-1/2 mb-10 md:mb-0 sm:mt-0 mt-[-140px]">
          <img
            src={imageSrc}
            alt="Presentkort"
            className="w-[100%] h-auto object-cover rounded-lg mx-auto sm:w-[80%]"
          />
        </div>

        {/* Textsektion */}
        <div className="md:w-1/2 md:pl-8 text-left">
          {/* Huvudrubrik */}
          <h1
            className={`font-bold font-poppins mb-4 ${
              lang === "en" ? "text-3xl sm:text-4xl" : "text-3xl sm:text-4xl"
            }`}
          >
            {text.presentkort.title}
          </h1>

          {/* Beskrivning */}
          <p className="text-base sm:text-lg font-poppins mb-6">
            {text.presentkort.description}
          </p>

          {/* Punktlista */}
          <ul className="text-base sm:text-lg font-poppins list-none leading-relaxed space-y-4 mb-6">
            {text.presentkort.points.map((point: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, index: React.Key | null | undefined) => (
              <li
                key={index}
                className="flex items-start text-[#6E2936] gap-4"
              >
                <span
                  className="w-2 h-2 bg-[#6E2936] rounded-full mt-2"
                  aria-hidden="true"
                ></span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>

          {/* Knappar */}
          <div
            className={`${
              lang === "en" ? "flex flex-wrap justify-center gap-4" : "flex flex-col"
            } w-full`}
          >
            {lang === "sv" && (
              <a
                href="https://book.stripe.com/6oE8yA86Y4bgfM414D"
                className="bg-[#F4664A] text-[#FCF7E8] font-poppins font-bold px-6 mt-2 py-3 rounded-lg hover:bg-[#d95538] transition-colors shadow-md w-full text-center"
              >
                {text.presentkort.buy}
              </a>
            )}
            {lang === "da" && (
              <a
                href="https://buy.stripe.com/fZeaGI3QI9vAczS5l2"
                className="bg-[#F4664A] text-[#FCF7E8] font-poppins font-bold px-6 mt-2 py-3 rounded-lg hover:bg-[#d95538] transition-colors shadow-md w-full text-center"
              >
                {text.presentkort.buy}
              </a>
            )}
            {lang === "en" && (
              <div className="flex justify-center mt-2 gap-4 w-full">
                <a
                  href="https://book.stripe.com/6oE8yA86Y4bgfM414D"
                  className="bg-[#F4664A] text-[#FCF7E8] font-poppins font-bold px-4 py-2 text-sm rounded-lg hover:bg-[#d95538] transition-colors shadow-md flex flex-col items-center w-[45%] text-center"
                >
                  {text.presentkort.buy_swedish}
                  <span className="text-xs text-[#FCF7E8] mt-1">(Swedish)</span>
                </a>
                <a
                  href="https://buy.stripe.com/fZeaGI3QI9vAczS5l2"
                  className="bg-[#F4664A] text-[#FCF7E8] font-poppins font-bold px-4 py-2 text-sm rounded-lg hover:bg-[#d95538] transition-colors shadow-md flex flex-col items-center w-[45%] text-center"
                >
                  {text.presentkort.buy_danish}
                  <span className="text-xs text-[#FCF7E8] mt-1">(Danish)</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentkortPage;
