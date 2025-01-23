"use client";

import { useEffect, useState } from "react";
import { useRecipes } from "@/hooks/useRecipes";
import SliderCards from "../ui/SliderCards";
import RecipeTile from "../RecipeTile";
import { Recipe } from "@/types";

interface RecipeDisplayProps {
  showThisWeek?: boolean;
  showNextWeek?: boolean;
  summerBreak?: boolean;
  onActiveIndexChange?: (index: number) => void; // Callback för aktivt index
  onRecipesCountChange?: (count: number) => void; // Callback för antal recept
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({
  showThisWeek = false,
  showNextWeek = true,
  summerBreak = false,
  onActiveIndexChange, // Tar emot callback för aktivt index
  onRecipesCountChange, // Tar emot callback för antal recept
}) => {
  const { thisWeek, nextWeek } = useRecipes();
  const [displayRecipes, setDisplayRecipes] = useState<Recipe[]>(
    nextWeek.length > 2 ? nextWeek : thisWeek
  );

  // Uppdatera displayRecipes baserat på props
  useEffect(() => {
    if (showThisWeek) {
      setDisplayRecipes(thisWeek);
    } else if (showNextWeek) {
      setDisplayRecipes(nextWeek.length > 2 ? nextWeek : thisWeek);
    } else if (summerBreak) {
      setDisplayRecipes([]);
    }
  }, [thisWeek, nextWeek, showThisWeek, showNextWeek, summerBreak]);

  // Skicka antal recept till parent (Hero)
  useEffect(() => {
    if (onRecipesCountChange) {
      onRecipesCountChange(displayRecipes.length); // Meddela antal recept
    }
  }, [displayRecipes, onRecipesCountChange]);

  return (
    <SliderCards onActiveIndexChange={onActiveIndexChange}>
      {displayRecipes.map((recipe) => (
        <RecipeTile key={recipe.id} recipe={recipe} />
      ))}
    </SliderCards>
  );
};

export default RecipeDisplay;
