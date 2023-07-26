"use client";
import { useEffect, useState } from "react";
import {
  format,
  eachDayOfInterval,
  endOfWeek,
  getWeek,
  getDay,
  getDate,
  isPast,
  set,
} from "date-fns";
import { useRouter } from "next/navigation";
import Day from "./Day";
import { Delivery, Mealkit, Price } from "@/types";
import Button from "@/components/ui/Button";
import { createNewMealkitWithWeekNumber } from "@/actions/createNewMealkit";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import useWeekOptionsModal from "@/hooks/useWeekOptionsModal";
import { motion } from "framer-motion";

interface WeekProps {
  startDate: Date;
  productOptions?: any;
  mealkit: Mealkit | undefined;
  deliveriesForWeek: Delivery[] | undefined;
}

const Week: React.FC<WeekProps> = ({
  startDate,
  mealkit,
  deliveriesForWeek,
  productOptions,
}) => {
  const router = useRouter();
  const daysInWeek = eachDayOfInterval({
    start: startDate,
    end: endOfWeek(startDate),
  });
  const hasPast = isPast(startDate);
  const [amountSold, setAmountSold] = useState<number>(
    deliveriesForWeek?.filter((delivery) => delivery.mealkit_id === mealkit?.id)
      .length ?? 0
  );
  const [soldOut, setSoldOut] = useState<boolean>(false);

  useEffect(() => {
    setAmountSold(
      deliveriesForWeek?.filter(
        (delivery) => delivery.mealkit_id === mealkit?.id
      ).length ?? 0
    );
    if (mealkit) {
      setSoldOut(amountSold >= mealkit?.quantity ?? false);
    }
  }, [deliveriesForWeek]);

  const { setMealkit, onOpen, setProductOptions } = useWeekOptionsModal();
  useEffect(() => {
    setProductOptions(productOptions);
  }, [productOptions]);

  const [quantity, setQuantity] = useState<number>(50);
  const [productId, setProductId] = useState<string>(
    productOptions[0].products.id
  );

  const handleCreateMealkit = async () => {
    try {
      await createNewMealkitWithWeekNumber(
        getWeek(startDate),
        quantity,
        productId
      );
      router.refresh();
      toast.success("Mealkit skapad");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="col-span-7 grid grid-cols-7 gap-4">
      <div
        onClick={() => {
          if (hasPast) return;
          if (!mealkit?.active) return;
          setMealkit(mealkit);
          onOpen();
        }}
        className={twMerge(
          `col-span-7 w-full flex  items-center justify-between gap-8 bg-primary rounded-md text-center p-4 pointer-events-auto text-secondary`,
          [
            mealkit?.active &&
              "bg-green-500 border-2 border-green-700 text-green-900 cursor-pointer hover:scale-103 pointer-events-auto transition",
            hasPast && "pointer-events-none opacity-50",
            soldOut && "bg-red-500 border-2 border-red-700 text-red-900",
          ]
        )}
      >
        <p className="font-poppins">Vecka {getWeek(startDate)}</p>
        {mealkit?.active && (
          <>
            <p>
              <span className="font-bold">Totalt:</span> {mealkit?.quantity} st
            </p>
            {soldOut ? (
              <p>Slutsåld</p>
            ) : (
              <p>
                <span className="font-bold">Beställda:</span>
                {amountSold} st
              </p>
            )}
            <p>
              {mealkit.cut_off_time && (
                <>
                  <span className="font-bold">Sista beställningsdag:</span>{" "}
                  {format(
                    new Date(mealkit.cut_off_time * 1000),
                    "dd/MM/yyyy HH:mm"
                  )}
                </>
              )}
            </p>
          </>
        )}

        {!mealkit && !hasPast && (
          <>
            <input
              disabled={hasPast}
              placeholder="Antal"
              type="number"
              className="p-2 rounded-md text-center"
              defaultValue={50}
              onChange={(e) => {
                e.preventDefault();
                setQuantity(parseInt(e.target.value));
              }}
            />
            <select
              onChange={(e) => {
                e.preventDefault();
                setProductId(e.target.value);
              }}
              className="p-2 rounded-md text-center"
            >
              {productOptions
                ?.reduce((unique: any, price: Price) => {
                  return unique.some(
                    (item: any) => item.products.id === price?.products?.id
                  )
                    ? unique
                    : [...unique, price];
                }, [])
                .map((price: any) => (
                  <option key={price.products.id} value={price.products.id}>
                    {price.products.name +
                      " " +
                      price.unit_amount / 100 +
                      " kr"}
                  </option>
                ))}
            </select>

            <Button
              disabled={hasPast}
              className="max-w-fit"
              onClick={handleCreateMealkit}
            >
              Skapa Matkasse för vecka
            </Button>
          </>
        )}
      </div>
      {daysInWeek.map((day) => (
        <Day
          key={day.toString()}
          day={day}
          deliveries={deliveriesForWeek?.filter(
            (delivery) =>
              delivery.selectedWeekDayEpoch !== null &&
              getDate(new Date(delivery.selectedWeekDayEpoch! * 1000)) ===
                getDate(day)
          )}
        />
      ))}
    </div>
  );
};

export default Week;
