"use client";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const CheckoutButton = ({
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will run only on the client, so we can safely set isClient to true
    setIsClient(true);
  }, []);

  const buttonClass = twMerge(
    `mt-2 px-8 py-2 border bg-transparent text-neutral-700 font-medium border-primary rounded-md w-auto transition-all hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50`,
    [isClient && selected && `bg-primary text-secondary font-bold`, className]
  );

  return (
    <button onClick={onClick} className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
};

export default CheckoutButton;
