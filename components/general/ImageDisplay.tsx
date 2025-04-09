"use client";
import React from "react";
import { useLang } from "@/hooks/useLang";
import Image from "next/image";

const ImageDisplay: React.FC = () => {
  const { text } = useLang(); 

  return (
    <div className="relative w-full h-[150px] md:h-[400px] overflow-hidden">
      {/* Bild 1 – vänster, bredare nertill, lutning på höger sida */}
      <div
        className="absolute top-0 left-0 h-full"
        style={{
          width: "31%",
          clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)",
        }}
      >
        <Image
          src="/images/kockforberedd.webp"
          alt={text.imageDisplay.kockforberedd}
          fill
          className="object-cover"
          style={{ objectPosition: "center 38%" }}
          unoptimized
        />
        <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-white px-1.5 md:px-3 py-0.5 md:py-2 rounded-sm shadow-md flex items-center gap-1 md:gap-1">
  <span className="text-black font-medium text-[6px] md:text-xs">✔</span>
  <span className="text-[8px] md:text-xs font-semibold">{text.imageDisplay.kockforberedd}</span>
</div>
      </div>

      {/* Bild 2 – mitten, omvänd triangel (bredare upptill) */}
      <div
        className="absolute top-0 h-full"
        style={{
          left: "27%",
          width: "46%",
          clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
        }}
      >
        <Image
          src="/images/klimatsmart.webp" 
          alt={text.imageDisplay.klimatsmart}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 md:bottom-4 bg-white px-1.5 md:px-3 py-0.5 md:py-2 rounded-sm shadow-md flex items-center gap-1 md:gap-1">
  <span className="text-black font-medium text-[6px] md:text-xs">✔</span>
  <span className="text-[8px] md:text-xs font-semibold">{text.imageDisplay.klimatsmart}</span>
</div>

      </div>

      {/* Bild 3 – höger, bredare nertill, lutning på vänster sida */}
      <div
        className="absolute top-0 h-full"
        style={{
          left: "69%",
          width: "31%",
          clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <Image
          src="/images/enkelt-gott.webp"
          alt={text.imageDisplay.enkeltgott}
          fill
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          unoptimized
        />
         <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white px-1.5 md:px-3 py-0.5 md:py-2 rounded-sm shadow-md flex items-center gap-1 md:gap-1">
         <span className="text-black font-medium text-[6px] md:text-xs">✔</span>
           <span className="text-[8px] md:text-xs font-semibold">{text.imageDisplay.enkeltgott}</span>
         </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
