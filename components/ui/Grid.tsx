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
        `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Grid;
