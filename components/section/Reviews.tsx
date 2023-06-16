import React from "react";
import Head from "next/head";
import TrustPilotWidget from "./TrustPilotWidget";
import Section from "../ui/Section";
import InjectScriptComponent from "../general/InjectScript";
import Grid from "../ui/Grid";
import { reviews } from "@/lib/reviews";
import ReviewTile from "../general/ReviewTile";
import LottieAnimation from "../ui/LottieAnimation";
import globAnimation from "../../public/anim/Jordklot.json";
import clockAnimation from "../../public/anim/Klocka.json";

const Reviews = () => {
  return (
    <>
      <InjectScriptComponent />
      <Section
        className="bg-primary"
        bgIllustrationComponent={
          <>
           <div className="absolute left-20 bottom-2 opacity-50 w-96 h-96 z-0">
            <LottieAnimation
              animationData={globAnimation}
            />
          </div>
          <div className="absolute right-10 top-10 opacity-50 w-128 h-96 z-0">
            <LottieAnimation
              animationData={clockAnimation}
            />
          </div>
          </>
         
        }
      >
        <TrustPilotWidget />
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
