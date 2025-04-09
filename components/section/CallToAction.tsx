"use client";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import Button from "../ui/Button";
import Section from "../ui/Section";
import { toast } from "react-hot-toast";
import Title from "../ui/Title";
import useLocationModal from "@/hooks/useLocationModal";
import { useLang } from "@/hooks/useLang";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactPortal, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import React from "react";

const CallToAction = () => {
  const locationModal = useLocationModal();
  const { lang, text } = useLang();
  const [compText, setCompText] = useState(text.page.call_to_action);
  const router = useRouter();
  useEffect(() => {
    setCompText(text.page.call_to_action);
  }, [text]);
  

  const sMatkassenImage =
    lang === "sv"
      ? "/images/s-matkassen.png"
      : lang === "en"
      ? "/images/s-matkassen_en.png"
      : lang === "da"
      ? "/images/s-matkassen_da.png"
      : "/images/s-matkassen.png"; // Om språk inte matchar, använd en standardbild

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
        <Title className="text-center mt-0">
        {compText.title.map((line: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined, index: Key | null | undefined) => (
         <React.Fragment key={index}>
          {line}
          <br />
    </React.Fragment>
  ))}
</Title>
        <div className="mt-10 mb-5 grid grid-cols-2 sm:grid-cols-4 gap-8 text-secondary sm:px-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center sm:w-40"
          >
            <h3 className="font-poppins text-5xl mb-2 ">3</h3>
            <p className="text-md sm:text-xl -mt-2 font-light ">{compText.meals}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center sm:w-40"
          >
            <h3 className="font-poppins text-5xl mb-2 ">100%</h3>
            <p className="text-md sm:text-xl -mt-2 font-light ">{compText.vegetarian}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center sm:w-40"
          >
            <h3 className="font-poppins text-5xl mb-3 sm:mb-2">5x</h3>
            <p className="text-md sm:text-xl -mt-2 font-light text-center leading-none">
              {compText.price_per_portion}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center sm:w-40"
          >
            <h3 className="font-poppins text-5xl mb-2">15</h3>
            <p className="text-md sm:text-xl -mt-2 font-light ">{compText.cooking_time}</p>
          </motion.div>
        </div>
        <Button
          onClick={() => router.push("/bestall?id=1")}
          className="mt-8 w-full md:w-96 "
        >
          {compText.order_now}
        </Button>
      </div>
    </Section>
  );
};

export default CallToAction;
