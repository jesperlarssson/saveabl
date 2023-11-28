import Button from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Type } from "typescript";

export const CheckoutButton = ({
    children,
    onClick,
    disabled,
    selected,
    className,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    selected?: boolean;
    className?: string;
  }) => {
    return (
      <Button
        onClick={onClick}
        className={twMerge(
          `mt-2 px-8 py-2 border bg-transparent text-neutral-700 font-medium border-primary rounded-md w-auto transition-all hover:bg-primary`,
          [
            selected && `bg-primary text-secondary font-bold`,
            disabled && `opacity-50`,
            className,
          ]
        )}
        disabled={disabled}
      >
        {children}
      </Button>
    );
  };
  
  