"use client";

import Lottie from "lottie-react";
import gardAnimation from "../../public/anim/gard.json"; // justera sökvägen om behövs

const LottieStockholm = () => {
  return (
    <Lottie animationData={gardAnimation} loop className="w-[300px] h-[100px]" />
  );
};

export default LottieStockholm;
