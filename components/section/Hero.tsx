"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { motion } from "framer-motion";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Image from "next/image";

import Button from "../ui/Button";
import Section from "../ui/Section";
import { Parallax } from "react-scroll-parallax";

const Hero = () => {
  return (
    <div className="w-full h-screen -mt-32 flex flex-col justify-center">
      <Section>
        <Parallax speed={10}>
          <div className="flex flex-col  justify-center items-center gap-y-12 text-secondary ">
            <div className="w-128 h-fit overflow-hidden rounded-lg  shadow-primary-800  drop-shadow-xl">
              <LiteYouTubeEmbed
                aspectHeight={9}
                aspectWidth={16}
                id="SxbsaJLzIiE"
                title="Saveabl - explainer video"
              />
            </div>
            <div className="-ml-8">
              <Image
                width={660 / 2}
                height={140 / 2}
                alt="Hand scribbles"
                src={"/images/byline.png"}
              />
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="ml-8 -mt-16 font-poppins text-4xl md:text-5xl max-w-3xl text-center"
              >
                Färdiga matkassen som gör klimatet en tjänst
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="ml-8 mt-4 mb-12 text-gray-700 text-center text-xl tracking-wide"
              >
                Klimatvänligt på en helt ny nivå.
              </motion.p>
              <div className="flex justify-center">
                <Button className="ml-8 w-full md:w-96 ">Beställ nu</Button>
              </div>
            </div>
          </div>
        </Parallax>
      </Section>
    </div>
  );
};

export default Hero;
