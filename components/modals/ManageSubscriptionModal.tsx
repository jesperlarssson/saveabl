"use client";

import React, { useEffect, useState } from "react";
import useManageSubscriptionModal from "@/hooks/useManageSubscriptionModal";
import Modal from "@/components/ui/Modal";
import axios from "axios";
import Button from "../ui/Button";
import useMessageModal from "@/hooks/useMessageModal";
import { useLang } from "@/hooks/useLang";
import toast from "react-hot-toast";

// Funktion för att få veckonumret från ett datum
function getWeekNumber(date: Date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const firstThursday = new Date(startOfYear.getTime() +
    ((4 - startOfYear.getDay() + 7) % 7) * 86400000); // Antal millisekunder på en dag
  const thisThursday = new Date(date.getTime() +
    ((4 - date.getDay() + 7) % 7) * 86400000); // Antal millisekunder på en dag

  const weekNum = Math.ceil((thisThursday.getTime() - firstThursday.getTime()) / 604800000);

  return weekNum; // Veckonummer utan att lägga till 19
}

const ManageSubscriptionModal = () => {
  const { onClose, isOpen, customerEmail, customerId, isPaused } = useManageSubscriptionModal();
  const { onOpen, forMessage } = useMessageModal();
  const { text } = useLang();
  const [pauseOptions, setPauseOptions] = useState<React.ReactNode[]>([]);
  const [firstWeek, setFirstWeek] = useState<number>(0); // Lagrar den första veckan

  useEffect(() => {
    // Hämta den aktuella tiden med JavaScript
    const today = new Date();

    // Justera veckonumret baserat på veckobyten på torsdagar
    const currentWeek = getWeekNumber(today);

    // Uppdatera veckonumret för den första veckan om det inte är inställt
    if (firstWeek === 0 || (today.getDay() === 4 && currentWeek !== firstWeek)) {
      // Sätt den första veckan till 20 om det är före nästa torsdag, annars öka med 1
      const newFirstWeek = today.getDay() === 4 ? 20 : 20 + 1;
      setFirstWeek(newFirstWeek);

      // Uppdatera veckonumret för pauseoptions
      const updatedPauseOptions = [
        text?.my_pages.pauseOption1,
        text?.my_pages.pauseOption2,
        text?.my_pages.pauseOption3
      ].map((option, index) => {
        return (
          <option key={index} value={newFirstWeek + index}>
            {option} {text.my_pages.weekOption} {newFirstWeek + index}
          </option>
        );
      });
      setPauseOptions(updatedPauseOptions);
    }
  }, [firstWeek]);

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
                {pauseOptions}
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
