"use client";


import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { motion } from "framer-motion";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Image from "next/image";

import Button from "../ui/Button";
import Section from "../ui/Section";

const Hero = () => {
  return (
    <div className="w-full h-screen -mt-32 flex flex-col justify-center">
      <Section>
        <div className="grid grid-cols-2  justify-between gap-x-12 text-secondary ">
          <div className=" w-full h-fit overflow-hidden rounded-lg  shadow-primary-800  drop-shadow-xl">
            <LiteYouTubeEmbed
              aspectHeight={9}
              aspectWidth={16}
              id="SxbsaJLzIiE"
              title="Saveabl - explainer video"
            />
          </div>
          <div>
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
              className="ml-8  font-poppins text-4xl 2xl:text-5xl leading-tight max-w-xl"
            >
              Färdiga matkassen som gör klimatet en tjänst
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="ml-8"
            >
              Klimatvänligt på en helt ny nivå.
            </motion.p>
            <Button className="ml-8">Beställ nu</Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Hero;
