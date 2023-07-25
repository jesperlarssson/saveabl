import { Mealkit } from '@/types';
import { addDays, differenceInDays, endOfWeek, endOfYear, startOfWeek, startOfYear } from 'date-fns';
import React from 'react';



interface CalendarProps {
  year: number;
  mealkits: Mealkit[];
}

const Calendar: React.FC<CalendarProps> = ({ year, mealkits }) => {
  const calendar = getCalendar(year);

  return (
    <div className="grid grid-cols-7 gap-4">
      {calendar.map((week, index) => {
        const weekNumber = index + 1;
        const mealkit = mealkits.find(m => m.weekNumber === weekNumber);
        return (
          <div key={weekNumber} className="col-span-7 bg-gray-200 p-4">
            <Week weekNumber={weekNumber} mealkit={mealkit} />
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;


function getCalendar(year: number): Date[][] {
    const startDate = startOfWeek(startOfYear(new Date(year)));
    const endDate = endOfWeek(endOfYear(new Date(year)));
    const dayCount = differenceInDays(endDate, startDate) + 1;
    let currentDay = startDate;
  
    const calendar = [];
    for (let i = 0; i < dayCount; i += 7) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        week.push(new Date(currentDay));
        currentDay = addDays(currentDay, 1);
      }
      calendar.push(week);
    }
    return calendar;
  }
  
  interface WeekProps {
    weekNumber: number;
    mealkit?: Mealkit;
  }
  
  const Week: React.FC<WeekProps> = ({ weekNumber, mealkit }) => (
    <div className="week">
      <h2>Vecka {weekNumber}</h2>
      {mealkit && <div>TEST</div>}
    </div>
  );