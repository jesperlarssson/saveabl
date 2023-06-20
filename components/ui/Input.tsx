import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: any;
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      className,
      id,
      disabled,
      label,
      error,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="block w-full text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          type={type}
          ref={ref}
          id={id}
          className={twMerge(
            `w-full bg-primary p-2 rounded-md placeholder-slate-400
          focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-accent invalid:text-accent
          focus:invalid:border-accent focus:invalid:ring-accent`,
            [className, error && "border-red-500"]
          )}
          disabled={disabled}
          {...props}
        >
          {children}
        </input>
        {error && <span className="text-red-500">{error.message}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
