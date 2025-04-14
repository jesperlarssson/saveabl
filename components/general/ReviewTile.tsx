"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillStar, AiOutlineDown } from "react-icons/ai";
import Card from "../ui/Card";

interface ReviewTileProps {
  id: number;
  name: string;
  title: string;
  review: string;
  rating: number;
  url: string;
  equalHeight?: number;
  readMoreText: string;
  readLessText: string;
}

const ReviewTile: React.FC<ReviewTileProps> = ({
  name,
  title,
  review,
  rating,
  url,
  equalHeight,
  readMoreText,
  readLessText,
}) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const MAX_WORDS = 30;

  const words = review.split(" ");
  const isLong = words.length > MAX_WORDS;
  const shortReview = words.slice(0, MAX_WORDS).join(" ");
  const displayText = expanded || !isLong ? review : shortReview;

  const containerStyle: React.CSSProperties = expanded
    ? { height: "auto" }
    : equalHeight
    ? { height: `${equalHeight}px`, overflow: "hidden" }
    : {};

  return (
    <div style={{ ...containerStyle, transition: "height 0.3s ease" }}>
      <Card
        clickable
        onClick={() => router.push(url)}
        className="bg-primary-200 text-gray-900 bg-opacity-100 p-4"
      >
        <div>
          {/* Namn + stjärnor på samma rad */}
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm font-bold text-black">{name}</p>
            <div className="flex gap-[1px]">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  className={`text-lg ${
                    i < rating ? "text-[#00B67A]" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Titel */}
          <h3 className="text-xl font-semibold text-black mb-1">{title}</h3>

          {/* Recensionstext */}
          <p className="opacity-80">
            {displayText}
            {!expanded && isLong && "..."}
          </p>

          {/* Läs mer / Visa mindre + pil */}
          {isLong && (
            <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="group text-sm font-medium text-left mt-2 text-black flex items-center gap-1 hover:text-[#F4664A]"
          >
            {expanded ? readLessText : readMoreText}
            <AiOutlineDown
              className={`text-black transition-transform duration-300 translate-y-[1.5px] group-hover:text-[#F4664A] ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
          
          )}
        </div>
      </Card>
    </div>
  );
};

export default ReviewTile;
