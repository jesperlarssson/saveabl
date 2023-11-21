"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import useManageSubscriptionModal from "@/hooks/useManageSubscriptionModal";
import Modal from "@/components/ui/Modal";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";
import useMessageModal from "@/hooks/useMessageModal";

const ManageSubscriptionModal = () => {
  const [toggleType, setToggleType] = useState<boolean>(true);
  // Get today's date
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  // Calculate the date one month from now
  const oneMonthFromNow = new Date(today.setMonth(today.getMonth() + 2));
  const formattedOneMonthFromNow = oneMonthFromNow.toISOString().split("T")[0];
  const router = useRouter();
  const { onClose, isOpen, customerEmail, customerId } =
    useManageSubscriptionModal();
  const { onOpen, forMessage } = useMessageModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const addTodo = async (action: string, wish: string) => {
    try {
      const res = await axios.post("/api/add-todo", {
        customer_email: customerEmail,
        customer_id: customerId,
        actions: action,
        wish: wish,
      });
      onClose();
      forMessage(true, res.data.message);
      onOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnPauseSubsription = async (numberOfMealkits: number) => {
    addTodo("PAUSE", `Vill pausa nästa ${numberOfMealkits} matkassar`);
  };

  const handleOnPauseSubsriptionWithDate = async (until: Date) => {
    addTodo("PAUSE", `Vill pausa tills ${until}`);
  };

  const handleNumberSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const numberOfMealkits = data.get("pause");
    handleOnPauseSubsription(numberOfMealkits);
  };

  const handleDateSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const until = data.get("until");
    handleOnPauseSubsriptionWithDate(until);
  };

  return (
    <Modal
      title="Hantera Prenumeration"
      description="Här kan du pausa, byta intervall eller avbryta din prenumeration."
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        <div className="w-full flex">
          <div
            onClick={() => setToggleType(true)}
            className={twMerge(
              `w-1/2 border-b border-secondary py-2 cursor-pointer flex justify-center text-secondary transition opacity-50 hover:bg-primary-300`,
              toggleType && "border-b-2 font-bold opacity-100"
            )}
          >
            Antal
          </div>
          <div
            onClick={() => setToggleType(false)}
            className={twMerge(
              `w-1/2 border-b border-secondary py-2 cursor-pointer flex justify-center text-secondary transition opacity-50 hover:bg-primary-300`,
              !toggleType && "border-b-2 font-bold opacity-100"
            )}
          >
            Datum
          </div>
        </div>
        {toggleType ? (
          <div className="flex flex-col">
            <form
              onSubmit={handleNumberSubmit}
              className="w-full flex flex-col gap-8 p-4"
            >
              <select
                className={twMerge(
                  `w-full border col-span-2 border-primary bg-transparent p-2 rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none focus:border-secondary focus:ring-1 
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-accent invalid:text-accent
          focus:invalid:border-accent focus:invalid:ring-accent`
                )}
                name="pause"
                id="pause"
              >
                <option value="1">Nästkommande matkasse</option>
                <option value="2">Nästa två matkassar</option>
                <option value="3">Nästa tre matkassar</option>
              </select>
              <Button type="submit" className="">
                Pausa
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col">
            <form
              onSubmit={handleDateSubmit}
              className="w-full flex flex-col gap-8 p-4"
            >
              <input
                className={twMerge(
                  `w-full border col-span-2 border-primary bg-transparent p-2 rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none focus:border-secondary focus:ring-1 
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-accent invalid:text-accent
        focus:invalid:border-accent focus:invalid:ring-accent`
                )}
                type="date"
                id="start"
                name="until"
                //value={formattedToday}
                min={formattedToday}
                max={formattedOneMonthFromNow}
              ></input>

              <Button type="submit" className="">
                Pausa
              </Button>
            </form>
          </div>
        )}
      </div>
    </Modal>
  );
};
export default ManageSubscriptionModal;
