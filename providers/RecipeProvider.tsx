"use client";

import React, { createContext, ReactNode } from "react";
import { Recipe } from "@/types";

/**
 * Neutral RecipeProvider – används bara för att hålla koden bakåtkompatibel.
 * Hämtning av recept sker nu i Recipes.tsx via /api/recipes/rolling.
 */

interface RecipeContextInterface {
  thisWeek: Recipe[];
  nextWeek: Recipe[];
  prior: Recipe[];
  fetchMorePrior: () => void;
  hasMore: boolean;
  loading: boolean;
}

export const RecipeContext = createContext<RecipeContextInterface>({
  thisWeek: [],
  nextWeek: [],
  prior: [],
  fetchMorePrior: () => {},
  hasMore: false,
  loading: false,
});

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider = ({ children }: RecipeProviderProps) => {
  // Tomt context – inga gamla API-anrop, men komponenter som använder det kraschar inte.
  const value = {
    thisWeek: [],
    nextWeek: [],
    prior: [],
    fetchMorePrior: () => {},
    hasMore: false,
    loading: false,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};
