import { getLatestPromotionBanner } from "@/lib/hygraph";

const PromotionBanner = async () => {
  const bannerContent = (await getLatestPromotionBanner()) || [];

  return (
    <div
      className="w-full flex justify-center bg-secondary text-primary-200 py-1 text-sm tracking-wide relative"
      dangerouslySetInnerHTML={{ __html: bannerContent[0].content?.html }}
    />
  );
};

export default PromotionBanner;
