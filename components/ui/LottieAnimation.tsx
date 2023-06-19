"use client";

import React, { useEffect, useRef } from "react";
import { useLottie } from "lottie-react";

interface LottieAnimationProps {
  animationData: Record<string, unknown>;
  style?: React.CSSProperties;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData, style }) => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { View } = useLottie(defaultOptions , style);

  return <>{View}</>;
};

export default LottieAnimation;
