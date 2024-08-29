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
  const [selectedWeek, setSelectedWeek] = useState<number>(29); // Initialt veckonummer 29
  const [weeks, setWeeks] = useState<number[]>([38, 39, 40]); // Initiala veckonummer för alternativen

  useEffect(() => {
    const intervalId = setInterval(() => {
      const today = new Date();
      const isMidnight = today.getHours() === 0 && today.getMinutes() === 0; // Kontrollera om det är midnatt
  
      if (isMidnight) {
        setWeeks((prevWeeks) => prevWeeks.map(week => week + 1));
      }
    }, 60 * 1000); // Körs en gång per minut
  
    return () => clearInterval(intervalId);
  }, []);

  // Skapa en lista över veckor baserat på weeks
  useEffect(() => {
    const options = weeks.map((week, index) => (
      <option key={index} value={week}>
        {text?.my_pages.weekOption} {week}
      </option>
    ));
    setPauseOptions(options);
  }, [weeks, text]);

  const addTodo = async (action: string, wish: string) => {
    try {
      await axios.post("/api/add-todo", {
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

  const handleOnPauseSubscription = async (numberOfMealkits: string) => {
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
      handleOnPauseSubscription(numberOfMealkits);
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
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
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
