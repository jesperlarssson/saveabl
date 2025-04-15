"use client";
import Image from "next/image";
import { Recipe } from "@/types";
import React, { useEffect, useState } from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";
import Grid from "../ui/Grid";
import CommentSection from "../section/CommentSection";
import { useLang } from "@/hooks/useLang";
import CommentForm from "./CommentForm";
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

export const getStars = (rating: number) => {
  const stars = [
    <BsStar key={0} />,
    <BsStar key={1} />,
    <BsStar key={2} />,
    <BsStar key={3} />,
    <BsStar key={4} />
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

  return stars.map((star, index) => (
    <div key={`star-${index}`}>{star}</div>
  ));
};

// 👇 Här är fallback-funktionen för kockbilder
const getChefImage = (name: string, image?: string) => {
  if (image && !image.includes("placeholder-chef")) return image;
  if (name.toLowerCase().includes("emil")) return "/images/emil_kock.png";
  if (name.toLowerCase().includes("anton")) return "/images/anton_kock.webp";
  return "/images/placeholder-chef.png";
};

interface RecipeLayoutProps {
  recipe: Recipe;
}

const RecipeLayout: React.FC<RecipeLayoutProps> = ({ recipe }) => {
  const { lang, text } = useLang();

  const [comments, setComments] = useState(recipe?.recipeComments || []);
  const handleNewComment = (comment: any) => {
    setComments((allComments) => [...allComments, comment]);
  };
  const [ratingSum, setRatingSum] = useState<number>(0);

  const getLocalizationIndex = (lang: string) => {
    switch (lang) {
      case 'da':
        return 1;
      case 'en':
        return 2;
      case 'sv':
      default:
        return 0;
    }
  };

  const [recept, setRecept] = useState({
    title: recipe?.title,
    image: recipe?.image?.url || "/images/placeholder.png",
    ingredients: recipe?.ingredients || [],
    steg: recipe?.steg || [],
    savedIngredients: recipe?.savedIngredients || "",
    nutritionalValues: recipe?.nutritionalValues || "",
    contentAllergies: recipe?.contentAllergies || "",
    recipeComments: recipe?.recipeComments || [],
    chef: {
      name: recipe?.chef?.name || "Okänd kock",
      image: recipe?.chef?.picture?.url || "/images/placeholder-chef.png"
    }
  });

  const calculateRating = () => {
    let sum = 0;
    if (comments.length > 0) {
      for (let index = 0; index < comments.length; index++) {
        const comment = comments[index];
        sum += comment.rating;
      }
      setRatingSum(sum / comments.length);
    } else {
      setRatingSum(0);
    }
  };

  useEffect(() => {
    const localizationIndex = getLocalizationIndex(lang);
    const temp = {
      title: recipe?.localizations[localizationIndex]?.title || recipe?.title,
      image: recipe?.image?.url || "/images/placeholder.png",
      ingredients: recipe?.localizations[localizationIndex]?.ingredients || recipe?.ingredients,
      steg: recipe?.localizations[localizationIndex]?.steg || recipe?.steg,
      savedIngredients: recipe?.localizations[localizationIndex]?.savedIngredients || recipe?.savedIngredients,
      nutritionalValues: recipe?.localizations[localizationIndex]?.nutritionalValues || recipe?.nutritionalValues,
      contentAllergies: recipe?.localizations[localizationIndex]?.contentAllergies || recipe?.contentAllergies,
      recipeComments: recipe?.recipeComments || [],
      chef: {
        name: recipe?.chef?.name || "Okänd kock",
        image: recipe?.chef?.picture?.url || "/images/placeholder-chef.png"
      }
    };
    setRecept(temp);
    calculateRating();
  }, [lang, recipe]);

  if (recipe?.deprecated) {
    return <Section className="w-full">Detta är ett gammalt recept</Section>;
  }

  return (
    <Section className="w-full">
      <Card className="my-0 text-secondary relative">
        <div className="grid grid-cols-4 gap-8 relative">
          <div className="col-span-4 sm:col-span-1 drop-shadow-md overflow-hidden rounded-lg relative mb-2">
            <Image
              src={recept.image}
              alt={recept.title}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="col-span-4 sm:col-span-3 flex flex-col justify-end gap-2 relative">
            <div className="flex items-center gap-2 mt-0">
              <Image
                src={getChefImage(recept.chef.name, recept.chef.image)}
                alt={`Chef ${recept.chef.name}`}
                width={120}
                height={120}
                className="rounded-full"
                sizes="(max-width: 120px) 100vw, 120px"
                quality={100}
              />
              <h3 className="text-secondary font-poppins text-xl">
                {recept.chef.name}
              </h3>
            </div>

            <div className="flex items-center mt-2">
              {getStars(ratingSum)}
            </div>

            <h2 className="font-poppins text-secondary text-2xl sm:text-4xl">
              {recept.title}
            </h2>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              document.querySelector("#comment-form")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Image
              src="/images/comment_recipe.png"
              alt="Comment Recipe"
              width={32}
              height={32}
            />
            <span className="ml-2 text-[#6E2936] hover:underline">
              {text.recipe_slug.comment}
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  text: `${text.recipe_slug.share_message}\n\n${recept.title}\n\n${window.location.href}`,
                });
              }
            }}
          >
            <Image
              src="/images/share_recipe.png"
              alt="Share Recipe"
              width={32}
              height={32}
            />
            <span className="ml-2 text-[#6E2936] hover:underline">
              {text.recipe_slug.share}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8 mt-4">
          <div className="col-span-4 sm:col-span-1">
            <h3 className="font-poppins text-xl">{text.recipe_slug.contains}</h3>
            <ul className="text-gray-700">
              {recept.ingredients.length > 0 ? (
                recept.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <p>{ingredient}</p>
                  </li>
                ))
              ) : (
                <li>{text.recipe_slug.no_steps}</li>
              )}
            </ul>
          </div>
          <div className="col-span-4 sm:col-span-3 relative">
            <h3 className="font-poppins text-xl">{text.recipe_slug.how_to}</h3>
            <ul className="text-gray-700">
              {recept.steg.length > 0 ? (
                recept.steg.map((steg, index) => (
                  <li className="my-4 flex gap-2" key={index}>
                    <span className="font-bold">{`${index + 1}.`}</span>
                    <p>{steg}</p>
                  </li>
                ))
              ) : (
                <li>{text.recipe_slug.no_ingredients}</li>
              )}
            </ul>
          </div>
        </div>
      </Card>

      <Grid>
        <Card>
          <h3 className="text-secondary font-poppins">
            {text.recipe_slug.saved_ingredients}
          </h3>
          <p className="text-gray-700">{recept.savedIngredients}</p>
        </Card>
        <Card>
          <h3 className="text-secondary font-poppins">
            {text.recipe_slug.nutrients}
          </h3>
          <p className="text-gray-700">{recept.nutritionalValues}</p>
        </Card>
        <Card>
          <h3 className="text-secondary font-poppins">
            {text.recipe_slug.ingredients}
          </h3>
          <p className="text-gray-700">{recept.contentAllergies}</p>
        </Card>
      </Grid>

      <div id="comment-section">
        {comments.length > 0 && <CommentSection comments={comments} />}
      </div>

      <div id="comment-form">
        <CommentForm recipeId={recipe.id || ''} onNewComment={handleNewComment} />
      </div>
    </Section>
  );
};

export default RecipeLayout;
