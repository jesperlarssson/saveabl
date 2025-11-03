// app/api/recipes/rolling/route.ts
import { NextResponse } from "next/server";
import { getLatestRecipes } from "@/lib/hygraph";

// Inga caches
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

type R = {
  id: string;
  weekNr?: number | null;
  startDate?: string | null;
  recipeNumber?: number | null;
};

/** ISO-vecka (1–53) från ett datum (fallback om weekNr saknas). */
function isoWeekFromDateStr(d?: string | null): number | null {
  if (!d) return null;
  const date = new Date(d);
  if (isNaN(date.getTime())) return null;

  // ISO: torsdag avgör veckonumret
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // ställ om till torsdag i samma vecka
  const day = target.getUTCDay() || 7; // 1=Mon..7=Sun
  target.setUTCDate(target.getUTCDate() + 4 - day);

  // årets första torsdag
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const dayMs = 24 * 60 * 60 * 1000;

  // vecka = 1 + antalet hela veckor sedan årets första torsdag-vecka började
  const week = Math.floor(( (target.getTime() - yearStart.getTime()) / dayMs + ((yearStart.getUTCDay() || 7) > 4 ? (yearStart.getUTCDay() || 7) - 8 : -(yearStart.getUTCDay() || 7) + 1) ) / 7) + 1;

  // Robustare variant utan edge-case-krusiduller:
  // räkna veckor från första torsdagen
  return Math.max(1, Math.min(53, week));
}

export async function GET() {
  try {
    // Hämta många nog för att säkert täcka senaste veckorna
    const all = (await getLatestRecipes(120)) as R[];

    // 1) Bestäm "effektiv vecka" per recept (weekNr eller ISO-vecka från startDate)
    const effectiveWeekOf = (r: R): number | null =>
      (typeof r.weekNr === "number" ? r.weekNr : null) ??
      isoWeekFromDateStr(r.startDate);

    // 2) Gruppera efter effektiv vecka i den ordning veckor dyker upp
    //    (listan 'all' är redan publishedAt_DESC)
    const orderOfWeeks: number[] = [];
    const byWeek = new Map<number, R[]>();
    const unknown: R[] = [];

    for (const r of all) {
      const w = effectiveWeekOf(r);
      if (w == null) {
        unknown.push(r);
        continue;
      }
      if (!byWeek.has(w)) {
        byWeek.set(w, []);
        orderOfWeeks.push(w);
      }
      byWeek.get(w)!.push(r);
    }

    // 3) Senaste veckor = de två första i orderOfWeeks
    const latestWeek = orderOfWeeks[0];
    const secondWeek = orderOfWeeks[1];

    const nextWeek = latestWeek != null ? [...(byWeek.get(latestWeek) ?? [])] : [];
    const thisWeek = secondWeek != null ? [...(byWeek.get(secondWeek) ?? [])] : [];

    // 4) Resten till prior, behåll publiceringsordning mellan veckor
    const prior: R[] = [];
    for (let i = 2; i < orderOfWeeks.length; i++) {
      const w = orderOfWeeks[i];
      prior.push(...(byWeek.get(w) ?? []));
    }
    // recept utan bestämd vecka hamnar sist i prior
    prior.push(...unknown);

    // 5) Sortera varje veckoblock efter dag (recipeNumber: 1→3)
    const sortByDay = (a: R, b: R) => (a.recipeNumber ?? 0) - (b.recipeNumber ?? 0);
    nextWeek.sort(sortByDay);
    thisWeek.sort(sortByDay);
    // prior lämnas i publiceringsordning över veckor (kan sorteras inom veckor vid behov)

    return NextResponse.json(
      { nextWeek, thisWeek, prior },
      { headers: { "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate" } }
    );
  } catch (error) {
    console.error("rolling route (group by week) error:", error);
    return NextResponse.json(
      { error: "Failed to build rolling recipe groups" },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate" },
      }
    );
  }
}
