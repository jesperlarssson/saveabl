"use client";

import { use, useEffect, useState } from "react";

import { useRecipes } from "@/hooks/useRecipes";
import Slider from "../ui/Slider";
import RecipeTile from "../RecipeTile";
import SliderCards from "../ui/SliderCards";
import { Recipe } from "@/types";

interface RecipeDisplayProps {
  showThisWeek?: boolean;
  showNextWeek?: boolean;
  summerBreak?: boolean;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({
  showThisWeek = false,
  showNextWeek = true,
  summerBreak = false,
}) => {
  const { thisWeek, nextWeek } = useRecipes();
  const [displayRecipes, setDisplayRecipes] = useState<Recipe[]>(
    nextWeek.length > 2 ? nextWeek : thisWeek
  );

  useEffect(() => {
    if (showThisWeek) {
      setDisplayRecipes(thisWeek);
    } else if (showNextWeek) {
      setDisplayRecipes(nextWeek.length > 2 ? nextWeek : thisWeek);
    } else if (summerBreak) {
      setDisplayRecipes([]);
    }
  }, [thisWeek, nextWeek]);

  return (
    <SliderCards>
      {displayRecipes.map((recipe) => (
        <RecipeTile key={recipe.id} recipe={recipe} />
      ))}
    </SliderCards>
  );
};

export default RecipeDisplay;
