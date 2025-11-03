"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { Recipe } from "@/types";
import Grid from "../ui/Grid";
import RecipeTile from "../RecipeTile";

interface ThisWeekRecipesProps {
  fullWidth?: boolean;
  recipes: Recipe[];
}

const ThisWeekRecipes: React.FC<ThisWeekRecipesProps> = ({ fullWidth, recipes }) => {
  if (!recipes || recipes.length === 0) return null;

  // Sortera recepten i rätt ordning: dag 1 → dag 3
  const sortedThisWeek = [...recipes].sort(
    (a, b) => (a.recipeNumber || 0) - (b.recipeNumber || 0)
  );

  return (
    <Grid className={twMerge(`gap-8 pt-4`, fullWidth && "gap-0 pt-0")}>
      {sortedThisWeek.map((recipe: Recipe, index: number) => (
        <RecipeTile fullWidth={fullWidth} key={index} recipe={recipe} />
      ))}
    </Grid>
  );
};

export default ThisWeekRecipes;
