"use client";
import React, { useState } from "react";
import { getUnixTime, startOfWeek, sub, setDay, getWeek, add, setMinutes, setHours } from "date-fns";

import { getTargetDayEpoch } from "@/helpers/format";

interface WeekSelectorProps {
  onWeekChange: (weekNumber: number, epochThursday: number, epochSaturday: number, epochMonday: number) => void;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ onWeekChange }) => {
  const currentWeek = getWeek(new Date());
  const [weekNumber, setWeekNumber] = useState<number>(currentWeek);

  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWeek = parseInt(event.target.value);
    setWeekNumber(selectedWeek);

    const epochThursday = getTargetDayEpoch(
      selectedWeek,
      new Date().getFullYear(),
      currentWeek,
      -3 // Thursday of the week before
    );

    const epochSaturday = getTargetDayEpoch(
      selectedWeek,
      new Date().getFullYear(),
      currentWeek,
      -2 // Saturday of the week before
    );

    const epochMonday = getTargetDayEpoch(
      selectedWeek,
      new Date().getFullYear(),
      currentWeek,
      1 // Monday of the given week
    );

    onWeekChange(selectedWeek, epochThursday, epochSaturday, epochMonday);
  };

  return (
    <div className="flex flex-col items-start">
      <label className="mb-2 font-bold text-lg">Välj en vecka: </label>
      <select
        value={weekNumber}
        onChange={handleWeekChange}
        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {Array.from({ length: 52 }, (_, i) => i + 1).map((week) => (
          <option key={week} value={week}>
            {week}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WeekSelector;
