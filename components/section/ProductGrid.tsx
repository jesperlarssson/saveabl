import React from "react";
import Section from "../ui/Section";
import Grid from "../ui/Grid";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import AnimatedGrid from "../ui/AnimatedGrid";
import ProductTile from "../general/ProductTile";
import getAllProductInfo from "@/actions/getAllProductInfo";

const ProductGrid = async () => {
  const productInfo = await getAllProductInfo();
  return (
    <Section className="bg-secondary pt-4 pb-48">
      <AnimatedGrid items={productInfo} />
    </Section>
  );
};

export default ProductGrid;
