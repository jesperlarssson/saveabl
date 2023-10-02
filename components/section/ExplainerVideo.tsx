import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import VideoPlayer from "../ui/VideoPlayer";
import Section from "../ui/Section";
import TextBanner from "../ui/TextBanner";
import { textBannerText } from "@/lib/general";

const ExplainerVideo = () => {
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
        <VideoPlayer src="https://media.graphassets.com/09byMtQKayU4vjSHGXfQ" type="video/mp4" />
      </div>
    </Section>
  );
};

export default ExplainerVideo;
