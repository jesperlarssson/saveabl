import getAllMealkits from "@/actions/getAllMealkits";
import Calendar from "./components/Calendar";
import { Mealkit } from "@/types";

const CalendarView = async () => {
    const mealkits: Mealkit[] = await getAllMealkits();
  return (
    <div>
      <Calendar year={2023} mealkits={mealkits} />
    </div>
  );
};

export default CalendarView;
