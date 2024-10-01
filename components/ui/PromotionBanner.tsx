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

  // Bestäm Trustpilot-bilden baserat på språkkoden
  let trustpilotImage = "/images/trustpilot-en.png"; // Standardbild om inget språk matchar

  switch (lang) {
    case 'sv':
      trustpilotImage = "/images/trustpilot-sv.png";
      break;
    case 'da':
      trustpilotImage = "/images/trustpilot-da.png";
      break;
    case 'en':
    default:
      trustpilotImage = "/images/trustpilot-en.png";
      break;
  }

  return (
    <div className="w-full flex justify-center bg-secondary text-primary-200 py-1 text-sm tracking-wide relative">
      {/* Befintligt innehåll i promotionsbannern */}
      {bannerContent.length > 0 && bannerContent[0]?.content?.html && (
        <div dangerouslySetInnerHTML={{ __html: bannerContent[0].content.html }} />
      )}

      {/* Dynamisk Trustpilot-bild och promotionText */}
      <div className="flex items-center justify-center mt-0 max-w-screen-md mx-auto">
        {/* Trustpilot-bilden länkar till Trustpilot */}
        <a
          href="https://se.trustpilot.com/review/saveabl.se"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center ml-3"
        >
          <Image
            src={trustpilotImage}  // Dynamisk bild baserat på språket
            alt="Trustpilot"
            width={250}  // Justera bredden
            height={30}  // Justera höjden
          />
        </a>
        {/* Lodrätt streck */}
        <div className="ml-2 mr-2 h-5 border-l border-white border-primary-200"></div>
        {/* Länktext som länkar till eubusinessnews */}
        <a
          href="https://www.eubusinessnews.com/winners/saveabl/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs mt-2 mb-2 text-white text-primary-200 hover:underline transition-all font-sans"  // Mindre text med hover-effekt
        >
          {promotionText}
        </a>
      </div>
    </div>
  );
};

export default PromotionBanner;

