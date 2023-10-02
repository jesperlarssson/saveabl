import React from "react";

interface TitleH2Props {
  className?: string;
  children: React.ReactNode;
}

const TitleH2: React.FC<TitleH2Props> = ({ className, children }) => {
  return (
    <h2 className="font-poppins text-secondary font-semibold text-4xl sm:text-5xl max-w-4xl mb-4">
      {children}
    </h2>
  );
};

export default TitleH2;
