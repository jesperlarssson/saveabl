"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { Recipe } from "@/types";
import Grid from "../ui/Grid";
import RecipeTile from "../RecipeTile";
import Button from "../ui/Button";
import { getDateForPriorRecipes } from "@/helpers/format";
import ThisWeekRecipes from "../general/ThisWeekRecipes";

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeNextWeek, setRecipeNextWeek] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMoreRecipes = async () => {
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify({
          limit: 3,
          offset: recipes.length,
          endDate: getDateForPriorRecipes(),
        }),
      });
      const data = await res.json();
      setRecipes([...recipes, ...data]);
    } catch (error) {
      toast.error("Kunde inte hämta recept");
    }
  };

  useEffect(() => {
    const getNextWeeksRecipes = async () => {
      try {
        const res = await fetch("/api/recipes/next-week", {
          method: "GET",
        });
        const data = await res.json();
        console.log(data);
        setRecipeNextWeek(data);
      } catch (error) {
        toast.error("Kunde inte hämta nästa veckas recept");
      }
    };
    getNextWeeksRecipes();

    const getRecipes = async () => {
      try {
        const res = await fetch("/api/recipes", {
          method: "POST",
          body: JSON.stringify({
            limit: 3,
            offset: 0,
            endDate: getDateForPriorRecipes(),
          }),
        });
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        toast.error("Kunde inte hämta recept");
      } finally {
        setLoading(false);
      }
    };
    getRecipes();
  }, []);

  return (
    <div className="my-10 min-h-screen">
      <Grid className="">
        <div className="relative p-4 pt-8 mt-8 min-h-96 scale-103 col-span-3 border-2 border-primary border-opacity-50 rounded-2xl ">
          <h3 className=" absolute bg-primary-200 px-4 -top-8 font-poppins text-6xl text-primary">
            Denna vecka
          </h3>
          <ThisWeekRecipes />
        </div>

        {recipeNextWeek.length > 2 && (
          <div className="col-span-3">
            <h3 className="font-poppins text-6xl text-primary">Nästa vecka</h3>
            <Grid className=" gap-8 pt-4">
              {loading ? (
                <>
                  <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
                  <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
                  <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
                </>
              ) : (
                recipeNextWeek.map((recipe: Recipe, index: number) => (
                  <RecipeTile key={index} recipe={recipe} />
                ))
              )}
            </Grid>
          </div>
        )}
        {loading ? (
          <>
            <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
            <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
            <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
            <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
            <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
            <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
          </>
        ) : (
          recipes.map((recipe: Recipe) => {
            return <RecipeTile key={recipe.id} recipe={recipe} />;
          })
        )}
      </Grid>
      <Button onClick={fetchMoreRecipes}>Hämta äldre recept</Button>
    </div>
  );
};

export default Recipes;
