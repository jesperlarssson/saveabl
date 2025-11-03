"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { Recipe } from "@/types";
import Grid from "../ui/Grid";
import RecipeTile from "../RecipeTile";
import Button from "../ui/Button";
import ThisWeekRecipes from "../general/ThisWeekRecipes";
import { useLang } from "@/hooks/useLang";
import Title from "../ui/Title";
import DietToggle from "@/components/recipes/DietToggle";
import { useSearchParams } from "next/navigation";
import { recipeMatchesDiet, DietFilter } from "@/lib/recipeDiet";

const INITIAL_VISIBLE_WEEK_GROUPS = 1; // ⬅️ visa endast 1 tidigare vecka
const LOAD_MORE_WEEK_GROUPS = 1;       // ⬅️ ladda 1 vecka per klick

// Fallback: ISO-veckonummer från datum om weekNr saknas
function isoWeekFromDateStr(d?: string | null): number | null {
  if (!d) return null;
  const date = new Date(d);
  if (isNaN(date.getTime())) return null;

  // ISO: torsdag definierar veckan
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = target.getUTCDay() || 7; // 1=Mon..7=Sun
  target.setUTCDate(target.getUTCDate() + 4 - day);

  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const week = Math.floor(
    ( (target.getTime() - yearStart.getTime()) / 86400000 + 1 + (yearStart.getUTCDay() || 7) ) / 7
  );
  return Math.max(1, Math.min(53, week));
}

const effectiveWeek = (r: Partial<Recipe>): number | null =>
  (typeof (r as any).weekNr === "number" ? (r as any).weekNr : null) ??
  isoWeekFromDateStr((r as any).startDate);

// Gruppera recept per vecka i redan korrekt ordning (kommer från /api/recipes/rolling)
function groupRecipesByWeek(recipes: Recipe[]) {
  const order: Array<{ week: number | "unknown"; items: Recipe[] }> = [];
  const indexByKey = new Map<number | "unknown", number>();

  for (const r of recipes) {
    const wk = effectiveWeek(r) ?? "unknown";
    if (!indexByKey.has(wk)) {
      indexByKey.set(wk, order.length);
      order.push({ week: wk, items: [] });
    }
    order[indexByKey.get(wk)!].items.push(r);
  }

  // Sortera inom varje vecka dag 1→3
  for (const g of order) {
    g.items.sort(
      (a, b) => ((a as any).recipeNumber ?? 0) - ((b as any).recipeNumber ?? 0)
    );
  }
  return order; // första gruppen = senaste "äldre" veckan
}

