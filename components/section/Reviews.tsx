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
        className="bg-primary flex flex-col items-start"
        bgIllustrationComponent={
          <>
            <div className="absolute left-20 bottom-2 opacity-50 w-96 h-96 z-0">
              <LottieAnimation animationData={globAnimation} />
            </div>
            <div className="absolute right-10 top-10 opacity-50 w-128 h-96 z-0">
              <LottieAnimation animationData={clockAnimation} />
            </div>
          </>
        }
      >
        <TrustPilotWidget />
        <h2 className="font-poppins text-secondary font-semibold text-5xl max-w-4xl mb-4">
          Över 20 000 räddade middagar, tillsammans gör vi skillnad!
        </h2>
        <p className="text-gray-900 opacity-80">
          Såhär säger några av våra miljöhjältar till kunder:{" "}
        </p>
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
