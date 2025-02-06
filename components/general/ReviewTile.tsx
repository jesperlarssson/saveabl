"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AiFillStar } from "react-icons/ai"; // Importera stjärnikonen
import Card from "../ui/Card";

interface ReviewTileProps {
  id: number;
  name: string;
  title: string;
  review: string;
  rating: number;
  url: string;
}

const ReviewTile: React.FC<ReviewTileProps> = ({
  id,
  name,
  title,
  review,
  rating,
  url,
}) => {
  const router = useRouter();

  return (
    <div className="relative">
      <Card
        clickable
        onClick={() => router.push(url)}
        className="bg-primary-200 text-gray-900 bg-opacity-100 flex flex-col gap-2 relative z-10 p-4"
      >
        {/* Stjärnor + Namn på samma rad */}
<div className="flex items-center gap-2">
  <p className="text-sm font-bold text-[#000000]">{name}</p>
  <div className="flex gap-[1px]">
    {[...Array(5)].map((_, i) => (
      <AiFillStar key={i} className="text-[#00B67A] text-lg" />
    ))}
  </div>
</div>

        {/* Titel */}
        <h3 className="font-poppins text-xl text-[#000000] font-semibold">{title}</h3>

        {/* Recension */}
        <p className="opacity-80">{review}</p>
      </Card>
    </div>
  );
};

export default ReviewTile;
