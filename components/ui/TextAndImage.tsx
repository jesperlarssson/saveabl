import React from "react";
import Section from "./Section";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

interface TextAndImageProps {
  title: string;
  text: string;
  anchorId?: string;
  link?: string;
  imageUrl: string;
  className?: string;
  reverse?: boolean;
}

const TextAndImage: React.FC<TextAndImageProps> = ({
  title,
  text,
  anchorId,
  link,
  imageUrl,
  className,
  reverse = false,
}) => {
  return (
    <Section narrow className="py-10">
      <div
        id={anchorId}
        className={twMerge(`flex gap-8 justify-center items-center`, [
          className,
          reverse
            ? "flex-col-reverse sm:flex-row-reverse"
            : "flex-col-reverse sm:flex-row",
        ])}
      >
        <div className="flex flex-col gap-2 w-full sm:w-1/2 ">
          <h3 className="font-poppins text-secondary text-xl sm:text-2xl">
            {title}
          </h3>
          <p className="text-gray-700">{text}</p>
        </div>
        <div className=" w-full sm:w-1/2 h-80 rounded-lg overflow-hidden relative">
          <Image
            alt={title}
            src={imageUrl}
            width={400}
            height={350}
            className="object-cover w-full h-full "
          />
        </div>
      </div>
    </Section>
  );
};

export default TextAndImage;
