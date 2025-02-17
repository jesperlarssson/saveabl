import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface SectionProps {
  className?: string;
  bgIllustrationComponent?: React.ReactNode;
  children: React.ReactNode;
  narrow?: boolean;
}

const Section: React.FC<SectionProps> = ({
  className,
  children,
  bgIllustrationComponent,
  narrow = false
}) => {
  return (
    <>
      <section className={twMerge(`w-full py-20 relative`, className)}>
        {bgIllustrationComponent && (
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            {bgIllustrationComponent}
          </div>
        )}
        <div className={twMerge("max-w-screen-2xl mx-auto px-4 sm:px-4 md:px-8", narrow && 'max-w-screen-lg')}>
          {children}
        </div>
      </section>
    </>
  );
};

export default Section;
