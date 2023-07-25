"use client";

import React from "react";
import WeekSelector from "./WeekSelector";
import toast from "react-hot-toast";
import { Price, Product } from "@/types";
import MealKitFactoryForm from "./MealKitFactoryForm";

interface AdminContentProps {
  pricesWithProducts: Price[];
}

const AdminContent: React.FC<AdminContentProps> = ({ pricesWithProducts }) => {


  return (
    <div>
      <MealKitFactoryForm pricesWithProducts={pricesWithProducts} />
    </div>
  );
};

export default AdminContent;
