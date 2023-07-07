import { twMerge } from "tailwind-merge";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <h1
      className={twMerge(
        "font-bold font-poppins text-secondary text-4xl sm:text-5xl max-w-4xl mb-4 ",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
