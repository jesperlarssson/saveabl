// "use client";
// import { useEffect, useState } from "react";
// import Papa from "papaparse";
// import {
//   format,
//   eachDayOfInterval,
//   endOfWeek,
//   getWeek,
//   getDay,
//   getDate,
//   isPast,
//   set,
// } from "date-fns";
// import { useRouter } from "next/navigation";
// import Day from "./Day";
// import { Delivery, Mealkit, Price } from "@/types";
// import Button from "@/components/ui/Button";
// import { createNewMealkitWithWeekNumber } from "@/actions/createNewMealkit";
// import toast from "react-hot-toast";
// import { twMerge } from "tailwind-merge";
// import useWeekOptionsModal from "@/hooks/useWeekOptionsModal";
// import { motion } from "framer-motion";

// interface WeekProps {
//   startDate: Date;
//   productOptions?: any;
//   mealkit: Mealkit | undefined;
//   deliveriesForWeek: Delivery[] | undefined;
// }

// const Week: React.FC<WeekProps> = ({
//   startDate,
//   mealkit,
//   deliveriesForWeek,
//   productOptions,
// }) => {
//   const router = useRouter();
//   const daysInWeek = eachDayOfInterval({
//     start: startDate,
//     end: endOfWeek(startDate),
//   });
//   const hasPast = isPast(startDate);
//   const [amountSold, setAmountSold] = useState<number>(
//     deliveriesForWeek?.filter((delivery) => delivery.mealkit_id === mealkit?.id)
//       .length ?? 0
//   );
//   const [soldOut, setSoldOut] = useState<boolean>(false);

//   useEffect(() => {
//     setAmountSold(
//       deliveriesForWeek?.filter(
//         (delivery) => delivery.mealkit_id === mealkit?.id
//       ).length ?? 0
//     );
//   }, [deliveriesForWeek]);

//   useEffect(() => {
//     if (mealkit) {
//       setSoldOut(amountSold >= mealkit?.quantity);
//     }
//   }, [amountSold, mealkit?.quantity]);

//   const { setMealkit, onOpen, setProductOptions } = useWeekOptionsModal();
//   useEffect(() => {
//     setProductOptions(productOptions);
//   }, [productOptions]);

//   const [quantity, setQuantity] = useState<number>(50);
//   const [productId, setProductId] = useState<string>(
//     productOptions[0]?.products.id ?? ""
//   );

//   const handleCreateMealkit = async () => {
//     try {
//       await createNewMealkitWithWeekNumber(
//         getWeek(startDate),
//         quantity,
//         productId
//       );
//       router.refresh();
//       toast.success("Mealkit skapad");
//     } catch (error: any) {
//       toast.error(error.message);
//     }
//   };

//   const deliveriesToCsv = () => {
//     if (!deliveriesForWeek) return;
//     const data = deliveriesForWeek.map((delivery) => {
//       const delivery_date = new Date(delivery.selectedWeekDayEpoch! * 1000);
//       const add_ons = delivery.addOns?.map((addOn) => addOn.name).join(", ");
//       const user_name = delivery.users?.full_name;
//       const billing_address = delivery.users?.billing_address;

//       return {
//         delivery_date,
//         add_ons,
//         user_name,
//         billing_address,
//       };
//     });

//     const csv = Papa.unparse(data);
//     return csv;
//   };

//   const downloadCsv = (csv: string, filename: string) => {
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = filename;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleExportDeliveries = () => {
//     const csv = deliveriesToCsv();
//     if (!csv) return;
//     downloadCsv(csv, `lev-v-${mealkit?.week_number}.csv`);
//   };

//   return (
//     <div className="col-span-7 grid grid-cols-7 gap-4">
//       <div
//         onClick={() => {
//           if (hasPast) return;
//           if (!mealkit?.active) return;
//           setMealkit(mealkit);
//           onOpen();
//         }}
//         className={twMerge(
//           `col-span-7 w-full flex  items-center justify-between gap-8 bg-primary rounded-md text-center py-2 px-4 pointer-events-auto text-secondary drop-shadow-sm border-2 border-primary-600`,
//           [
//             mealkit?.active &&
//               "bg-green-500 border-2 border-green-700 text-green-900 cursor-pointer hover:drop-shadow-xl hover:-translate-y-1 pointer-events-auto transition",
//             hasPast && "pointer-events-none opacity-50",
//             soldOut && "bg-red-500 border-2 border-red-700 text-red-900",
//           ]
//         )}
//       >
//         <p className="font-poppins">Vecka {getWeek(startDate)}</p>
//         {mealkit?.active && (
//           <>
//             <p>
//               <span className="font-bold">Totalt:</span> {mealkit?.quantity} st
//             </p>
//             {soldOut ? (
//               <p>Slutsåld</p>
//             ) : (
//               <p>
//                 <span className="font-bold">Beställda:</span>
//                 {amountSold} st
//               </p>
//             )}
//             <p>
//               {mealkit.cut_off_time && (
//                 <>
//                   <span className="font-bold">Sista beställningsdag:</span>{" "}
//                   {format(
//                     new Date(mealkit.cut_off_time * 1000),
//                     "dd/MM/yyyy HH:mm"
//                   )}
//                 </>
//               )}
//             </p>
//             {amountSold > 0 && (
//               <button
//                 onClick={handleExportDeliveries}
//                 className="bg-secondary text-primary rounded-md py-2 px-4"
//               >
//                 Exportera
//               </button>
//             )}
//           </>
//         )}

//         {!mealkit && !hasPast && (
//           <>
//             <input
//               disabled={hasPast}
//               placeholder="Antal"
//               type="number"
//               className="p-2 rounded-md text-center"
//               defaultValue={50}
//               onChange={(e) => {
//                 e.preventDefault();
//                 setQuantity(parseInt(e.target.value));
//               }}
//             />
//             <select
//               onChange={(e) => {
//                 e.preventDefault();
//                 setProductId(e.target.value);
//               }}
//               className="p-2 rounded-md text-center"
//             >
//               {productOptions
//                 ?.reduce((unique: any, price: Price) => {
//                   return unique.some(
//                     (item: any) => item.products.id === price?.products?.id
//                   )
//                     ? unique
//                     : [...unique, price];
//                 }, [])
//                 .map((price: any) => (
//                   <option key={price.products.id} value={price.products.id}>
//                     {price.products.name +
//                       " " +
//                       price.unit_amount / 100 +
//                       " kr"}
//                   </option>
//                 ))}
//             </select>

//             <Button
//               disabled={hasPast}
//               className="max-w-fit rounded-full px-6 text-sm"
//               onClick={handleCreateMealkit}
//             >
//               Skapa Matkasse för vecka
//             </Button>
//           </>
//         )}
//       </div>
//       {daysInWeek.map((day) => (
//         <Day
//           key={day.toString()}
//           day={day}
//           deliveries={deliveriesForWeek?.filter(
//             (delivery) =>
//               delivery.selectedWeekDayEpoch !== null &&
//               getDate(new Date(delivery.selectedWeekDayEpoch! * 1000)) ===
//                 getDate(day)
//           )}
//         />
//       ))}
//     </div>
//   );
// };

// export default Week;
