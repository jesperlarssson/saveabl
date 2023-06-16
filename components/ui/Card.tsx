import { twMerge } from "tailwind-merge";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  clickable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  onClick,
  clickable,
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        `bg-primary bg-opacity-25 my-8 shadow-inner p-8 rounded-lg text-primary transition`,
        [className, clickable && "cursor-pointer hover:shadow-lg"]
      )}
    >
      {children}
    </div>
  );
};

export default Card;
