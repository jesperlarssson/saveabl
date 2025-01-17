"use client";

import React, { useState, useEffect } from "react";
import VideoPlayer from "../ui/VideoPlayer";
import Section from "../ui/Section";
import TextBanner from "../ui/TextBanner";
import { textBannerText } from "@/lib/general";
import { useLang } from "@/hooks/useLang";

const ExplainerVideo = () => {
  const { lang, text } = useLang();

  const getVideoSrc = (lang: string) => {
    if (lang === "sv") {
      return "https://media.graphassets.com/q6eRau6SQmFmpQB4ROND"; // Svenska videon
    } else if (lang === "en") {
      return "https://media.graphassets.com/PyutQtmQfaaxnfRjJphR"; // Engelska videon
    } else if (lang === "da") {
      return "https://media.graphassets.com/hVsVFpvZS3aWxseSyYBc"; // Danska videon
    }
    return "https://media.graphassets.com/aDRcOn9LTgK1aMDDISQL"; // Standardvideo
  };

  const videoSrc = getVideoSrc(lang);

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
        {/* Dynamisk key för att tvinga omrendering */}
        <VideoPlayer key={lang} src={videoSrc} type="video/mp4" />
      </div>
    </Section>
  );
};

export default ExplainerVideo;
