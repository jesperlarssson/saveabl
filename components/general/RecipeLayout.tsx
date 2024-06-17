"use client";
import Image from "next/image";

import { Recipe } from "@/types";
import React, { useEffect, useState } from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";
import Grid from "../ui/Grid";
import ThisWeekRecipes from "./ThisWeekRecipes";
import CommentSection from "../section/CommentSection";
import RatingButton from "../ui/RatingButton";
import { useLang } from "@/hooks/useLang";
import CommentForm from "./CommentForm";
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

export const getStars = (rating: number) => {
  const stars = [<BsStar key={0} />, <BsStar key={1} />, <BsStar key={2} />, <BsStar key={3} />, <BsStar key={4} />];

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

  const [recept, setRecept] = useState({
    title: lang != "sv" ? recipe?.title : recipe?.localizations[0].title,
    image: recipe?.image?.url || "/images/placeholder.png",
    ingredients:
      lang != "sv" ? recipe?.ingredients : recipe?.localizations[0].ingredients,
    steg: lang != "sv" ? recipe?.steg : recipe?.localizations[0].steg,
    savedIngredients:
      lang != "sv"
        ? recipe?.savedIngredients
        : recipe?.localizations[0].savedIngredients,
    nutritionalValues:
      lang != "sv"
        ? recipe?.nutritionalValues
        : recipe?.localizations[0].nutritionalValues,
    contentAllergies:
      lang != "sv"
        ? recipe?.contentAllergies
        : recipe?.localizations[0].contentAllergies,
    recipeComments: recipe?.recipeComments,
  });

  const calculateRating = () => {
    var sum = 0;
    for (let index = 0; index < comments.length; index++) {
      const comment = comments[index];
      sum += comment.rating;
    }
    setRatingSum(sum / comments.length);
  };

  useEffect(() => {
    const temp = {
      title: lang != "sv" ? recipe?.title : recipe?.localizations[0].title,
      image: recipe?.image?.url || "/images/placeholder.png",
      ingredients:
        lang != "sv"
          ? recipe?.ingredients
          : recipe?.localizations[0].ingredients,
      steg: lang != "sv" ? recipe?.steg : recipe?.localizations[0].steg,
      savedIngredients:
        lang != "sv"
          ? recipe?.savedIngredients
          : recipe?.localizations[0].savedIngredients,
      nutritionalValues:
        lang != "sv"
          ? recipe?.nutritionalValues
          : recipe?.localizations[0].nutritionalValues,
      contentAllergies:
        lang != "sv"
          ? recipe?.contentAllergies
          : recipe?.localizations[0].contentAllergies,
      recipeComments: recipe?.recipeComments,
    };
    setRecept(temp);
    calculateRating();
  }, [lang, recipe]);

  if (recipe?.deprecated) {
    return <Section className="w-full">Detta är ett gammalt recept</Section>;
  }

  return (
    <Section className="w-full">
      <Card className="my-0 text-secondary">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-4 sm:col-span-1 drop-shadow-md overflow-hidden rounded-lg w-full h-72">
            <Image
              src={recipe?.image?.url || "/images/placeholder.png"}
              alt={recept.title}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="col-span-4 sm:col-span-3 flex flex-col justify-end gap-2">
            {/* <RatingButton recipeId={recipe?.id} /> */}
            <div className="flex mt-2 text-star">
              {ratingSum > 1 && getStars(ratingSum)}
            </div>
            <h2 className="  font-poppins text-secondary text-2xl sm:text-4xl">
              {recept.title}
            </h2>
          </div>

          <div className="col-span-4 sm:col-span-1">
            <h3 className="font-poppins text-xl">
              {text.recipe_slug.contains}
            </h3>
            <ul className="text-gray-700">
              {recept.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <p>{ingredient}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 sm:col-span-3">
            <h3 className="font-poppins text-xl">{text.recipe_slug.how_to}</h3>
            <ul className="text-gray-700">
              {recept.steg.map((steg, index) => (
                <li className="my-4 flex gap-2" key={index}>
                  <span className=" font-bold">{`${index + 1}.`}</span>
                  <p>{steg}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="absolute top-0 right-0 mt-1 mr-12 w-40 h-40 rounded-full overflow-hidden shadow-lg" style={{ border: '2px solid #EECFAA' }}>
          <Image
            src="/images/emil_kock.png"
            alt="Chef"
            className="object-cover w-full h-full"
            width={400}
            height={400}
          />
        </div>
        <div className="absolute top-36 right-0 mt-1 mr-12 w-40 h-10">
            <Image
              src="/images/emil_recept.png"
              alt="Emil Petzen"
              className="object-cover w-full h-full"
              width={200}
              height={50}
            />
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

        {/* <Card className="text-secondary font-poppins">
          {recipe.freezabl ? (
            <p>Detta recept går bra att frysa</p>
          ) : (
            <p>Frys helst inte detta.</p>
          )}
        </Card> */}
      </Grid>
      {comments.length > 0 && <CommentSection comments={comments} />}
      <CommentForm recipeId={recipe.id} onNewComment={handleNewComment} />
    </Section>
  );
};

export default RecipeLayout;
