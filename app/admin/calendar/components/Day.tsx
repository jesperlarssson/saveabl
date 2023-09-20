// import { Delivery } from "@/types";
// import { format } from "date-fns";
// import React from "react";
// import { twMerge } from "tailwind-merge";

// interface DayProps {
//   day: Date;
//   deliveries?: Delivery[] | undefined;
// }

// const Day: React.FC<DayProps> = ({ day, deliveries }) => {
//   return (
//     <div
//       className={twMerge(
//         `p-4 hover:drop-shadow-xl hover:bg-primary hover:bg-opacity-30 cursor-pointer transition rounded-md `,
//         deliveries &&
//           deliveries?.length > 0 &&
//           " bg-primary drop-shadow-sm border border-primary-600 bg-opacity-50"
//       )}
//     >
//       <div className="text-center font-poppins text-neutral-600" key={day.toString()}>
//         {format(day, "d")}
//       </div>
//       {deliveries && deliveries?.length > 0 && (
//         <p className="text-xs">{`Antal leveranser: ${deliveries?.length}`}</p>
//       )}
//     </div>
//   );
// };

// export default Day;
