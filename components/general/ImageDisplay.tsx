"use client"
import React from "react";
import { useLang } from "@/hooks/useLang"; // Importera språkhantering
import Image from "next/image";

const ImageDisplay: React.FC = () => {
  const { text } = useLang(); // Hämta text från LangProvider

  return (
    <div className="mt-2"> {/* Avstånd från navbaren */}
      {/* Bildlayouten */}
      <div className="grid gap-1 md:gap-2 px-2 md:px-2 md:grid-cols-3 md:grid-rows-1 grid-cols-2 grid-auto-rows md:h-auto">
        {/* Första bilden - Mindre höjd på mobil */}
        <div className="relative w-full col-span-2 md:col-span-1 h-[150px] md:h-[415px]">
        <Image 
  src="/images/klimatsmart.webp" 
  alt={text.imageDisplay.klimatsmart} 
  width={500} // Sätt ett breddvärde
  height={500} // Sätt ett höjdvärde
  className="w-full h-[150px] md:h-[415px] object-cover rounded-md object-[50%_60%] md:object-center"
  priority={true} 
  loading="eager"
  fetchPriority="high"
  decoding="sync"
  unoptimized={true}
/>
          <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white px-1.5 md:px-3 py-1 md:py-2 rounded-md shadow-md flex items-center gap-1 md:gap-1">
          <span className="text-black font-medium text-[6px] md:text-xs">✔</span>
            <span className="text-[8px] md:text-xs font-semibold">{text.imageDisplay.klimatsmart}</span>
          </div>
        </div>

        {/* Andra bilden - Kockförberedd (Högre på mobil) */}
        <div className="relative w-full h-[180px] md:h-[415px]">
        <Image
            src="/images/kockforberedd.webp" 
            alt={text.imageDisplay.kockforberedd}
            width={500} // Sätt ett breddvärde
            height={500} // Sätt ett höjdvärde
            className="w-full h-[180px] md:h-[415px] object-cover rounded-md object-[50%_38%]" 
            priority={true}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            unoptimized={true}
          />
          <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white px-1.5 md:px-3 py-1 md:py-2 rounded-md shadow-md flex items-center gap-1 md:gap-1">
          <span className="text-black font-medium text-[6px] md:text-xs">✔</span>
            <span className="text-[8px] md:text-xs font-semibold">{text.imageDisplay.kockforberedd}</span>
          </div>
        </div>

        {/* Tredje bilden - Matbilden (Högre på mobil) */}
        <div className="relative w-full h-[180px] md:h-[415px]">
        <Image
            src="/images/enkelt-gott.webp" 
            alt={text.imageDisplay.enkeltgott}
            width={500} // Sätt ett breddvärde
            height={500} // Sätt ett höjdvärde
            className="w-full h-[180px] md:h-[415px] object-cover rounded-md object-[50%_40%]"
            priority={true}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            unoptimized={true}
          />
          <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white px-1.5 md:px-3 py-1 md:py-2 rounded-md shadow-md flex items-center gap-1 md:gap-1">
          <span className="text-black font-medium text-[6px] md:text-xs">✔</span>
            <span className="text-[8px] md:text-xs font-semibold">{text.imageDisplay.enkeltgott}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
