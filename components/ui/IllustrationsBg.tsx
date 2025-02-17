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
      <div className="w-screen max-w-screen-2xl h-screen p-24 opacity-60 relative flex justify-between overflow-hidden mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: 320 }} // Flyttar ner 100px
        >
          <Image
            width={150}
            height={150}
            className="hidden md:block object-contain animate-wiggle"
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
              width={0}
              height={0}
              className="md:block object-contain animate-wiggle"
              alt={illustration[2].alt}
              src={illustration[2].path}
            />
          </motion.div>
          <div className="translate-x-36 z-1 relative ">
            <div className="animate-wiggle">
              <LottieAnimation
                animationData={matkasseAnimation}
                style={{ height: 220 }}
              />
            </div>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default IllustrationsBg;
