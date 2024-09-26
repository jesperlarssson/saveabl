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
  const { lang } = useLang();  // Hämta det aktuella språket

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
  }, []);

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

      {/* Dynamisk Trustpilot-bild */}
      <div className="flex justify-center mt-0 max-w-screen-md mx-auto">
        <a
          href="https://se.trustpilot.com/review/saveabl.se"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={trustpilotImage}  // Dynamisk bild baserat på språket
            alt="Trustpilot"
            width={250}  // Justera bredden för att göra bilden större
            height={30}  // Justera höjden för att göra bilden större
          />
        </a>
      </div>
    </div>
  );
};

export default PromotionBanner;



