"use client";
import React, { useEffect, useState } from 'react';
import { getLatestPromotionBanner } from '@/lib/hygraph';
import Image from 'next/image';
import { useLang } from "@/hooks/useLang";  // Använd useLang för att hämta språket

interface PromotionBannerItem {
  content?: {
    html?: string;
  };
}

const PromotionBanner = () => {
  const [bannerContent, setBannerContent] = useState<PromotionBannerItem[]>([]);
  const { text, lang } = useLang();  // Hämta både text och språk från useLang
  const [promotionText, setPromotionText] = useState(text.promotionbanner.promotiontext); // Hämta promotionText baserat på språket

  useEffect(() => {
    const fetchBannerContent = async () => {
      try {
        const content = await getLatestPromotionBanner();
        setBannerContent(content || []);
      } catch (error) {
        console.error('Error fetching promotion banner:', error);
        setBannerContent([]);
      }
    };

    fetchBannerContent();
    setPromotionText(text.promotionbanner.promotiontext);  // Uppdatera promotionText när text ändras
  }, [text]);

  // Bestäm bilder baserat på språkkoden
  let trustpilotImage = "/images/trustpilot-en.png"; // Standardbild om inget språk matchar
  let eubusinessImage = "/images/eubusinessnews-en.png"; // Standardbild för eubusiness om inget språk matchar

  switch (lang) {
    case 'sv':
      trustpilotImage = "/images/trustpilot-sv.png";
      eubusinessImage = "/images/eubusinessnews-se.png";
      break;
    case 'da':
      trustpilotImage = "/images/trustpilot-da.png";
      eubusinessImage = "/images/eubusinessnews-da.png";
      break;
    case 'en':
    default:
      trustpilotImage = "/images/trustpilot-en.png";
      eubusinessImage = "/images/eubusinessnews-en.png";
      break;
  }

  return (
    <div className="w-full flex justify-center bg-secondary text-primary-200 py-1 text-sm tracking-wide relative">
      {/* Befintligt innehåll i promotionsbannern */}
      {bannerContent.length > 0 && bannerContent[0]?.content?.html && (
        <div dangerouslySetInnerHTML={{ __html: bannerContent[0].content.html }} />
      )}

      <div className="flex items-center justify-center mt-0 max-w-screen-md mx-auto">
        {/* Trustpilot-bilden länkar till Trustpilot */}
        <a
          href="https://se.trustpilot.com/review/saveabl.se"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center ml-1 md:ml-6"
        >
          <Image
            src={trustpilotImage}  // Dynamisk bild baserat på språket
            alt="Trustpilot"
            width={250}
            height={30}
          />
        </a>

        {/* Lodrätt streck */}
        <div className="ml-2 mr-2 md:ml-4 md:mr-4 h-5 border-l border-white"></div>

        {/* Länktext som länkar till eubusinessnews - endast på dator */}
        <a
          href="https://www.eubusinessnews.com/winners/saveabl/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs md:text-[13px] mt-2 mb-2 text-white hover:underline transition-all font-sans hidden md:block"
        >
          {promotionText}
        </a>

        {/* Eubusinessnews-bilden - endast på mobil */}
        <a
          href="https://www.eubusinessnews.com/winners/saveabl/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center mr-2 mt-2 md:hidden"
        >
          <Image
            src={eubusinessImage}  // Dynamisk bild baserat på språket
            alt="Eubusiness News"
            width={250}
            height={30}
          />
        </a>

      </div>
    </div>
  );
};

export default PromotionBanner;
