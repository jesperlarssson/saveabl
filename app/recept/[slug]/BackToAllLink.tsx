"use client";

import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import { useSearchParams } from "next/navigation";

export default function BackToAllLink() {
  const { text } = useLang();
  const backLabel = text?.recipes?.back_to_all ?? "Alla recept";

  const sp = useSearchParams();
  const returnTo = sp?.get("returnTo");

  const href = returnTo ? decodeURIComponent(returnTo) : "/recept";

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 mb-2 md:mb-4 text-[#6E2936] hover:underline focus:underline rounded"
      aria-label={backLabel}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span>{backLabel}</span>
    </Link>
  );
}
