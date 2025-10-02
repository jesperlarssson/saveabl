// lib/recipeDiet.ts

// Vilka filter som kan användas i UI:t
export type DietFilter = "veg" | "meat" | "all";

/**
 * Filtrerar recept baserat på diet-fältet i Hygraph.
 *
 * - Hygraph returnerar nu diet som:
 *   - ["VEG"], ["KOTT"], ["VEG","KOTT"], eller null
 * - "veg": visar alla recept som har `VEG` eller inget diet-värde alls
 * - "meat": visar endast recept som har `KOTT`
 * - "all": visar alla recept
 */
export function recipeMatchesDiet(r: any, diet: DietFilter) {
  if (diet === "all") return true;

  const diets: string[] = Array.isArray(r?.diet)
    ? r.diet
    : r?.diet
    ? [r.diet]
    : [];

  if (diet === "veg") {
    return diets.length === 0 || diets.includes("VEG");
  }

  if (diet === "meat") {
    return diets.includes("KOTT");
  }

  return true;
}
