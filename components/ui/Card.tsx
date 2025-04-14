import { twMerge } from "tailwind-merge";
import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  clickable?: boolean;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  onClick,
  clickable,
  style,
}) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={twMerge(
        `bg-primary bg-opacity-25 mt-6 sm:my-8 shadow-inner p-4 sm:p-8 rounded-lg text-primary transition-all duration-300 ease-in-out`,
        [className, clickable && "cursor-pointer hover:shadow-lg"]
      )}
    >
      {children}
    </div>
  );
};

export default Card;
