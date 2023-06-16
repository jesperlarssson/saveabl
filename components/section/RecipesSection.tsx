import { getPaginatedRecipes } from "@/lib/hygraph";
import { Recipe } from "@/types";
import RecipeTile from "../RecipeTile";
import Card from "../ui/Card";
import Button from "../ui/Button";
import MoreRecipes from "./MoreRecipes";

interface RecipeSectionProps {
  limit: number;
  offset: number;
}

const getWeekNumber = (date: Date) => {
  const firstDayOfYear: any = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (((date as any) - firstDayOfYear) as any) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const RecipesSection: React.FC<RecipeSectionProps> = async ({
  limit,
  offset,
}) => {
  const today = new Date();
  const currentWeekNumber = getWeekNumber(today);
  const fetchedRecipes = (await getPaginatedRecipes(limit, offset)) || [];


  const recipesThisWeek = fetchedRecipes.filter((recipe: Recipe) => {
    if (recipe.startDate) {
      const recipeDate = new Date(recipe.startDate);
      return getWeekNumber(recipeDate) === currentWeekNumber;
    }
    return false;
  });

  const recipesNextWeek = fetchedRecipes.filter((recipe: Recipe) => {
    if (recipe.startDate) {
      const recipeDate = new Date(recipe.startDate);
      return getWeekNumber(recipeDate) + 1 === currentWeekNumber + 1;
    }
    return false;
  });

  const recipesEarlier = fetchedRecipes.filter((recipe: Recipe) => {
    if (recipe.startDate) {
      const recipeDate = new Date(recipe.startDate);

      //TODO: fix edge case new year
      return getWeekNumber(recipeDate) + 1 <= currentWeekNumber - 1;
    }
    return false;
  });

  return (
    <div>
      <Card className="text-gray-700">
        <h3 className=" font-poppins text-6xl text-primary">Denna vecka</h3>
        <div className="grid grid-cols-3 gap-8 pt-4">
          {recipesThisWeek.map((recipe: Recipe, index: number) => (
            <RecipeTile key={index} recipe={recipe} />
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-8 pt-4">
        {recipesEarlier.map((recipe: Recipe, index: number) => (
          <RecipeTile key={index} recipe={recipe} />
        ))}
      </div>

       <MoreRecipes />     
        
    </div>
  );
};

export default RecipesSection;
