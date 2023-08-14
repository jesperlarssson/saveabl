"use client";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import Button from "../ui/Button";
import Section from "../ui/Section";
import { toast } from "react-hot-toast";
import Title from "../ui/Title";
import useLocationModal from "@/hooks/useLocationModal";

const CallToAction = ({ ctaText }: { ctaText: any }) => {
  const locationModal = useLocationModal();
  return (
    <Section className="bg-primary-200 w-full relative pt-0">
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-full sm:w-128 -mt-16 sm:-mt-20 ml-10 z-20">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: -100 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.5, ease: "easeOut", duration: 1 }}
            >
              <Image
                className="object-contain"
                width={560}
                height={215}
                alt="Saveabl box plant"
                src="/images/plant-back.png"
              />
            </motion.div>
          </div>
          <div className="absolute left-0 top-0 w-full ">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 100, y: -40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ delay: 0, duration: 1 }}
            >
              <Image
                className="object-contain"
                width={560}
                height={215}
                alt="Saveabl box plant"
                src="/images/box-back.png"
              />
            </motion.div>
          </div>

          <div className="absolute left-0 top-0 w-full ">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 100 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.5, ease: "easeOut", duration: 1 }}
            >
              <Image
                className="object-contain"
                width={560}
                height={215}
                alt="Saveabl box plant"
                src="/images/plant-front.png"
              />
            </motion.div>
          </div>
          <div className="absolute left-0 top-0 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 1.2, x: -30, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <Image
                className="object-contain"
                width={560}
                height={215}
                alt="Saveabl box plant"
                src="/images/box-front.png"
              />
            </motion.div>
          </div>
        </div>
        <Image
          width={170}
          height={100}
          className="w-40 -mb-16 z-20"
          alt="scribble matkassen"
          src="/images/s-matkassen.png"
        />
        <Title className="text-center mt-8">{ctaText.title}</Title>
        <div className="mt-10 mb-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-secondary ">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center sm:w-40"
          >
            <h3 className="font-poppins text-5xl ">3</h3>
            <p className="text-xl -mt-2 font-light ">{ctaText.meals}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center sm:w-40"
          >
            <h3 className="font-poppins text-5xl ">100%</h3>
            <p className="text-xl -mt-2 font-light ">{ctaText.vegetarian}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center sm:w-40"
          >
            <h3 className="font-poppins text-5xl ">50</h3>
            <p className="text-xl -mt-2 font-light ">
              {ctaText.price_per_portion}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center sm:w-40"
          >
            <h3 className="font-poppins text-5xl ">15</h3>
            <p className="text-xl -mt-2 font-light ">{ctaText.cooking_time}</p>
          </motion.div>
        </div>
        <Button
          onClick={() => locationModal.onOpen()}
          className="mt-8 w-full md:w-96 "
        >
          {ctaText.order_now}
        </Button>
      </div>
    </Section>
  );
};

export default CallToAction;