const Recipes: React.FC = () => {
  const { text } = useLang();

  const sp = useSearchParams();
  const queryDiet = (sp?.get("diet") ?? undefined) as DietFilter | undefined;
  const diet: DietFilter = (queryDiet ?? "veg") as DietFilter;

  const [nextWeek, setNextWeek] = useState<Recipe[]>([]);
  const [thisWeek, setThisWeek] = useState<Recipe[]>([]);
  const [prior, setPrior] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const [visibleWeekGroups, setVisibleWeekGroups] = useState(INITIAL_VISIBLE_WEEK_GROUPS);
  const lastRecipeRef = useRef<HTMLDivElement | null>(null);

  const [weekText, setWeekText] = useState<string | null>(null); // veckotext från Hygraph

  // Hämta rullande listor (nästa/denna/äldre)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/recipes/rolling", { cache: "no-store" });
        const json = await res.json();

        if (!alive) return;

        const filterDiet = (arr: Recipe[]) =>
          (arr || []).filter((r) => recipeMatchesDiet(r, diet));

        setNextWeek(filterDiet(json.nextWeek));
        setThisWeek(filterDiet(json.thisWeek));
        setPrior(filterDiet(json.prior));

        // resetta veckopagineringen vid dietbyte
        setVisibleWeekGroups(INITIAL_VISIBLE_WEEK_GROUPS);
      } catch (e) {
        console.error("rolling fetch error", e);
        setNextWeek([]);
        setThisWeek([]);
        setPrior([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [diet]);

  // Hämta veckotext (“…onsdag v. X”) från Hygraph
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/api/recipe-week", { cache: "no-store" });
        const j = await r.json();
        if (!alive) return;
        setWeekText(j?.week ?? null);
      } catch {
        setWeekText(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Gruppera “prior” per vecka och välj hur många grupper som ska visas
  const priorGroups = useMemo(() => groupRecipesByWeek(prior), [prior]);
  const visiblePriorGroups = priorGroups.slice(0, visibleWeekGroups);
  const hasMorePriorGroups = visibleWeekGroups < priorGroups.length;

  const handleFetchMoreClick = () => {
    const newCount = visibleWeekGroups + LOAD_MORE_WEEK_GROUPS;
    setVisibleWeekGroups(newCount);
    // scrolla till sista renderade kort efter att DOM uppdaterats
    setTimeout(() => {
      lastRecipeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  return (
    <>
      <Title>{text.recipes.title}</Title>

      <div className="mt-8 mb-6">
        <DietToggle />
      </div>

      <div className="my-10 min-h-screen">
        <Grid className="">
          {/* Denna veckan */}
          {thisWeek.length > 0 && (
            <div className="relative p-2 sm:p-4 pt-0 mt-0 min-h-96 scale-103 col-span-3 rounded-2xl">
              <h3 className="font-poppins text-3xl text-primary">
                {text.recipes.this_week}
              </h3>
              <ThisWeekRecipes recipes={thisWeek} />
            </div>
          )}

          {/* Nästa veckan */}
          {nextWeek.length > 0 && (
            <div className="col-span-3">
              <h3 className="font-poppins text-3xl text-primary mt-4">
                {text.recipes.next_week}
              </h3>

              {/* Veckotext från Hygraph */}
              {typeof weekText === "string" || typeof weekText === "number" ? (
                <p className="text-primary text-lg mt-2">
                  {text.recipes.next_week_order_until.replace("{week}", String(weekText))}
                </p>
              ) : null}

              <Grid className="gap-8 pt-4">
                {loading ? (
                  <>
                    <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
                    <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
                    <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
                  </>
                ) : (
                  nextWeek.map((recipe: Recipe, index: number) => (
                    <RecipeTile key={recipe.id ?? index} recipe={recipe} />
                  ))
                )}
              </Grid>
            </div>
          )}

          <div className="w-full border-b col-span-1 md:col-span-3 border-primary-500 border-opacity-50"></div>

          {/* Äldre recept – visar 1 vecka först, sedan 1 vecka per klick */}
          {loading ? (
            <>
              <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
              <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
              <div className="h-80 overflow-hidden rounded-xl w-full animate-pulse bg-primary bg-opacity-25" />
            </>
          ) : (
            <div className="col-span-3">
              <h3 className="font-poppins text-3xl text-primary mt-4 mb-4">
                {text.recipes.older_recipes_heading}
              </h3>

              {/* Rendera veckovis */}
              {visiblePriorGroups.map((group, gi) => (
                <Grid className="gap-8 pt-4" key={`prior-group-${group.week}-${gi}`}>
                  {group.items.map((recipe: Recipe, index: number) => {
                    // ref på sista kortet i sista synliga gruppen
                    const isLastGroup = gi === visiblePriorGroups.length - 1;
                    const isLastCard =
                      isLastGroup && index === group.items.length - 1;
                    return (
                      <div
                        key={recipe.id ?? `prior-${gi}-${index}`}
                        className="w-full"
                        ref={isLastCard ? lastRecipeRef : null}
                      >
                        <RecipeTile recipe={recipe} />
                      </div>
                    );
                  })}
                </Grid>
              ))}

              {/* Hämta fler */}
              {hasMorePriorGroups && (
                <div className="flex justify-center">
                  <Button
                    className="mt-12 max-w-xl mx-auto w-full"
                    onClick={handleFetchMoreClick}
                  >
                    {text.recipes.older_recipes}
                  </Button>
                </div>
              )}
            </div>
          )}
        </Grid>
      </div>
    </>
  );
};

export default Recipes;
