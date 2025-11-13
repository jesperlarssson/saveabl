"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLang } from "@/hooks/useLang";

type DietKey = "veg" | "meat";

export default function RecipeDietToggleInline({
  currentDiet,
  siblingSlug,
}: {
  currentDiet: DietKey;
  siblingSlug: string | null;
}) {
  const { text } = useLang();

  const labels = useMemo(() => {
    const f = text?.recipes?.filters ?? {};
    return {
      veg: f.veg ?? "Saveabl Grön",
      meat: f.meat ?? "Saveabl Gård",
    };
  }, [text]);

  const descriptions = useMemo(() => {
    const fd = (text as any)?.recipes?.filtersDescriptions ?? {};
    const fd2 = (text as any)?.recipes?.filtersDesc ?? {};
    const f = (text as any)?.recipes?.filters ?? {};
    return {
      veg:
        fd.veg ??
        fd2.veg ??
        f.descVeg ??
        "Vegetariska middagar gjorda på utvalda råvaror",
      meat:
        fd.meat ??
        fd2.meat ??
        f.descMeat ??
        "Middagar med svenskt kött & fisk + utvalda råvaror",
    } as Record<DietKey, string>;
  }, [text]);

  const base =
    "min-w-[140px] px-6 py-2 rounded-full font-bold transition border border-[#6E2936]";
  const active = "bg-[#6E2936] text-[#FCF7E8] cursor-default";
  const inactive = "bg-[#FCF7E8] text-[#6E2936] hover:bg-[#6E2936] hover:text-[#FCF7E8]";
  const disabled = "opacity-50 pointer-events-none bg-[#FCF7E8] text-[#6E2936]";

  const renderBtn = (key: DietKey) => {
    const isActive = currentDiet === key;
    if (isActive) return <span className={`${base} ${active}`}>{labels[key]}</span>;
    return siblingSlug ? (
      <Link href={`/recept/${siblingSlug}`} className={`${base} ${inactive}`}>
        {labels[key]}
      </Link>
    ) : (
      <span aria-disabled="true" className={`${base} ${disabled}`}>
        {labels[key]}
      </span>
    );
  };

  return (
    <div className="flex flex-col items-start gap-2 text-left">
      <div role="group" aria-label="Diet toggle" className="flex gap-3 justify-start">
        {renderBtn("veg")}
        {renderBtn("meat")}
      </div>
      <p
        className="text-sm md:text-lg font-bold mt-2 text-[#6E2936] text-left md:whitespace-nowrap"
        aria-live="polite"
      >
        {descriptions[currentDiet]}
      </p>
    </div>
  );
  
}
