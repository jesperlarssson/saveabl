"use client";

import { useRecipes } from "@/hooks/useRecipes";
import Slider from "../ui/Slider";
import RecipeTile from "../RecipeTile";
import SliderCards from "../ui/SliderCards";

interface RecipeDisplayProps {
  showThisWeek?: boolean;
  showNextWeek?: boolean;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({
  showThisWeek = true,
  showNextWeek = false,
}) => {
  const { thisWeek } = useRecipes();
  return (
    <SliderCards>
      {showThisWeek &&
        thisWeek.map((recipe) => (     
            <RecipeTile key={recipe.id} recipe={recipe} />
        ))}
    </SliderCards>
  );
};

export default RecipeDisplay;
