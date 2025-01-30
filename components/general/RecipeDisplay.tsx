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
  onActiveIndexChange?: (index: number) => void;
  onRecipesCountChange?: (count: number) => void;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({
  showThisWeek = false,
  showNextWeek = true,
  summerBreak = false,
  onActiveIndexChange,
  onRecipesCountChange,
}) => {
  const { thisWeek, nextWeek } = useRecipes();
  const [displayRecipes, setDisplayRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    let selectedRecipes: Recipe[] = [];
    if (showThisWeek) {
      selectedRecipes = thisWeek;
    } else if (showNextWeek) {
      selectedRecipes = nextWeek.length > 2 ? nextWeek : thisWeek;
    } else if (summerBreak) {
      selectedRecipes = [];
    }

    setDisplayRecipes(selectedRecipes);
    setTimeout(() => setIsLoading(false), 500); // Förhindrar layout shift

  }, [thisWeek, nextWeek, showThisWeek, showNextWeek, summerBreak]);

  useEffect(() => {
    if (onRecipesCountChange) {
      onRecipesCountChange(displayRecipes.length);
    }
  }, [displayRecipes, onRecipesCountChange]);

  return (
    <div className="w-full min-h-[400px] flex justify-center items-center">
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-40 w-full rounded-lg"></div>
          ))}
        </div>
      ) : (
        <SliderCards onActiveIndexChange={onActiveIndexChange}>
          {displayRecipes.map((recipe) => (
            <RecipeTile key={recipe.id} recipe={recipe} className="min-h-[300px]" />
          ))}
        </SliderCards>
      )}
    </div>
  );
};

export default RecipeDisplay;
