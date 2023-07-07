"use client";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { toast } from "react-hot-toast";

interface ProductTileProps {
  title: string;
  excerpt?: string;
  description: string;
  price?: number;
  portions?: number;
  onClick?: () => void;
  favorite?: boolean;
  imgSrc: string;
  id: string;
  onExpand: (id: string) => void;
  isExpanded?: boolean;
  children?: React.ReactNode;
}

const ProductTile: React.FC<ProductTileProps> = ({
  title,
  excerpt,
  description,
  imgSrc,
  price,
  portions,
  onClick,
  favorite = false,
  id,
  onExpand,
  isExpanded,
  children,
}) => {
  return (
    <motion.div
      key={id}
      onClick={() => onExpand(isExpanded ? "" : id)}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className={twMerge(
        `w-full h-64   relative rounded-lg  drop-shadow-lg cursor-pointer  hover:drop-shadow-2xl overflow-auto`,
        [
          favorite && "border-4 border-accent",
          isExpanded ? "absolute inset-0 w-full h-full z-30  " : "",
        ]
      )}
    >
      <Image fill className="object-cover" alt="" src={imgSrc} />
      <div
        className={twMerge(
          `absolute top-0 left-0 h-full w-full flex flex-col justify-end p-4  bg-black bg-opacity-30 text-primary-200`
        )}
      >
        <h3 className="text-2xl font-poppins bg-primary max-w-fit text-secondary px-2">
          {title}
        </h3>
        {isExpanded ? (
          <>
            <div className="absolute top-0 right-0 p-2 flex"></div>
            <p className="text-xl max-w-4xl my-4">{description}</p>
            <Button
              onClick={() => toast.error("Inte implementerat ännu")}
              className="max-w-fit"
            >
              Beställ nu för {price} kr ({portions} portioner)
            </Button>
          </>
        ) : (
          <p className="text-xl mt-2">{excerpt}</p>
        )}
      </div>
      {favorite && (
        <div className="absolute top-0 right-0 p-2 flex">
          <span className="font-poppins text-accent mr-2">Mest populär</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-accent"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M10 18.333l-1.667-1.667C4.167 12.5 1.667 9.167 1.667 5c0-2.5 2-4.167 4.167-4.167 1.667 0 3.333 1.667 5 3.333C13.333 1.667 15 0 16.667 0 18.333 0 20 1.667 20 3.333c0 4.167-2.5 7.5-7.5 11.667L10 18.333z"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
};
export default ProductTile;
