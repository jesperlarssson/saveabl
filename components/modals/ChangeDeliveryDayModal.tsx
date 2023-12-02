"use client";

import React, { useEffect, useState } from "react";

import useChangeDeliveryDayModal from "@/hooks/useChangeDeliveryDayModal";
import Modal from "@/components/ui/Modal";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";
import useMessageModal from "@/hooks/useMessageModal";
import { useLang } from "@/hooks/useLang";
import getDeliveryWindowsForPostalCode from "@/actions/getDeliveryWindowsForPostalCode";

const ChangeDeliveryDayModal = () => {
  const [options, setOptions] = useState<any[]>([]);
  const { onClose, isOpen, customerEmail, postalCode, customerId, isPaused } =
    useChangeDeliveryDayModal();
  const { onOpen, forMessage } = useMessageModal();
  const { text } = useLang();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const textData = text?.my_pages;

  const addTodo = async (action: string, wish: string) => {
    try {
      const res = await axios.post("/api/add-todo", {
        customer_email: customerEmail,
        customer_id: customerId,
        actions: action,
        wish: wish,
      });
      forMessage(true, "");
      onOpen();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnUpdateDeliveryDay = async (desiredDay: number) => {
    addTodo("CHANGE_DAY", `Vill uppdatera till ${desiredDay}.`);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const intervalValue = data.get("toDate");
    handleOnUpdateDeliveryDay(intervalValue);
  };

  useEffect(() => {
    const getOptions = async () => {
      console.log(postalCode);
      try {
        const deliveryWindows = await getDeliveryWindowsForPostalCode(
          postalCode || "11111",
          "se"
        );
        setOptions(deliveryWindows.windows);
      } catch (error) {
        console.log(error);
      }
    };
    getOptions();
  }, [postalCode]);

  return (
    <Modal
      title={textData?.dayModalTitle}
      description={textData?.dayModalDescription}
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-8 p-4"
          >
            <select
              className={twMerge(
                `w-full border col-span-2 border-primary bg-transparent p-2 rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none focus:border-secondary focus:ring-1 
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-accent invalid:text-accent
          focus:invalid:border-accent focus:invalid:ring-accent`
              )}
              name="toDate"
              id="toDate"
            >
              <option value="" disabled selected>
                {textData?.deliveryDayModalPlaceholder}
              </option>
              {options.map((option) => (
                <option key={option.start + option.end} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <Button type="submit" className="">
              {textData?.change_delivery_day_button}
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};
export default ChangeDeliveryDayModal;
