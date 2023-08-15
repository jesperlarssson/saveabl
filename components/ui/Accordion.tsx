"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Section from "./Section";

type FAQ = {
  question: string;
  answer: string;
};

type AccordionProps = {
  faqs: FAQ[];
  title: string;
};

const Accordion = ({ faqs, title }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Section narrow className="bg-secondary text-primary-200">
      <h3 className="font-poppins text-2xl mb-8">{title}</h3>
      <div className="w-full  mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 border-opacity-20 overflow-hidden">
            <div
              className="flex justify-between items-center py-4 px-5 cursor-pointer"
              onClick={() =>
                setActiveIndex(index === activeIndex ? null : index)
              }
            >
              <h2 className="text-lg tracking-wide font-bold">{faq.question}</h2>
              <FaChevronDown
                className={`w-5 h-5 transform transition-transform duration-200 ${
                  index === activeIndex ? "rotate-180" : ""
                }`}
              />
            </div>
            <p
              className={`px-5 transition-all duration-200 ${
                index === activeIndex ? "max-h-full py-3" : "max-h-0"
              }`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Accordion;