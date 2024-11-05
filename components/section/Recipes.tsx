"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { Recipe } from "@/types";
import Grid from "../ui/Grid";
import RecipeTile from "../RecipeTile";
import Button from "../ui/Button";
import { getDateForPriorRecipes } from "@/helpers/format";
import ThisWeekRecipes from "../general/ThisWeekRecipes";
import { useRecipes } from "@/hooks/useRecipes";
import { useLang } from "@/hooks/useLang";
import Title from "../ui/Title";

const Recipes = () => {
  const { text } = useLang();
  const { nextWeek, prior, fetchMorePrior, hasMore, loading } = useRecipes();

  const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null);
  const [clickedFetchMore, setClickedFetchMore] = useState(false);
  const [previousPriorLength, setPreviousPriorLength] = useState(prior.length);

  useEffect(() => {
    console.log("clickedFetchMore:", clickedFetchMore);
    console.log("prior.length:", prior.length);
    console.log("previousPriorLength:", previousPriorLength);

    if (clickedFetchMore && loadMoreButtonRef.current && prior.length > previousPriorLength) {
      console.log("Skrollar till knappen...");
      loadMoreButtonRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setClickedFetchMore(false);
    }

    setPreviousPriorLength(prior.length); // Uppdatera endast efter skrollning
  }, [prior.length, clickedFetchMore]);

  const handleFetchMoreClick = () => {
    console.log("Fetch More-knappen klickades");
    setClickedFetchMore(true);
    fetchMorePrior();
  };

  return (
    <>
      <Title>{text.recipes.title}</Title>
      <div className="my-10 min-h-screen">
        <Grid className="">
          <div className="relative p-4 pt-0 mt-0 min-h-96 scale-103 col-span-3 border-0 border-primary border-opacity-50 rounded-2xl "> 
            <h3 className=" font-poppins text-3xl text-primary">
              {text.recipes.this_week}
            </h3>
            <ThisWeekRecipes />
          </div>

          {nextWeek.length > 2 && (
            <div className="col-span-3">
              <h3 className="font-poppins text-3xl text-primary mt-4">
                {text.recipes.next_week}
              </h3>
              <Grid className=" gap-8 pt-4">
                {loading ? (
                  <>
                    <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
                    <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
                    <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
                  </>
                ) : (
                  nextWeek.map((recipe: Recipe, index: number) => (
                    <RecipeTile key={index} recipe={recipe} />
                  ))
                )}
              </Grid>
            </div>
          )}

          <div className="w-full border-b col-span-1 md:col-span-3 border-primary-500 border-opacity-50"></div>

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
            <div className="col-span-3">
              <Grid className=" gap-8 pt-4">
                {prior.map((recipe: Recipe) => (
                  <div key={recipe.id} className="w-full">
                    <RecipeTile recipe={recipe} />
                  </div>
                ))}
              </Grid>
            </div>
          )}
        </Grid>

        <div className="flex justify-center">
          <Button
            ref={loadMoreButtonRef}
            className="mt-24 max-w-xl mx-auto w-full"
            disabled={!hasMore || loading}
            onClick={handleFetchMoreClick}
          >
            {!loading ? (
              text.recipes.older_recipes
            ) : (
              <div role="status" className=" w-full flex justify-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200 animate-spin fill-primary"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Recipes;

