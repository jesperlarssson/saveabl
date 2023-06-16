import React from "react";
import { twMerge } from "tailwind-merge";

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

const Grid: React.FC<GridProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Grid;
