"use client";

import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  src: string;
  type: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, type }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const options: any = {
      controls: true,
      autoplay: true,
      muted: true,
      loop: true,
      aspectRatio: "16:9",
      sources: [
        {
          src,
          type,
        },
      ],
    };

    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, options);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [src, type]);

  return (
    <div className="max-h-min" data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin w-full aspect-video"
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;
