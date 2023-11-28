"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import useChangeIntervalModal from "@/hooks/useChangeIntervalModal";
import Modal from "@/components/ui/Modal";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";
import useMessageModal from "@/hooks/useMessageModal";
import { useLang } from "@/hooks/useLang";

const ChangeIntervalModal = () => {


  const { onClose, isOpen, customerEmail, customerId, isPaused } =
    useChangeIntervalModal();
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

  const handleOnUpdateInterval = async (desiredInterval: number) => {
    addTodo("CHANGE", `Vill uppdatera till ${desiredInterval}.`);
  };

  const handleIntervalSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const intervalValue = data.get("interval");
    handleOnUpdateInterval(intervalValue);
  };

  return (
    <Modal
      title={textData?.intervalModalTitle}
      description={textData?.intervalModalDescription}
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col">
          <form
            onSubmit={handleIntervalSubmit}
            className="w-full flex flex-col gap-8 p-4"
          >
            <select
              className={twMerge(
                `w-full border col-span-2 border-primary bg-transparent p-2 rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none focus:border-secondary focus:ring-1 
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-accent invalid:text-accent
          focus:invalid:border-accent focus:invalid:ring-accent`
              )}
              name="interval"
              id="interval"
            >
              <option value="varje vecka">{textData?.intervalOption1}</option>
              <option value="varannan vecka">
                {textData?.intervalOption2}
              </option>
            </select>
            <Button type="submit" className="">
              {textData?.intervalButton}
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};
export default ChangeIntervalModal;
