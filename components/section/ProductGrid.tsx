"use client";

import React from "react";
import Section from "../ui/Section";
import Grid from "../ui/Grid";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import AnimatedGrid from "../ui/AnimatedGrid";
import ProductTile from "../general/ProductTile";
import { productInfo } from "@/lib/mealkits";



const ProductGrid = () => {
  return (
    <Section className="bg-secondary pt-4 pb-48">
      <AnimatedGrid items={productInfo} />
    </Section>
  );
};

export default ProductGrid;
