"use client";
import React, { useEffect, useState } from 'react';
import { getLatestPromotionBanner } from '@/lib/hygraph';
import Image from 'next/image';

interface PromotionBannerItem {
  content?: {
    html?: string;
  };
}

const PromotionBanner = () => {
  const [bannerContent, setBannerContent] = useState<PromotionBannerItem[]>([]);

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

  return (
    <div className="w-full flex justify-center bg-secondary text-primary-200 py-1 text-sm tracking-wide relative">
      {/* Existing promotion banner content */}
      {bannerContent.length > 0 && bannerContent[0]?.content?.html && (
        <div dangerouslySetInnerHTML={{ __html: bannerContent[0].content.html }} />
      )}

      {/* Trustpilot image */}
      <div className="flex justify-center mt-0 max-w-screen-md mx-auto"> {/* Använd max-width och mx-auto för att centrera */}
      <a
          href="https://se.trustpilot.com/review/saveabl.se"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/trustpilot.png"
            alt="Trustpilot"
            width={200}  // Justera bredden för att göra bilden större
            height={30}  // Justera höjden för att göra bilden större
          />
        </a>
      </div>
    </div>
  );
};

export default PromotionBanner;



