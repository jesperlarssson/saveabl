import { twMerge } from "tailwind-merge";

interface SectionProps {
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ className, children }) => {
  return (
    <section className={twMerge(`w-full py-28`, className)}>
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4 md:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;
