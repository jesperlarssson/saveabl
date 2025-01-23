"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import InjectScriptComponent from "../general/InjectScript";
import Section from "../ui/Section";
import Grid from "../ui/Grid";
import ReviewTile from "../general/ReviewTile";
import LottieAnimation from "../ui/LottieAnimation";
import globAnimation from "../../public/anim/Jordklot.json";
import Title from "../ui/Title";
import { useLang } from "@/hooks/useLang";
import { useSwipeable } from "react-swipeable"; // Lägg till detta paket

interface Review {
  id: number;
  name: string;
  title: string;
  review: string;
  date: string;
  url: string;
  rating: number;
}

const Reviews = () => {
  const { text, lang } = useLang();
  const [compText, setCompText] = useState(text.page.reviews);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const reviews: Review[] = text.page.reviews.content;

  useEffect(() => {
    setCompText(text.page.reviews);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [text]);

  const handleNext = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
  });

  return (
    <>
      <InjectScriptComponent />
      <Section className="py-16 sm:py-16 bg-primary flex flex-col items-center">
        <div className="absolute left-[-50px] top-5 opacity-50 w-0 h-0 lg:w-96 lg:h-96 z-0">
          <LottieAnimation animationData={globAnimation} />
        </div>

        {/* Trustpilot och rubrik */}
        <div className="flex flex-col items-center w-full">
          <a
            href="https://se.trustpilot.com/review/saveabl.se"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`/images/trustpilot-${lang}.png`}
              alt="Trustpilot"
              className="h-12 w-auto mb-4"
            />
          </a>
          <Title className="text-center">{compText.title}</Title>
        </div>

        {/* Centrerad länk till alla omdömen */}
        <a
          className="mt-4 font-bold text-neutral-700 flex justify-center items-center gap-2 cursor-pointer hover:gap-4 hover:text-neutral-600 transition-all group text-center"
          href="https://se.trustpilot.com/review/saveabl.se"
        >
          {compText.read_all_reviews}{" "}
          <AiOutlineArrowRight className="group-hover:text-accent" />
        </a>

        {/* Recensioner */}
        {isMobile ? (
          <div
            className="relative w-full max-w-md mt-8"
            {...swipeHandlers} // Lägg till swipe-hanterare
          >
            <ReviewTile key={`review-${currentReviewIndex}`} {...reviews[currentReviewIndex]} />

            {/* Pilar för att byta recension */}
            <div className="mt-8 flex justify-center gap-8">
              {/* Vänster pil */}
              <button
                onClick={handlePrevious}
                className="font-bold text-neutral-700 flex items-center gap-2 cursor-pointer group"
                aria-label="Föregående recension"
              >
                <AiOutlineArrowRight
                  className="text-2xl group-hover:text-accent rotate-180"
                />
              </button>
              {/* Höger pil */}
              <button
                onClick={handleNext}
                className="font-bold text-neutral-700 flex items-center gap-2 cursor-pointer group"
                aria-label="Nästa recension"
              >
                <AiOutlineArrowRight
                  className="text-2xl group-hover:text-accent"
                />
              </button>
            </div>
          </div>
        ) : (
          <Grid>
            {reviews.map((review) => (
              <ReviewTile key={`review-${review.id}`} {...review} />
            ))}
          </Grid>
        )}
      </Section>
    </>
  );
};

export default Reviews;
