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
  const { onClose, isOpen, customerEmail, customerId, isPaused } =
    useManageSubscriptionModal();
  const { onOpen, forMessage } = useMessageModal();
  const { text } = useLang();

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

  const handleResumeSubscription = async () => {
    addTodo("RESUME", "Vill återuppta prenumerationen");
  };

  const handleNumberSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const numberOfMealkits = data.get("pause");
    if (numberOfMealkits && typeof numberOfMealkits === "string") {
      handleOnPauseSubsription(numberOfMealkits);
    } else {
      toast.error("Please select a valid value");
    }
  };

  return (
    <Modal
      title={text?.my_pages.modalTitle}
      description={text?.my_pages.modalDescription}
      isOpen={isOpen}
      onChange={(open: boolean) => {
        if (!open) {
          onClose();
        }
      }}
    >
      {isPaused ? (
        <div>
          <Button onClick={handleResumeSubscription}>
            {text?.my_pages.resumeSubscriptionButton}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col">
            <form
              onSubmit={handleNumberSubmit}
              className="w-full flex flex-col gap-8 p-4"
            >
              <select
                className="w-full border col-span-2 border-primary bg-transparent p-2 rounded-md font-bold placeholder-secondary placeholder-opacity-10 text-secondary ring-1 ring-transparent focus:ring-primary focus:outline-none focus:border-secondary focus:ring-1 
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-accent invalid:text-accent
        focus:invalid:border-accent focus:invalid:ring-accent"
                name="pause"
                id="pause"
              >
                <option value="1">{text?.my_pages.pauseOption1}</option>
                <option value="2">{text?.my_pages.pauseOption2}</option>
                <option value="3">{text?.my_pages.pauseOption3}</option>
              </select>
              
              <Button type="submit">
                {text?.my_pages.pauseButton}
              </Button>
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
};
export default ManageSubscriptionModal;