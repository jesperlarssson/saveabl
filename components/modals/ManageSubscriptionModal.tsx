"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import useManageSubscriptionModal from "@/hooks/useManageSubscriptionModal";
import Modal from "@/components/ui/Modal";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";
import useMessageModal from "@/hooks/useMessageModal";
import { useLang } from "@/hooks/useLang";
import { StringLiteralType } from "typescript";
import toast from "react-hot-toast";

const ManageSubscriptionModal = () => {
  const [toggleType, setToggleType] = useState<boolean>(true);
  // Get today's date
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  // Calculate the date one month from now
  const oneMonthFromNow = new Date(today.setMonth(today.getMonth() + 2));
  const formattedOneMonthFromNow = oneMonthFromNow.toISOString().split("T")[0];
  const router = useRouter();
  const { onClose, isOpen, customerEmail, customerId, isPaused } =
    useManageSubscriptionModal();
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

  const handleOnPauseSubsription = async (numberOfMealkits: string) => {
    addTodo("PAUSE", `Vill pausa nästa ${numberOfMealkits} matkassar`);
  };

  const handleOnPauseSubsriptionWithDate = async (until: string) => {
    addTodo("PAUSE", `Vill pausa tills ${until}`);
  };

  const handleResumeSubscription = async () => {
    addTodo("RESUME", "Vill återuppta prenumerationen");
  };

  const handleNumberSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const numberOfMealkits = data.get("pause");
    if (numberOfMealkits && typeof numberOfMealkits === "string") {
      // Convert numberOfMealkits to a number and pass it to handleOnPauseSubsription
      handleOnPauseSubsription(numberOfMealkits);
    } else {
      toast.error("Please select a valid value");
    }
  };

  const handleDateSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const until = data.get("until");
    if (until && typeof until === "string") {
      // Convert numberOfMealkits to a number and pass it to handleOnPauseSubsription
      handleOnPauseSubsriptionWithDate(until);
    } else {
      toast.error("Please select a valid value");
    }
    
  };

  return (
    <Modal
      title={textData.modalTitle}
      description={textData.modalDescription}
      isOpen={isOpen}
      onChange={onChange}
    >
      {isPaused ? (
        <div>
          <Button onClick={handleResumeSubscription}>
            {textData.resumeSubscriptionButton}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-4">
          <div className="w-full flex">
            <div
              onClick={() => setToggleType(true)}
              className={twMerge(
                `w-1/2 border-b border-secondary py-2 cursor-pointer flex justify-center text-secondary transition opacity-50 hover:bg-primary-300`,
                toggleType && "border-b-2 font-bold opacity-100"
              )}
            >
              {textData.numberOfMealKits}
            </div>
            <div
              onClick={() => setToggleType(false)}
              className={twMerge(
                `w-1/2 border-b border-secondary py-2 cursor-pointer flex justify-center text-secondary transition opacity-50 hover:bg-primary-300`,
                !toggleType && "border-b-2 font-bold opacity-100"
              )}
            >
              {textData.date}
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
                  <option value="1">{textData.pauseOption1}</option>
                  <option value="2">{textData.pauseOption2}</option>
                  <option value="3">{textData.pauseOption3}</option>
                </select>
                <Button type="submit" className="">
                  {textData.pauseButton}
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
                  {textData.pauseButton}
                </Button>
              </form>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
export default ManageSubscriptionModal;
