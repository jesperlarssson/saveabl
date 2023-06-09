import Marquee from "react-fast-marquee";
import { twMerge } from "tailwind-merge";
interface TextBannerProps {
    children: React.ReactNode;
    className?: string;
}

const TextBanner: React.FC<TextBannerProps> = ({children, className}) => {
  return (
    <Marquee className={twMerge(`bg-secondary text-primary-200 w-full py-2 text-lg tracking-wider`, className)}>
     {children}
    </Marquee>
  );
};

export default TextBanner;
