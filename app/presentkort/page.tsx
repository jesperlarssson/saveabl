"use client";
import React, { useState, useEffect } from "react";
import { useLang } from "@/hooks/useLang";

const PresentkortPage = () => {
  const { text, lang } = useLang(); // Hämtar text och språk från språksystemet

  // Bilder för presentkort baserat på språk
  const images: Record<string, { main: string; alt: string }> = {
    sv: {
      main: "/images/saveabl_presentkort.png",
      alt: "/images/presentkort.png",
    },
    da: {
      main: "/images/saveabl_presentkort_da.png",
      alt: "/images/presentkort_da.png",
    },
    en: {
      main: "/images/saveabl_presentkort_en.png",
      alt: "/images/presentkort_en.png",
    },
  };

  // State för att hantera den valda stora bilden
  const [selectedImage, setSelectedImage] = useState(images[lang]?.main || images.sv.main);

  // Uppdatera den stora bilden automatiskt när språket ändras
  useEffect(() => {
    setSelectedImage(images[lang]?.main || images.sv.main);
  }, [lang]);

  // **Fix för React Hook-fel - returnera först när texten finns**
  if (!text?.presentkort) {
    return <div>Laddar...</div>;
  }

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="min-h-screen flex items-center justify-center text-[#6E2936] px-6 sm:px-4"
    >
      {/* Innehåll med bild och text */}
      <div className="flex flex-col md:flex-row items-start justify-center max-w-7xl w-full sm:mr-[5%] sm:mt-0 mt-[-60px]">
        {/* Bildsektion */}
        <div className="flex-shrink-0 md:w-1/2 flex flex-col items-start">
          {/* Stor bild */}
          <img
            src={selectedImage}
            alt="Presentkort"
            className="w-[100%] h-auto object-cover rounded-lg mx-auto sm:w-[80%]"
          />

          {/* Små bilder - placerade under den stora */}
          <div className="flex gap-4 mt-6 mb-6 md:ml-16 ml-0">
            <img
              src={images[lang]?.main || images.sv.main}
              alt="Nuvarande presentkort"
              className={`w-20 h-auto object-cover rounded-md cursor-pointer transition-all ${
                selectedImage === images[lang]?.main ? "border-2 border-[#6E2936]" : "opacity-80 hover:opacity-100"
              }`}
              onClick={() => setSelectedImage(images[lang]?.main || images.sv.main)}
            />
            <img
              src={images[lang]?.alt || images.sv.alt}
              alt="Alternativ presentkort"
              className={`w-20 h-auto object-cover rounded-md cursor-pointer transition-all ${
                selectedImage === images[lang]?.alt ? "border-2 border-[#6E2936]" : "opacity-80 hover:opacity-100"
              }`}
              onClick={() => setSelectedImage(images[lang]?.alt || images.sv.alt)}
            />
          </div>
        </div>

        {/* Textsektion */}
        <div className="md:w-1/2 md:pl-8 text-left flex items-start">
          <div>
            <h1 className="font-bold font-poppins mb-4 text-3xl sm:text-4xl">
              {text.presentkort.title}
            </h1>

            <p className="text-base sm:text-lg font-poppins mb-6">
              {text.presentkort.description}
            </p>

            <ul className="text-base sm:text-lg font-poppins list-none leading-relaxed space-y-4 mb-6">
              {text.presentkort.points.map((point: string, index: number) => (
                <li key={index} className="flex items-start text-[#6E2936] gap-4">
                  <span className="w-2 h-2 bg-[#6E2936] rounded-full mt-2" aria-hidden="true"></span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* Knappar */}
            <div className={`flex flex-wrap ${lang === "en" ? "justify-center gap-4" : "flex-col"} w-full`}>
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
    </div>
  );
};

export default PresentkortPage;
