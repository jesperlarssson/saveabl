import { getWeek } from "date-fns";
import { getTargetDayEpoch } from "@/helpers/format";
import { Mealkit } from "../types";
import toast from "react-hot-toast";

export const updateMealkit = async (mealkit: Mealkit) => {
  try {
   const res = await fetch("/api/admin/mealkits", {
      method: "POST",
      body: JSON.stringify(mealkit),
    });
    console.log(res.text())
  } catch (error: any) {
    toast.error("Error creating mealkit");
  }
};

