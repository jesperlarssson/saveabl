import React, { useState, FormEvent } from "react";
import axios from "axios";
import Button from "../ui/Button";
import { twMerge } from "tailwind-merge";

interface CommentFormProps {
  recipeId: string;
  onNewComment: (comment: any) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  recipeId,
  onNewComment,
}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [nameError, setNameError] = useState("");
  const [commentError, setCommentError] = useState("");

  const stars = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(-1);
  const [hoveredRating, setHoveredRating] = useState(-1);
  const [ratingError, setRatingError] = useState<string>();

  const validateForm = () => {
    let isValid = true;
    if (!name) {
      setNameError("Ange ditt namn");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!comment) {
      setCommentError("Skriv in din kommentar");
      isValid = false;
    } else {
      setCommentError("");
    }

    if (rating === -1) {
      setRatingError("Du måste ange ett betyg");
      isValid = false;
    } else {
      setRatingError("");
    }

    return isValid;
  };

  const onSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/comment/recipe", {
        name,
        rating: rating + 1,
        comment,
        recipeId,
      });

      onNewComment({
        name,
        rating: rating + 1,
        comment,
        recipeId,
        id: response.data.id,
      });
      setLoading(false);
      setRating(-1);
      setName("");
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={onSubmitComment} className="p-4 flex flex-col">
        <label className="mt-4 text-dark font-open-sans text-secondary text-xl font-bold mb-2">Namn</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={twMerge(
            `w-full border col-span-2 border-primary bg-transparent p-2 rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none focus:border-secondary focus:ring-1 
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-accent invalid:text-accent
          focus:invalid:border-accent focus:invalid:ring-accent`,
            [nameError && "border-red-500"]
          )}
        />
        {nameError && (
          <span className="text-red-500 font-open-sans text-sm">
            {nameError}
          </span>
        )}

        <div className="flex w-36 justify-between items-center  text-xl mt-8">
          <span className="font-bold text-secondary mr-2">Betyg:</span>
          {stars.map((star, index) => (
            <div key={star}>
              <svg
                onClick={() => setRating(index)}
                onMouseEnter={() => setHoveredRating(index)}
                onMouseLeave={() => setHoveredRating(-1)}
                className={`fill-current text-star cursor-pointer ${
                  hoveredRating >= index ? "text-gray-400" : " text-yellow-500"
                }`}
                height="1.1em"
                width="1.1em"
                viewBox="0 0 16 16"
              >
                <path
                  className={`${
                    hoveredRating < index ? "text-yellow-800" : ""
                  }`}
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 00-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L1.71 6.745l4.052-.576a.525.525 0 00.393-.288l1.847-3.658 1.846 3.658a.525.525 0 00.393.288l4.052.575-2.906 2.77a.564.564 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z"
                ></path>
                <path
                  className={`${rating < index ? "opacity-0" : "opacity-100"}`}
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                ></path>
              </svg>
            </div>
          ))}
        </div>
        {ratingError && (
          <span className="text-red-500 font-open-sans text-sm">
            {ratingError}
          </span>
        )}

        <label className="mt-8 text-secondary text-xl font-bold font-open-sans mb-2">Kommentar</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={twMerge(
            `w-full border col-span-2 border-primary bg-transparent p-2 rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none focus:border-secondary focus:ring-1 
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-accent invalid:text-accent
          focus:invalid:border-accent focus:invalid:ring-accent`,
            
          )}
        ></textarea>
        {commentError && (
          <span className="text-red-500 font-open-sans text-sm">
            {commentError}
          </span>
        )}

        <Button className="max-w-xs mt-8" type="submit">
          Kommentera
        </Button>
      </form>

      {/* ... loading overlay if needed ... */}
    </div>
  );
};

export default CommentForm;
