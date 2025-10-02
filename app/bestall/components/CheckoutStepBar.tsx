"use client";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export type CheckoutPhase = 1 | 2 | 3;

type Props = {
  phase: CheckoutPhase;
  within?: number;
  className?: string;
  /** Språkstyrda etiketter: [Val, Uppgifter, Betalning] */
  labels?: [string, string, string];
};

const BRAND = "#6e2936";
const UNFILLED = "#eecfaa";

export default function CheckoutStepBar({
  phase,
  within = 0,
  className,
  labels: labelsProp,
}: Props) {
  // Stabil labels-referens
  const labels = useMemo<[string, string, string]>(
    () => [
      labelsProp?.[0] ?? "Val",
      labelsProp?.[1] ?? "Uppgifter",
      labelsProp?.[2] ?? "Betalning",
    ],
    [labelsProp?.[0], labelsProp?.[1], labelsProp?.[2]]
  );

  const clampedPhase = Math.min(Math.max(phase, 1), 3) as CheckoutPhase;
  const clampedWithin = Math.min(Math.max(within, 0), 1);

  const overall = useMemo(
    () => (clampedPhase - 1 + clampedWithin) / (labels.length - 1),
    [clampedPhase, clampedWithin, labels.length]
  );

  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapW, setWrapW] = useState(0);

  // Mät bredd utan render-loop
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const apply = (w: number) => setWrapW((prev) => (prev !== w ? w : prev));

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver((entries) => {
        const w = Math.round(
          entries[0]?.contentRect.width ?? el.getBoundingClientRect().width
        );
        apply(w);
      });
      ro.observe(el);
      apply(Math.round(el.getBoundingClientRect().width));
      return () => ro.disconnect();
    } else {
      const measure = () =>
        apply(Math.round(el.getBoundingClientRect().width));
      measure();
      window.addEventListener("resize", measure);
      window.addEventListener("orientationchange", measure);
      return () => {
        window.removeEventListener("resize", measure);
        window.removeEventListener("orientationchange", measure);
      };
    }
  }, []);

  // Geometri (öka sidePadding om du vill ha mer luft vid kanterna)
  const sidePadding = 20;   // <-- höj t.ex. till 64 om vänster/höger etikett behöver mer plats
  const capGap = 14;
  const centerGap = 24;
  const trackH = 4;
  const labelGap = 14;

  const leftDotX  = sidePadding;
  const rightDotX = Math.max(sidePadding, wrapW - sidePadding);
  const midDotX   = (leftDotX + rightDotX) / 2;

  const trackStart = leftDotX + capGap;
  const trackEnd   = rightDotX - capGap;
  const centerL    = midDotX - centerGap / 2;
  const centerR    = midDotX + centerGap / 2;

  const knobPx = leftDotX + (rightDotX - leftDotX) * overall;

  // Fyllda längder
  const leftFill  = Math.max(0, Math.min(knobPx, centerL) - trackStart);
  const rightFill =
    knobPx <= centerR ? 0 : Math.max(0, Math.min(knobPx, trackEnd) - centerR);

  // Prickstatus
  const leftReached   = knobPx >= leftDotX - 0.01;
  const middleReached = knobPx >= midDotX;
  const rightReached  = knobPx >= rightDotX;

  return (
    <div id="checkout-stepbar" className={twMerge("w-full", className)}>
      <div className="max-w-5xl mx-auto px-4 py-2">
        <div ref={wrapRef} className="relative h-14">
          {/* Ofylld bas */}
          <Bar top={`calc(50% - ${trackH / 2}px)`} left={trackStart} width={Math.max(0, centerL - trackStart)} height={trackH} color={UNFILLED} />
          <Bar top={`calc(50% - ${trackH / 2}px)`} left={centerR}   width={Math.max(0, trackEnd - centerR)}   height={trackH} color={UNFILLED} />

          {/* Fylld del */}
          <Bar top={`calc(50% - ${trackH / 2}px)`} left={trackStart} width={Math.max(0, leftFill)}  height={trackH} color={BRAND} />
          <Bar top={`calc(50% - ${trackH / 2}px)`} left={centerR}   width={Math.max(0, rightFill)} height={trackH} color={BRAND} />

          {/* Små prickar */}
          <Dot x={leftDotX}  color={leftReached ? BRAND : UNFILLED}   size={8} />
          <Dot x={midDotX}   color={middleReached ? BRAND : UNFILLED} size={8} />
          <Dot x={rightDotX} color={rightReached ? BRAND : UNFILLED}  size={8} />

          {/* Rörlig större prick */}
          <Dot x={knobPx} color={BRAND} size={16} animate />

          {/* Etiketter – ALLTID centrerade under prickarna, utan radbrytning */}
          <CenteredLabel x={leftDotX}  text={labels[0]} active={clampedPhase === 1} gap={labelGap} />
          <CenteredLabel x={midDotX}   text={labels[1]} active={clampedPhase === 2} gap={labelGap} />
          <CenteredLabel x={rightDotX} text={labels[2]} active={clampedPhase === 3} gap={labelGap} />
        </div>
      </div>
    </div>
  );
}

/* Hjälpkomponenter */
function Bar({ top, left, width, height, color }: { top: string; left: number; width: number; height: number; color: string }) {
  return <div className="absolute rounded-full" style={{ top, left, width, height, backgroundColor: color }} aria-hidden />;
}

function Dot({ x, color, size, animate = false }: { x: number; color: string; size: number; animate?: boolean }) {
  return (
    <div
      className={twMerge(
        "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full shadow",
        animate && "transition-[left] duration-300 ease-out"
      )}
      style={{ left: `${x}px`, width: size, height: size, backgroundColor: color }}
      aria-hidden
    />
  );
}

function CenteredLabel({
  x,
  text,
  active,
  gap = 14,
}: { x: number; text: string; active?: boolean; gap?: number }) {
  return (
    <div
      className={twMerge(
        "absolute -translate-x-1/2 text-xs select-none whitespace-nowrap break-keep hyphens-none",
        active ? "font-semibold" : "opacity-70"
      )}
      style={{
        left: `${x}px`,
        top: `calc(50% + ${gap}px)`,
        color: BRAND, // vinröd text
        whiteSpace: "nowrap", // extra bälte och hängslen om globala stilar finns
      }}
    >
      {text}
    </div>
  );
}

