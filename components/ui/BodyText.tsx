import { twMerge } from "tailwind-merge";

interface BodyTextProps {
  children: React.ReactNode;
  className?: string;
}

const BodyText: React.FC<BodyTextProps> = ({ children, className }) => {
  return <div className={twMerge(`text-gray-700 text-xl tracking-md`, className)}>{children}</div>;
};

export default BodyText;
