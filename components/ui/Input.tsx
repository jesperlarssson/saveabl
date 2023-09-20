import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: any;
  parentClassName?: string;
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      className,
      parentClassName,
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
      <div className={twMerge(`w-full -mt-4`, parentClassName)}>
        <label
          htmlFor={id}
          className={twMerge(`block w-full text-md font-bold text-primary-600 ml-1 px-1 max-w-fit bg-primary-200 translate-y-3 transition`, error && "text-red-500")}
        >
          {label}
        </label>
        <input
          type={type}
          ref={ref}
          id={id}
          className={twMerge(
            `w-full border col-span-2 border-primary bg-transparent p-2 rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none focus:border-secondary focus:ring-1 
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
