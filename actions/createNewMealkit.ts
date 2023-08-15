import { getWeek } from "date-fns";
import { getTargetDayEpoch } from "@/helpers/format";
import { Mealkit } from "../types";
import toast from "react-hot-toast";

export const createNewMealkitWithWeekNumber = async (
  weekNumber: number,
  quantity: number = 50,
  product_id: string
) => {
  const currentWeek = getWeek(new Date());
  const mealkit: Mealkit = {
    cut_off_time: getTargetDayEpoch(
      weekNumber,
      new Date().getFullYear(),
      currentWeek,
      -3 // Thursday of the week before
    ),
    week_number: weekNumber,
    delivery_range: {
      start: getTargetDayEpoch(
        weekNumber,
        new Date().getFullYear(),
        currentWeek,
        -2 // Thursday of the week before
      ),
      end: getTargetDayEpoch(
        weekNumber,
        new Date().getFullYear(),
        currentWeek,
        1 // Thursday of the week before
      ),
    },
    quantity,
    active: true,
    product_id,
  };
  try {
    const res = await fetch("/api/admin/mealkits", {
      method: "POST",
      body: JSON.stringify(mealkit),
    });
    console.log(res.text());
  } catch (error) {
    console.log(error);
    toast.error("Error creating mealkit");
  }
};
