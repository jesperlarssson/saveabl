"use client";

import { motion } from "framer-motion";

interface GridItemProps {
  id: string;
  onExpand: (id: string) => void;
  isExpanded: boolean;
  children: React.ReactNode;
}

const GridItem: React.FC<GridItemProps> = ({
  id,
  onExpand,
  isExpanded,
  children,
}) => {
  return (
    <motion.div
      onClick={() => onExpand(isExpanded ? '' : id)}
      className={` w-full h-full ${
        isExpanded ? "absolute inset-0 w-full h-full" : ""
      } overflow-auto`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default GridItem;
