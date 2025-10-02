"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useLang } from "@/hooks/useLang";

type DietKey = "veg" | "meat";

export default function DietToggle() {
  const { text } = useLang();
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();

  const current = (sp?.get("diet") ?? "veg") as DietKey; // default = veg

  // Etiketter från språkfil
  const labels = useMemo(() => {
    const f = text?.recipes?.filters ?? {};
    return {
      veg: f.veg ?? "Veg",
      meat: f.meat ?? "Meat",
    };
  }, [text]);

  // Beskrivningar från språkfil (med kompatibla fallbacks)
  const descriptions = useMemo(() => {
    // Första prio: recipes.filtersDescriptions.{veg,meat}
    const fd = (text as any)?.recipes?.filtersDescriptions ?? {};
    // Andra prio: recipes.filtersDesc.{veg,meat}
    const fd2 = (text as any)?.recipes?.filtersDesc ?? {};
    // Tredje prio: recipes.filters.{descVeg, descMeat}
    const f = (text as any)?.recipes?.filters ?? {};

    const vegDesc =
      fd.veg ??
      fd2.veg ??
      f.descVeg ??
      // sista fallback (tidigare hårdkodad text)
      "Vegetariska middagar gjorda på utvalda råvaror";

    const meatDesc =
      fd.meat ??
      fd2.meat ??
      f.descMeat ??
      // sista fallback (tidigare hårdkodad text)
      "Middagar med svenskt kött & fisk + utvalda råvaror";

    return { veg: vegDesc, meat: meatDesc } as Record<DietKey, string>;
  }, [text]);

  const onChange = useCallback(
    (key: DietKey) => {
      if (key === current) return; // undvik onödig navigation
      const params = new URLSearchParams(sp?.toString() ?? "");
      params.set("diet", key);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, sp, pathname, current]
  );

  return (
    <div className="flex flex-col items-start gap-2">
      {/* Knapparna */}
      <div role="group" aria-label="Diet filter" className="flex gap-4">
        {(["veg", "meat"] as const).map((key) => {
          const active = current === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              aria-pressed={active}
              aria-label={labels[key]}
              className={
                "min-w-[140px] px-6 py-2 rounded-full font-bold transition " +
                (active
                  ? "bg-[#6E2936] text-[#FCF7E8] border border-[#6E2936] cursor-default"
                  : "bg-[#FCF7E8] text-[#6E2936] border border-[#6E2936] hover:bg-[#6E2936] hover:text-[#FCF7E8] hover:border-[#6E2936]")
              }
            >
              {labels[key]}
            </button>
          );
        })}
      </div>

      {/* En rad under knapparna som ändras med aktiv knapp */}
      <p
        className="text-sm md:text-lg font-bold mt-3 text-[#6E2936] text-left md:whitespace-nowrap"
        aria-live="polite"
      >
        {descriptions[current]}
      </p>
    </div>
  );
}
