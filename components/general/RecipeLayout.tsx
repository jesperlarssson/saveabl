import Image from "next/image";

import { Recipe } from "@/types";
import React from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";
import Grid from "../ui/Grid";
import ThisWeekRecipes from "./ThisWeekRecipes";
import CommentSection from "../section/CommentSection";
import RatingButton from "../ui/RatingButton";

interface RecipeLayoutProps {
  recipe: Recipe;
}

const RecipeLayout: React.FC<RecipeLayoutProps> = ({ recipe }) => {
  if (recipe?.deprecated) {
    return <Section className="w-full">Detta är ett gammalt recept</Section>;
  }
  return (
    <Section className="w-full">
      <Card className="my-0 text-secondary">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1 drop-shadow-md overflow-hidden rounded-lg w-full h-72">
            <Image
              src={recipe?.image?.url || "/images/placeholder.png"}
              alt={recipe?.title}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="col-span-3 flex flex-col justify-end gap-2">
            <RatingButton recipeId={recipe?.id} />
            <h2 className="  font-poppins text-secondary text-4xl">
              {recipe?.title}
            </h2>
          </div>

          <div>
            <h3 className="font-poppins text-xl">Innehåll</h3>
            <ul className="text-gray-700">
              {recipe?.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <p>{ingredient}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-3">
            <h3 className="font-poppins text-xl">Gör så här</h3>
            <ul className="text-gray-700">
              {recipe?.steg.map((steg, index) => (
                <li className="my-4 flex gap-2" key={index}>
                  <span className=" font-bold">{`${index + 1}.`}</span>
                  <p>{steg}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <Grid>
        <Card>
          <h3 className="text-secondary font-poppins">
            Räddade varor i receptet
          </h3>
          <p className="text-gray-700">{recipe?.savedIngredients}</p>
        </Card>
        <Card>
          <h3 className="text-secondary font-poppins">Näringsvärden</h3>
          <p className="text-gray-700">{recipe?.nutritionalValues}</p>
        </Card>
        <Card>
          <h3 className="text-secondary font-poppins">Innehåll & allergener</h3>
          <p className="text-gray-700">{recipe?.contentAllergies}</p>
        </Card>

        {/* <Card className="text-secondary font-poppins">
          {recipe.freezabl ? (
            <p>Detta recept går bra att frysa</p>
          ) : (
            <p>Frys helst inte detta.</p>
          )}
        </Card> */}
      </Grid>
      <CommentSection />
    </Section>
  );
};

export default RecipeLayout;
