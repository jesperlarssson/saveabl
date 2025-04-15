export const dynamicParams = true;

import RecipeLayout from "@/components/general/RecipeLayout";
import ThisWeekRecipes from "@/components/general/ThisWeekRecipes";
import CommentSection from "@/components/section/CommentSection";
import TextBanner from "@/components/ui/TextBanner";
import { textBannerText } from "@/lib/general";
import { getAllRecipesWithSlug, getRecipeWithSlug } from "@/lib/hygraph";
import Head from "next/head";
import React from "react";

export async function generateStaticParams() {
  const slugs = await getAllRecipesWithSlug();
  return slugs.slice(0, 10); // ✅ Endast senaste 10 laddas statiskt
}

async function getRecipe(params: any) {
  const recipe = await getRecipeWithSlug(params.slug);
  return recipe;
}

interface RecipePageProps {
  params: {
    slug: string;
  };
}

const RecipePage: React.FC<RecipePageProps> = async ({ params }) => {
  const recipe = await getRecipe(params);

  return (
    <>
      <Head>
        <title>{recipe?.title}</title>
      </Head>

      <RecipeLayout recipe={recipe} />
      <TextBanner>{textBannerText}</TextBanner>
      <ThisWeekRecipes fullWidth />
    </>
  );
};

export default RecipePage;
