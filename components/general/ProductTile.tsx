"use client";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/Button";
import { toast } from "react-hot-toast";
import { useRecipes } from "@/hooks/useRecipes";
import Link from "next/link";
import useCheckout from "@/hooks/useCheckout";
import { AiOutlineClose } from "react-icons/ai";

interface ProductTileProps {
  key: string;
  product: any;
  onClick?: () => void;
  favorite?: boolean;
  onExpand: (id: string) => void;
  isExpanded?: boolean;
  children?: React.ReactNode;
}

const ProductTile: React.FC<ProductTileProps> = ({
  key,
  product,
  onClick,
  favorite = false,
  onExpand,
  isExpanded,
  children,
}) => {
  const { nextWeek } = useRecipes();
  const {  } = useCheckout();

  const handleAddToCheckout = () => {
    //TODO: Might need to change depending on product object from stripe/backend
    if (product.subscription) {
      if (product.everyWeek) {
        
      } else {
        
      }
    } else {
      if (product.portions < 12) {
       
      } else {
       
      }
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            key={key}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className={twMerge(
              `w-full absolute top-0 left-0 h-full z-30 rounded-lg  drop-shadow-lg cursor-pointer  overflow-auto `,
              [product.favorite && "border-4 border-accent"]
            )}
          >
            <Image fill className="object-cover" alt="" src={product.imgSrc} />
            <div
              className={twMerge(
                `absolute top-0 left-0 h-full w-full grid  items-end md:grid-cols-2 gap-4  p-4  bg-black bg-opacity-40 text-primary-200`
              )}
            >
              <button
                className="absolute right-0 top-0 m-4 p-4 rounded-xl bg-white bg-opacity-30 hover:bg-opacity-40"
                onClick={() => onExpand(isExpanded ? "" : product.id)}
              >
                <AiOutlineClose size={24} />
              </button>
              <div>
                <h3 className="text-2xl font-poppins bg-primary max-w-fit text-secondary px-2">
                  {product.title}
                </h3>
                <AnimatePresence mode="wait">
                  {isExpanded ? (
                    <>
                      <div className="absolute top-0 right-0 p-2 flex"></div>
                      <p className="text-xl max-w-4xl my-4">
                        {product.description}
                      </p>
                      <Button
                        onClick={handleAddToCheckout}
                        className="max-w-fit"
                      >
                        Beställ nu för {product.price} kr ({product.portions}{" "}
                        portioner)
                      </Button>
                    </>
                  ) : (
                    <p className="text-xl mt-2">{product.excerpt}</p>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-2"
                  >
                    <h2 className="font-poppins text-xl">
                      Nästa utkörning innehåller{" "}
                      {product.portions == 8 && "(två recept av)"} :
                    </h2>
                    {nextWeek.length > 2 ? (
                      nextWeek.map((recipe) => (
                        <Link
                          href={`/recept/${recipe.slug}`}
                          key={recipe.id}
                          className="w-full p-2 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30 grid grid-cols-6 gap-2"
                        >
                          <div className="relative h-20 w-full overflow-auto rounded-md">
                            <Image
                              fill
                              className="object-cover"
                              src={recipe.image.url}
                              alt=""
                            />
                          </div>
                          <div className="col-span-5">
                            <h3>{recipe.title}</h3>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="w-full h-36 bg-white bg-opacity-20 flex justify-center items-center">
                        <h1 className="text-xl">
                          Så fort recepten är klara kommer de visas här
                        </h1>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {product.favorite && (
              <div className="absolute top-0 left-0 sm:right-0 p-2 flex">
                <span className="font-poppins text-accent mr-2">
                  Mest populär
                </span>
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
        )}
      </AnimatePresence>
      {isExpanded ? (
        <div className="w-full h-64   relative rounded-lg bg-black bg-opacity-5"></div>
      ) : (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onExpand(isExpanded ? "" : product.id)}
          className={twMerge(
            `w-full h-64 rounded-lg  drop-shadow-lg cursor-pointer  hover:drop-shadow-2xl overflow-auto `,
            [
              product.favorite && "border-4 border-accent",
              isExpanded ? "hidden" : "",
            ]
          )}
        >
          <Image fill className="object-cover" alt="" src={product.imgSrc} />
          <div
            className={twMerge(
              `absolute top-0 left-0 h-full w-full grid  items-end  p-4  bg-black bg-opacity-40 text-primary-200`
            )}
          >
            <div>
              <h3 className="text-2xl font-poppins bg-primary max-w-fit text-secondary px-2">
                {product.title}
              </h3>

              <p className="text-xl mt-2">{product.excerpt}</p>
            </div>
          </div>
          {product.favorite && (
            <div className="absolute top-0 right-0 p-2 flex">
              <span className="font-poppins text-accent mr-2">
                Mest populär
              </span>
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
      )}
    </>
  );
};
export default ProductTile;
