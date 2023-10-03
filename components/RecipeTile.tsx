import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Recipe } from "@/types";
import { getWeekNumber } from "@/helpers/format";
import { twMerge } from "tailwind-merge";
import { toast } from "react-hot-toast";
import { useLang } from "@/hooks/useLang";

interface RecipeTileProps {
  recipe: Recipe;
  fullWidth?: boolean;
}

const RecipeTile: React.FC<RecipeTileProps> = ({ recipe, fullWidth }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (recipe.deprecated) {
      e.preventDefault();
      toast.error("Detta recept är inte längre tillgängligt");
    }
  };
  const { lang } = useLang();
  const [recept, setRecept] = useState({
    title: lang != "sv" ? recipe?.title : recipe?.localizations[0].title,
  });

  useEffect(() => {
    const temp = {
      title: lang != "sv" ? recipe?.title : recipe?.localizations[0].title,
    };
    setRecept(temp);
  }, [lang, recipe]);
  return (
    <Link
      onClick={handleLinkClick}
      href={recipe.deprecated ? "#" : `recept/${recipe.slug}`}
    >
      <div
        className={twMerge(
          `relative cursor-pointer h-80 overflow-hidden rounded-xl bg-white group drop-shadow-lg hover:drop-shadow-xl hover:-translate-y-0 transition duration-300`,
          fullWidth && "rounded-none shadow-none hover:-translate-y-0"
        )}
      >
        {/** TailwindCss gradient background to transparent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent h-full"></div>

        <div className="relative bg-gray-300 bg-opacity-40   overflow-hidden h-full  ">
          <Image
            src={recipe.image?.url || "/images/placeholder.png"}
            alt={recept.title}
            width={400}
            height={350}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="bg-gradient-to-t from-secondary to-transparent  h-fit w-full sm:p-6 text-primary-200 absolute bottom-0 left-0 p-4">
          <p className="text-primary ">{`Vecka ${
            recipe.deprecated
              ? getWeekNumber(new Date(recipe.createdAt))
              : recipe.weekNr
          } ${recipe.deprecated ? "" : `- Dag ${recipe.recipeNumber}`}`}</p>

          <h3 className="font-poppins text-primary-200 text-md mt-2 group-hover:underline underline-offset-4 transition-all group-hover:mb-4">
            {recept.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default RecipeTile;
