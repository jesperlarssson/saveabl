"use client";

import React from "react";
import WeekSelector from "./WeekSelector";
import toast from "react-hot-toast";
import { Price, Product } from "@/types";
import MealKitFactoryForm from "./MealKitFactoryForm";
import Button from "@/components/ui/Button";
import { getDay, getWeek } from "date-fns";

interface AdminContentProps {
  pricesWithProducts: Price[];
}

const AdminContent: React.FC<AdminContentProps> = ({ pricesWithProducts }) => {
  const getWeekNumber = (d: any) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  };

  const handleDayClicked = (day: Date) => {
    toast(`Vecka: ${getWeekNumber(day).toString()} - ${day.toString()} - ${getDay(day).toString()} `);
  };

  const getNextSaturdayAsDate = () => {
    const today = new Date();
    const day = today.getDay();
    const nextSaturday = new Date();
    nextSaturday.setDate(today.getDate() + (6 - day) + 7);
    return nextSaturday;
  };

  const getNextSundayAsDate = () => {
    const today = new Date();
    const day = today.getDay();
    const nextSunday = new Date();
    nextSunday.setDate(today.getDate() + (7 - day) + 7);
    return nextSunday;
  };

  const getNextMondayAsDate = () => {
    const today = new Date();
    const day = today.getDay();
    const nextMonday = new Date();
    nextMonday.setDate(today.getDate() + (8 - day) + 7);
    return nextMonday;
  };

  return (
    <div>
      <MealKitFactoryForm pricesWithProducts={pricesWithProducts} />
      <Button
        onClick={() => {
          const nextSaturday = getNextSaturdayAsDate();
          handleDayClicked(nextSaturday);
        }}
      >
        Lördag
      </Button>
      <Button 
        onClick={() => {
          const nextSunday = getNextSundayAsDate();
          handleDayClicked(nextSunday);
        }
      }
      >
        Söndag  
      </Button>
      <Button
        onClick={() => {
          const nextMonday = getNextMondayAsDate();
          handleDayClicked(nextMonday);
        }
      }
      >
        Måndag
      </Button>
    </div>
  );
};

export default AdminContent;
