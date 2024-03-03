import React from "react";

import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import Card from "../ui/Card";

export const getStars = (rating: number) => {
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

  return stars.map((star, index) => <div key={`star-${index}`}>{star}</div>);
};

interface CommentSectionProps {
  comments: any[] | null;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  if (!comments) return null;
  return (
    <div className="border-t border-primary border-opacity-50 py-20 text-secondary">
      <h2 className="text-2xl font-bold mb-10 ">Kommentarer</h2>
      <div>
        {comments?.map((comment) => {
          return (
            <div key={comment.id} className="mb-10">
              <Card className="text-secondary">
                <span className="flex text-sm text-star mb-2">
                  {getStars(comment.rating)}
                </span>
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-bold">{comment.name}:</h3>
                </div>
                <p className="text-lg text-gray-700">{comment.comment}</p>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;
