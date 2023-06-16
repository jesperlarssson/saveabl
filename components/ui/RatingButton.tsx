"use client";

import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

import { toast } from "react-hot-toast";

interface RatingButtonProps {
  recipeId: string;
}

const RatingButton: React.FC<RatingButtonProps> = ({ recipeId }) => {
  const handleClick = () => {
    toast.error("Denna funtion kommer att implementeras snart");
  };

  const getStars = (rating: number) => {
    const stars = [
      <BsStar key={1} />,
      <BsStar key={2} />,
      <BsStar key={3} />,
      <BsStar key={4} />,
      <BsStar key={5} />,
    ];

    for (let index = 0; index < stars.length; index++) {
      if (index <= rating - 1) {
        stars[index] = <BsStarFill />;
      }
      if (rating - 1 - index <= 0.65 && rating - 1 - index >= 0.2) {
        stars[index + 1] = <BsStarHalf />;
      } else if (rating - 1 - index >= 0.65) {
        stars[index + 1] = <BsStarFill />;
      }
    }

    return stars.map((star, index) => <div className="text-accent" key={`star-${index}`}>{star}</div>);
  };

  return (
    <button
      onClick={handleClick}
      className="max-w-fit px-4 py-2 rounded-md border-secondary hover:bg-primary-200 transition-all hover:drop-shadow-md"
    >
      <div className="flex items-center gap-2">
        {getStars(4)}{" "}
        <div className="p-2 h-6 w-6 flex items-center justify-center rounded-full bg-primary">
          3
        </div>
      </div>
    </button>
  );
};

export default RatingButton;
