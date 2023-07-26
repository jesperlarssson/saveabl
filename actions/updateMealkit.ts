import { getWeek } from "date-fns";
import { getTargetDayEpoch } from "@/helpers/format";
import { Mealkit } from "../types";
import toast from "react-hot-toast";

export const updateMealkit = async (mealkit: Mealkit) => {
  try {
    await fetch("/api/admin/mealkits", {
      method: "POST",
      body: JSON.stringify(mealkit),
    });
  } catch (error) {
    toast.error("Error creating mealkit");
  }
};
