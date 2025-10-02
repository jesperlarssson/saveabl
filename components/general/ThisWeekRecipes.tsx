"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

import { Recipe } from "@/types";
import Grid from "../ui/Grid";
import RecipeTile from "../RecipeTile";
import { useRecipes } from "@/hooks/useRecipes";

interface ThisWeekRecipesProps {
  fullWidth?: boolean;
  recipes?: Recipe[]; // 👈 nytt, valfritt
}

const ThisWeekRecipes: React.FC<ThisWeekRecipesProps> = ({ fullWidth, recipes }) => {
  const { thisWeek } = useRecipes();

  // Använd antingen inkommande recipes (om de finns) eller hämta som innan
  const source = recipes ?? thisWeek;

  // Sortera recepten i rätt ordning: dag 1 → dag 3
  const sortedThisWeek = [...source].sort(
    (a, b) => (a.recipeNumber || 0) - (b.recipeNumber || 0)
  );

  return (
    source.length > 2 && (
      <Grid className={twMerge(`gap-8 pt-4`, fullWidth && "gap-0 pt-0")}>
        {sortedThisWeek.map((recipe: Recipe, index: number) => (
          <RecipeTile fullWidth={fullWidth} key={index} recipe={recipe} />
        ))}
      </Grid>
    )
  );
};

export default ThisWeekRecipes;
