import { Delivery } from "@/types";
import { format } from "date-fns";
import React from "react";
import { twMerge } from "tailwind-merge";

interface DayProps {
  day: Date;
  deliveries?: Delivery[] | undefined;
}

const Day: React.FC<DayProps> = ({ day, deliveries }) => {
  return (
    <div
      className={twMerge(
        `p-4`,
        deliveries && deliveries?.length > 0 && "rounded-md bg-primary"
      )}
    >
      <div className="text-center" key={day.toString()}>
        {format(day, "d")}
      </div>
      {deliveries && deliveries?.length > 0 && (
        <p className="text-xs">{`Antal leveranser: ${deliveries?.length}`}</p>
      )}
    </div>
  );
};

export default Day;
