"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { illustration, positions } from "@/lib/illustrations";
import { twMerge } from "tailwind-merge";

import matkasseAnimation from "../../public/anim/Matkasse.json";

import LottieAnimation from "./LottieAnimation";
import { Parallax } from "react-scroll-parallax";

const IllustrationsBg = () => {
  return (
    <Parallax speed={-40}>
      <div className="w-screen max-w-screen-2xl h-screen p-24 opacity-60 relative flex justify-between">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0.6, 0.8], // cycle between 60% and 80% opacity
            scale: [1, 1.05], // cycle between 100% and 105% scale
            rotate: [0, 5, 0, -5, 0], // rotate element for wiggle effect
          }}
          transition={{
            duration: 3, // slow wiggle effect
            ease: "linear",
            loop: Infinity, // infinite animation
            repeatDelay: 0, // delay between each loop
          }}
        >
          <Image
            width={300}
            height={300}
            className="hidden md:block object-contain"
            alt={illustration[0].alt}
            src={illustration[0].path}
          />
        </motion.div>

        <div className="flex flex-col justify-between items-end z-1 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Image
              width={400}
              height={400}
              className="md:block object-contain "
              alt={illustration[2].alt}
              src={illustration[2].path}
            />
          </motion.div>
          <div className="translate-x-36 z-1 relative">
            <LottieAnimation
              animationData={matkasseAnimation}
              style={{ height: 440 }}
            />
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default IllustrationsBg;
