"use client";
import React, { useState } from "react";
import Button from "../ui/Button";
import RecipesSection from "./RecipesSection";


const MoreRecipes = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div>
      {showMore && <RecipesSection limit={6} offset={12} />}
      <Button >Visa tidigare recept</Button>
    </div>
  );
};

export default MoreRecipes;
