"use client";
import React from "react";
import { useLang } from "@/hooks/useLang";

const JulklappPage = () => {
  const { text, lang } = useLang(); // Hämtar text och språk från språksystemet

  // Kontrollera att text.julklapp finns
  if (!text?.julklapp) {
    return <div>Laddar...</div>; // Visar en laddningsindikator om språket inte är laddat
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-[#6E2936] px-4"
      style={{
        backgroundImage: `url('/images/jul_bakgrund.png')`, // Bakgrundsbilden
        backgroundColor: "#FCF7E8", // Fallback-färg
      }}
    >
      {/* Innehåll med runda hörn */}
      <div className="bg-[#FCF7E8] rounded-lg p-8 shadow-lg max-w-3xl w-full text-center">
        {/* Huvudrubrik */}
        <h1 className="text-5xl sm:text-6xl font-bold font-poppins mb-6">
          {text.julklapp.title}
        </h1>

        {/* Beskrivning */}
        <p className="text-lg sm:text-xl font-poppins mb-8 max-w-lg mx-auto">
          {text.julklapp.description}
        </p>

        {/* Underrubrik som bild */}
        {lang === "sv" && (
          <img
            src="/images/julklapp_underrubrik_sv.png"
            alt="Julklappen innehåller (Svenska)"
            className="mb-1 mx-auto w-[300px] sm:w-[300px]" // Anpassa bredden
          />
        )}
        {lang === "en" && (
          <img
            src="/images/julklapp_underrubrik_en.png"
            alt="The Gift Includes (English)"
            className="mb-1 mx-auto w-[300px] sm:w-[300px]" // Anpassa bredden
          />
        )}
        {lang === "da" && (
          <img
            src="/images/julklapp_underrubrik_da.png"
            alt="Gaven indeholder (Danska)"
            className="mb-1 mx-auto w-[300px] sm:w-[300px]" // Anpassa bredden
          />
        )}

        {/* Punktlista */}
<ul className="text-lg sm:text-xl font-poppins list-none leading-relaxed space-y-4 text-left sm:text-center mb-8">
  {text.julklapp.points.map((point: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, index: React.Key | null | undefined) => (
    <li
      key={index}
      className="flex items-center justify-start sm:justify-center text-[#6E2936] gap-6"
    >
      {/* Justerad punkt */}
      <span
        className="w-2 h-2 bg-[#6E2936] rounded-full flex-shrink-0 self-center"
        aria-hidden="true"
      ></span>
      {/* Text */}
      <span className="leading-relaxed">{point}</span>
    </li>
  ))}
</ul>


        {/* Knappar */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          {lang === "sv" && (
            <a
              href="https://book.stripe.com/6oE8yA86Y4bgfM414D" // Svensk länk
              className="bg-[#F4664A] text-[#FCF7E8] font-poppins font-bold px-8 py-4 rounded-lg hover:bg-[#d95538] transition-colors shadow-md"
            >
              {text.julklapp.buy}
            </a>
          )}
          {lang === "da" && (
            <a
              href="https://buy.stripe.com/fZeaGI3QI9vAczS5l2" // Dansk länk
              className="bg-[#F4664A] text-[#FCF7E8] font-poppins font-bold px-8 py-4 rounded-lg hover:bg-[#d95538] transition-colors shadow-md"
            >
              {text.julklapp.buy}
            </a>
          )}
          {lang === "en" && (
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://book.stripe.com/6oE8yA86Y4bgfM414D" // Svensk länk
                className="bg-[#F4664A] text-[#FCF7E8] font-poppins font-bold px-8 py-4 text-sm rounded-lg hover:bg-[#d95538] transition-colors shadow-md flex flex-col items-center w-[160px] sm:w-[250px]"
              >
                {text.julklapp.buy_swedish}
                <span className="text-xs text-[#FCF7E8] mt-1">(Swedish)</span>
              </a>
              <a
                href="https://buy.stripe.com/fZeaGI3QI9vAczS5l2" // Dansk länk
                className="bg-[#F4664A] text-[#FCF7E8] font-poppins font-bold px-8 py-4 text-sm rounded-lg hover:bg-[#d95538] transition-colors shadow-md flex flex-col items-center w-[160px] sm:w-[250px]"
              >
                {text.julklapp.buy_danish}
                <span className="text-xs text-[#FCF7E8] mt-1">(Danish)</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JulklappPage;
