"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import GridItem from "./GridItem";
import ProductTile from "../general/ProductTile";

interface AnimatedGridProps {
  items: any[];
}

const AnimatedGrid: React.FC<AnimatedGridProps> = ({ items }) => {
  const [expandedId, setExpandedId] = useState<string>("");

  return (
    <div className="relative grid gap-4 md:grid-cols-2">
      <AnimatePresence mode="wait">
        {items.map((item, index) => (
          <ProductTile
            key={`product-tile-${index}`}
            product={item}
            onExpand={(id) => setExpandedId(id)}
            isExpanded={expandedId === item.id}        >
          </ProductTile>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedGrid;
