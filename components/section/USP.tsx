"use client";

import React from "react";
import { FaCarrot, FaBox, FaUtensils } from "react-icons/fa";
import Section from "../ui/Section";
import { useLang } from "@/hooks/useLang";

const USP = () => {
  const { text } = useLang();
  return (
    <Section className="bg-secondary pt-10">
      <h2 className="text-center sm:text-left font-poppins text-primary-200 font-semibold text-4xl mb-10">
        {text.page.usp.title}
      </h2>
      <div className="w-full grid sm:grid-cols-3 gap-16 md:gap-8">
        <Point
          icon={<FaCarrot />}
          title={text.page.usp.points[0].title}
          text={text.page.usp.points[0].text}
        />
        <Point
          icon={<FaBox />}
          title={text.page.usp.points[1].title}
          text={text.page.usp.points[1].text}
        />
        <Point
          icon={<FaUtensils />}
          title={text.page.usp.points[2].title}
          text={text.page.usp.points[2].text}
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
    <div className="flex flex-col items-center sm:items-start  w-full">
      <div className="relative flex justify-center items-center w-20 h-16 text-accent text-4xl mb-6">
        <div className="bg-primary-200 bg-opacity-20 absolute bottom-0 left-0 w-full h-6 z-0"></div>
        <div className="z-10 ">{icon}</div>
      </div>
      <h3 className="text-center sm:text-left font-poppins text-primary-200  text-xl mb-2">
        {title}
      </h3>
      <p className="text-center sm:text-left text-primary-200  opacity-80 text-sm max-w-xs">
        {text}
      </p>
    </div>
  );
};
