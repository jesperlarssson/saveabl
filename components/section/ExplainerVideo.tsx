"use client"
import React, { useContext } from "react";
import VideoPlayer from "../ui/VideoPlayer";
import Section from "../ui/Section";
import TextBanner from "../ui/TextBanner";
import { textBannerText } from "@/lib/general";
import { useLang } from "@/hooks/useLang";

const ExplainerVideo = () => {
  const { lang, text } = useLang();

  let videoSrc = "https://media.graphassets.com/aDRcOn9LTgK1aMDDISQL"; // Standardvideo

  if (lang === "sv") {
    videoSrc = "https://media.graphassets.com/q6eRau6SQmFmpQB4ROND"; // Svenska videon
  } else if (lang === "en") {
    videoSrc = "https://media.graphassets.com/PyutQtmQfaaxnfRjJphR"; // Engelska videon
  } else if (lang === "da") {
    videoSrc = "https://media.graphassets.com/hVsVFpvZS3aWxseSyYBc"; // Danska videon
  }

  return (
    <Section
      bgIllustrationComponent={
        <div className="h-full w-full flex flex-col justify-end">
          <div className="w-full h-1/2 bg-secondary">
            <TextBanner>{textBannerText}</TextBanner>
          </div>
        </div>
      }
      className="w-full p-8 max-h-fit"
    >
      <div className="rounded-xl overflow-hidden">
        <VideoPlayer src={videoSrc} type="video/mp4" />
      </div>
    </Section>
  );
};

export default ExplainerVideo;
