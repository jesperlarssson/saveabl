"use client";

import dynamic from "next/dynamic";
import matkasse from "../../public/anim/Matkasse.json";
import klocka from "../../public/anim/Klocka.json";
import jordklot from "../../public/anim/Jordklot.json";

// Dynamisk import av LottieAnimation – bara på klienten
const LottieAnimation = dynamic(() => import("../ui/LottieAnimation"), {
  ssr: false,
});

const LoadingScreen = () => {
  const animationComponent = [
    <LottieAnimation key="loadinganimation-1" animationData={matkasse} />,
    <LottieAnimation key="loadinganimation-2" animationData={klocka} />,
    <LottieAnimation key="loadinganimation-3" animationData={jordklot} />,
  ];

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 h-96">
        {
          animationComponent[
            Math.floor(Math.random() * animationComponent.length)
          ]
        }
      </div>
    </div>
  );
};

export default LoadingScreen;
