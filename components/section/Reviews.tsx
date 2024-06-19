"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { AiOutlineArrowRight } from "react-icons/ai";
import TrustPilotWidget from "./TrustPilotWidget";
import Section from "../ui/Section";
import InjectScriptComponent from "../general/InjectScript";
import Grid from "../ui/Grid";
import { reviews } from "@/lib/reviews";
import ReviewTile from "../general/ReviewTile";
import LottieAnimation from "../ui/LottieAnimation";
import globAnimation from "../../public/anim/Jordklot.json";
import clockAnimation from "../../public/anim/Klocka.json";

import Title from "../ui/Title";
import BodyText from "../ui/BodyText";
import { useLang } from "@/hooks/useLang";

const Reviews = () => {
  const { text } = useLang();
  const [compText, setCompText] = useState(text.page.reviews);
  useEffect(() => {
    setCompText(text.page.reviews);
  }, [text]);
  return (
    <>
      <InjectScriptComponent />
      <Section
        className="bg-primary flex flex-col items-start"
        bgIllustrationComponent={
          <>
            <div className="absolute left-20 bottom-2 opacity-50 w-0 h-0 lg:w-96 lg:h-96 z-0">
              <LottieAnimation animationData={globAnimation} />
            </div>
            <div className="absolute right-5 top-10 opacity-50 w-0 h-0 md:w-64 md:h-48 lg:w-128 lg:h-96 z-0">
              <LottieAnimation animationData={clockAnimation} />
           </div>
          </>
        }
      >
    
        <div className="w-full sm:w-128 mb-8 ml5">
            <a href="https://se.trustpilot.com/review/saveabl.se" target="_blank" rel="noopener noreferrer">
            <img src="/images/trustpilot_reviews.png" alt="Trustpilot" className="h-12 w-auto" />
           </a>
          </div>

        <Title>{compText.title}</Title>
        <BodyText>{compText.text} </BodyText>
        <a
          className="mt-4 font-bold text-neutral-700 flex items-center gap-2 cursor-pointer hover:gap-4 hover:text-neutral-600 transition-all group"
          href="https://se.trustpilot.com/review/saveabl.se"
        >
          {compText.read_all_reviews}{" "}
          <AiOutlineArrowRight className="group-hover:text-accent" />
        </a>

        <Grid>
          {reviews.map((review) => (
            <ReviewTile key={`review-${review.id}`} {...review} />
          ))}
        </Grid>
      </Section>
    </>
  );
};

export default Reviews;
