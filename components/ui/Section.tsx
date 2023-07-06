import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface SectionProps {
  className?: string;
  bgIllustrationComponent?: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  className,
  children,
  bgIllustrationComponent,
}) => {
  return (
    <>
      <section className={twMerge(`w-full py-28 relative`, className)}>
        {bgIllustrationComponent && (
          <div className="absolute top-0 left-0 w-full h-full z-0">
            {bgIllustrationComponent}
          </div>
        )}
        <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-8">
          {children}
        </div>
      </section>
    </>
  );
};

export default Section;
