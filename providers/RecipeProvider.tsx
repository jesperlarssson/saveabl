"use client";

import React, { useEffect, useState, createContext, ReactNode } from "react";
import { Recipe } from "@/types";
import { getDateForPriorRecipes } from "@/helpers/format";
import toast from "react-hot-toast";

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
  fetchMorePrior: () => {
    throw new Error("RecipeProvider not ready");
  },
  hasMore: true,
  loading: true,
});

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider = ({ children }: RecipeProviderProps) => {
  const [thisWeek, setThisWeek] = useState<Recipe[]>([]);
  const [nextWeek, setNextWeek] = useState<Recipe[]>([]);
  const [prior, setPrior] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [deprecatedHasMore, setDeprecatedHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    const getNextWeeksRecipes = async () => {
      try {
        const res = await fetch("/api/recipes/next-week", {
          method: "GET",
        });
        const data = await res.json();
        console.log(data);
        setNextWeek(data);
      } catch (error) {}
    };
    getNextWeeksRecipes();

    const getThisWeeksRecipes = async () => {
      try {
        const res = await fetch("/api/recipes/this-week", {
          method: "GET",
        });
        const data = await res.json();
        setThisWeek(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getThisWeeksRecipes();

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
        setPrior(data);
      } catch (error) {
        toast.error("Kunde inte hämta recept");
      } finally {
        setLoading(false);
      }
    };
    getRecipes();
  }, []);

  const fetchMorePrior = async () => {
    if (loadingMore) return;
    if (hasMore) {
      try {
        setLoadingMore(true);
        const res = await fetch("/api/recipes", {
          method: "POST",
          body: JSON.stringify({
            limit: 3,
            offset: prior.length,
            endDate: getDateForPriorRecipes(),
          }),
        });
        const data = await res.json();
        setPrior([...prior, ...data]);
        setHasMore(data.length === 3);
      } catch (error) {
        toast.error("Kunde inte hämta recept");
      } finally {
        setLoadingMore(false);
        return;
      }
    }
    if (deprecatedHasMore && !hasMore) {
      //Fetch deprecated version of recipes
      try {
        setLoadingMore(true);
        const res = await fetch("/api/recipes/deprecated", {
          method: "POST",
          body: JSON.stringify({
            limit: 3,
            offset: prior.length,
          }),
        });
        const data = await res.json();
        const deprecatedRecipes = data.map((recipe: any) => ({
          ...recipe,
          deprecated: true,
        }));
        setPrior([...prior, ...deprecatedRecipes]);
        setDeprecatedHasMore(data.length === 3);
      } catch (error) {
        toast.error("Kunde inte hämta recept");
      } finally {
        setLoadingMore(false);
        return;
      }
    }
  };

  const value = {
    thisWeek,
    nextWeek,
    prior,
    fetchMorePrior,
    hasMore: hasMore || deprecatedHasMore,
    loading: loading || loadingMore,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};
