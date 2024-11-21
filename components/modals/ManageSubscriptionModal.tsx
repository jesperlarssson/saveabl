"use client";

import React, { useEffect, useState } from "react";
import useManageSubscriptionModal from "@/hooks/useManageSubscriptionModal";
import Modal from "@/components/ui/Modal";
import axios from "axios";
import Button from "../ui/Button";
import useMessageModal from "@/hooks/useMessageModal";
import { useLang } from "@/hooks/useLang";
import toast from "react-hot-toast";
import { usePauseWeek } from "@/context/PauseWeekContext";

// Typdefinition för props
interface ManageSubscriptionModalProps {
  updatePauseStatus: (status: boolean) => void;
  updatePauseWeek: (week: string) => void;
}

function getWeekNumber(date: Date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const firstThursday = new Date(startOfYear.getTime() +
    ((4 - startOfYear.getDay() + 7) % 7) * 86400000);
  const thisThursday = new Date(date.getTime() +
    ((4 - date.getDay() + 7) % 7) * 86400000);

  const weekNum = Math.ceil((thisThursday.getTime() - firstThursday.getTime()) / 604800000);

  return weekNum;
}

const ManageSubscriptionModal: React.FC<ManageSubscriptionModalProps> = ({ updatePauseStatus, updatePauseWeek }) => {
  const { onClose, isOpen, customerEmail, customerId, isPaused } = useManageSubscriptionModal();
  const { setPauseWeek } = usePauseWeek();  // Hämta funktionen för att sätta pausvecka
  const { onOpen, forMessage } = useMessageModal();
  const { text } = useLang();
  const [pauseOptions, setPauseOptions] = useState<React.ReactNode[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number>(29);
  const [weeks, setWeeks] = useState<number[]>([50, 51, 52]);

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

  const handleResumeSubscription = async () => {
    addTodo("RESUME", "Vill återuppta prenumerationen");
    updatePauseStatus(false); // Uppdatera pausen till aktiv
    updatePauseWeek(""); // Rensa återupptagningsveckan
  };

  const handleNumberSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const selectedWeek = data.get("pause");
    
    if (typeof selectedWeek === "string") {
      setPauseWeek(parseInt(selectedWeek).toString()); 
      addTodo("PAUSE", `Vill pausa och återuppta vecka ${selectedWeek}`);
      updatePauseStatus(true);
      updatePauseWeek(selectedWeek);
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

