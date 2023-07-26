"use client";
import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  getWeek,
} from "date-fns";
import Week from "./Week";
import { Delivery, Mealkit } from "@/types";

interface CalendarProps {
  mealkits: Mealkit[];
  deliveries?: Delivery[];
  productOptions?: any;
}

const Calendar: React.FC<CalendarProps> = ({
  mealkits,
  deliveries,
  productOptions,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeksInMonth = eachWeekOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const navigateMonth = (offset: number) => {
    setCurrentMonth(
      (prevMonth) => new Date(prevMonth.setMonth(prevMonth.getMonth() + offset))
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-6 pb-6 border-b border-primary-500">
        <button
          className="border border-secondary rounded-full px-6 py-2 text-secondary hover:bg-primary hover:bg-opacity-40 hover:drop-shadow-md"
          onClick={() => navigateMonth(-1)}
        >
          Föregående
        </button>
        <h2 className="text-xl font-poppins text-secondary">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          className="border border-secondary rounded-full px-6 py-2 text-secondary hover:bg-primary hover:bg-opacity-40 hover:drop-shadow-md"
          onClick={() => navigateMonth(1)}
        >
          Nästa
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((day) => (
          <div className="text-center font-poppins text-primary" key={day}>
            {day}
          </div>
        ))}
        {weeksInMonth.map((weekStart, index) => {
          const mealkit = mealkits?.find(
            (mealkit) => mealkit.weekNumber === getWeek(weekStart)
          );
          const nextWeekMealkit = mealkits?.find(
            (mealkit) => mealkit.weekNumber === getWeek(weekStart) + 1
          );
          const deliveriesForWeek = deliveries?.filter(
            (delivery) =>
              delivery.mealkit_id === mealkit?.id ||
              delivery.mealkit_id === nextWeekMealkit?.id
          );
          return (
            <Week
              key={index}
              startDate={weekStart}
              mealkit={mealkit}
              deliveriesForWeek={deliveriesForWeek}
              productOptions={productOptions}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

// import { Mealkit } from '@/types';
// import { addDays, differenceInDays, endOfWeek, endOfYear, startOfWeek, startOfYear } from 'date-fns';
// import React from 'react';

// interface CalendarProps {
//   year: number;
//   mealkits: Mealkit[];
// }

// const Calendar: React.FC<CalendarProps> = ({ year, mealkits }) => {
//   const calendar = getCalendar(year);

//   return (
//     <div className="grid grid-cols-7 gap-4">
//       {calendar.map((week, index) => {
//         const weekNumber = index + 1;
//         const mealkit = mealkits.find(m => m.weekNumber === weekNumber);
//         return (
//           <div key={weekNumber} className="col-span-7 bg-gray-200 p-4">
//             <Week weekNumber={weekNumber} mealkit={mealkit} />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Calendar;

// function getCalendar(year: number): Date[][] {
//     const startDate = startOfWeek(startOfYear(new Date(year)));
//     const endDate = endOfWeek(endOfYear(new Date(year)));
//     const dayCount = differenceInDays(endDate, startDate) + 1;
//     let currentDay = startDate;

//     const calendar = [];
//     for (let i = 0; i < dayCount; i += 7) {
//       const week = [];
//       for (let j = 0; j < 7; j++) {
//         week.push(new Date(currentDay));
//         currentDay = addDays(currentDay, 1);
//       }
//       calendar.push(week);
//     }
//     return calendar;
//   }

//   interface WeekProps {
//     weekNumber: number;
//     mealkit?: Mealkit;
//   }

//   const Week: React.FC<WeekProps> = ({ weekNumber, mealkit }) => (
//     <div className="week">
//       <h2>Vecka {weekNumber}</h2>
//       {mealkit && <div>TEST</div>}
//     </div>
//   );
