"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Section from "./Section";
import Title from "../ui/Title";

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
    <Section narrow className="accordion-background text-[#6E2936]">
      <div className="mb-8 text-3xl font-bold text-center">{title}</div>
      <div className="w-full  mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-[#6E2936] border-opacity-20 overflow-hidden">
            <div
              className="flex justify-between items-center py-4 cursor-pointer"
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