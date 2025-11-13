export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";

import RecipeLayout from "@/components/general/RecipeLayout";
import ThisWeekRecipes from "@/components/general/ThisWeekRecipes";
import { getRecipeWithSlug, getSiblingRecipeForToggle } from "@/lib/hygraph";
import RecipeDietToggleInline from "./RecipeDietToggleInline";
import BackToAllLink from "./BackToAllLink"; // ⬅️ ny, client-komponent

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const recipe = await getRecipeWithSlug(params.slug);
  return { title: recipe?.title ?? "Recept" };
}

interface RecipePageProps {
  params: { slug: string };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeWithSlug(params.slug);
  if (!recipe) {
    return <div className="px-6 py-10">Receptet kunde inte hittas.</div>;
  }

  // Normalisera diet (Hygraph enum: VEG/KOTT)
  const arr: string[] = Array.isArray(recipe.diet) ? recipe.diet : [recipe.diet].filter(Boolean);
  const currentDiet: "veg" | "meat" =
    arr.some(v => String(v).toLowerCase().startsWith("veg")) ? "veg" : "meat";

  const sibling = await getSiblingRecipeForToggle(params.slug);

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 pt-6">
        <BackToAllLink />  {/* ⬅️ sköter språk + länk */}
        <div className="mt-4 flex flex-col items-start gap-2">
          <RecipeDietToggleInline
            currentDiet={currentDiet}
            siblingSlug={sibling?.slug ?? null}
          />
        </div>
      </div>

      <div className="-mt-10 md:-mt-12">
        <RecipeLayout recipe={recipe} />
      </div>

      <ThisWeekRecipes fullWidth />
    </>
  );
}
