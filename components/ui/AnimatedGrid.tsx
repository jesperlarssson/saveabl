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
    <div className="relative grid gap-4 sm:grid-cols-2">
      <AnimatePresence mode="wait">
        {items.map((item) => (
          <ProductTile
            key={item.id}
            title={item.title}
            price={item.price}
            imgSrc={item.imgSrc}
            favorite={item.favorite}
            portions={item.portions}
            excerpt={item.excerpt}
            description={item.description}
            id={item.id}
            onExpand={(id) => setExpandedId(id)}
            isExpanded={expandedId === item.id}
          >
          </ProductTile>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedGrid;
