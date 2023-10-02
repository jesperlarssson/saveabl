import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        ref={ref}
        className={twMerge(
          `w-16 h-16 rounded-full bg-primary-200  drop-shadow-lg text-primary-800 z-10 flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50 hover:bg-primary-300 hover:scale-105 transition`,
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
