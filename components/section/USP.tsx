import React from "react";
import { FaCarrot, FaBox, FaUtensils } from "react-icons/fa";
import Section from "../ui/Section";

const USP = () => {
  return (
    <Section className="bg-secondary pt-10">
        <h2 className="font-poppins text-primary-200 font-semibold text-4xl mb-10">Vad innebär vår matkasse?</h2>
      <div className="w-full grid md:grid-cols-3 gap-16 md:gap-8">
        <Point
          icon={<FaCarrot />}
          title="Vår kock skapar recept"
          text="Vi samlar ihop jättegoda råvaror som ser lite tokiga ut och gör goda recept på det."
        />
        <Point
          icon={<FaBox />}
          title="Maten skickas till dig"
          text="Du får din räddade matkasse hemlevererad med det mesta förberett åt dig."
        />
        <Point
          icon={<FaUtensils />}
          title="Klimatsmart måltid på 15 min"
          text="Du hackar och värmer det sista på 15 minuter, njut av en god och klimatsmart middag!"
        />
      </div>
    </Section>
  );
};

export default USP;

interface PointProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const Point: React.FC<PointProps> = ({ icon, title, text }) => {
  return (
    <div className="flex flex-col  w-full">
      <div className="relative flex justify-center items-center w-20 h-16 text-accent text-4xl mb-6">
        <div className="bg-primary-200 bg-opacity-20 absolute bottom-0 left-0 w-full h-6 z-0"></div>
        <div className="z-10 ">{icon}</div>
      </div>
      <h3 className="font-poppins text-primary-200  text-xl mb-2">
        {title}
      </h3>
      <p className="text-primary-200  opacity-80 text-sm max-w-xs">
        {text}
      </p>
    </div>
  );
};
