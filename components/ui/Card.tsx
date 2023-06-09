import { twMerge } from "tailwind-merge";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  clickable?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, onClick, clickable }) => {
  return (
    <div
      className={twMerge(
        `bg-white rounded-md shadow-md p-4 transition cursor-pointer hover:shadow-lg`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
