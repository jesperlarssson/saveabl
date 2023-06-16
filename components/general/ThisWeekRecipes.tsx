"use client";

import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Recipe } from "@/types";
import Grid from "../ui/Grid";
import RecipeTile from "../RecipeTile";

interface ThisWeekRecipesProps {
  fullWidth?: boolean;
}

const ThisWeekRecipes: React.FC<ThisWeekRecipesProps> = ({ fullWidth }) => {
  const [recipeThisWeek, setRecipeThisWeek] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getThisWeeksRecipes = async () => {
      try {
        const res = await fetch("/api/recipes/this-week", {
          method: "GET",
        });
        const data = await res.json();
        console.log(data);
        setRecipeThisWeek(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getThisWeeksRecipes();
  }, []);

  return (
    recipeThisWeek.length > 2 && (
      <Grid className={twMerge(`gap-8 pt-4`, fullWidth && "gap-0 pt-0")}>
        {loading ? (
          <>
            <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
            <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
            <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
          </>
        ) : (
          recipeThisWeek.map((recipe: Recipe, index: number) => (
            <RecipeTile fullWidth={fullWidth} key={index} recipe={recipe} />
          ))
        )}
      </Grid>
    )
  );
};

export default ThisWeekRecipes;
