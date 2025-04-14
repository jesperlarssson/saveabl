"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import InjectScriptComponent from "../general/InjectScript";
import Section from "../ui/Section";
import Grid from "../ui/Grid";
import ReviewTile from "../general/ReviewTile";
import LottieAnimation from "../ui/LottieAnimation";
import globAnimation from "../../public/anim/Jordklot.json";
import Title from "../ui/Title";
import { useLang } from "@/hooks/useLang";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";

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
  const [equalHeight, setEqualHeight] = useState<number | null>(null);

  const reviews: Review[] = text.page.reviews.content;
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const timeout = setTimeout(() => {
        const heights = refs.current.map((el) => el?.offsetHeight || 0);
        const maxHeight = Math.max(...heights);
        setEqualHeight(maxHeight);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [text, isMobile]);

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

        {/* Trustpilot + Titel */}
        <div className="flex flex-col items-center w-full">
          <a
            href="https://se.trustpilot.com/review/saveabl.se"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={`/images/trustpilot-${lang}.webp`}
              alt="Trustpilot"
              width={500}
              height={100}
              quality={100}
              unoptimized
              loading="lazy"
              className="h-12 w-auto mb-4"
            />
          </a>
          <Title className="text-center">{compText.title}</Title>
        </div>

        {/* Länk till alla omdömen */}
        <a
          className="mt-4 font-bold text-neutral-700 flex justify-center items-center gap-2 cursor-pointer hover:gap-4 hover:text-neutral-600 transition-all group text-center"
          href="https://se.trustpilot.com/review/saveabl.se"
        >
          {compText.read_all_reviews}
          <AiOutlineArrowRight className="group-hover:text-accent" />
        </a>

        {/* Recensionskort */}
        {isMobile ? (
          <div className="relative w-full max-w-md mt-8" {...swipeHandlers}>
            <ReviewTile
              key={`review-${currentReviewIndex}`}
              {...reviews[currentReviewIndex]}
              equalHeight={equalHeight || undefined}
              readMoreText={text.page.reviews.read_more}
              readLessText={text.page.reviews.read_less}
            />
            <div className="mt-8 flex justify-center gap-8">
              <button onClick={handlePrevious} aria-label="Föregående recension">
                <AiOutlineArrowRight className="text-2xl rotate-180" />
              </button>
              <button onClick={handleNext} aria-label="Nästa recension">
                <AiOutlineArrowRight className="text-2xl" />
              </button>
            </div>
          </div>
        ) : (
          <Grid>
            {reviews.map((review, i) => (
              <div key={review.id} ref={(el) => (refs.current[i] = el)}>
                <ReviewTile
                  {...review}
                  equalHeight={equalHeight || undefined}
                  readMoreText={text.page.reviews.read_more}
                  readLessText={text.page.reviews.read_less}
                />
              </div>
            ))}
          </Grid>
        )}
      </Section>
    </>
  );
};

export default Reviews;
