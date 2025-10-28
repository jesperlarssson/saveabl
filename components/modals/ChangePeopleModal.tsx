"use client";

import React from "react";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import { useLang } from "@/hooks/useLang";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import Button from "../ui/Button";
import useMessageModal from "@/hooks/useMessageModal";
import useChangePeopleModal from "@/hooks/useChangePeopleModal";

const ChangePeopleModal = () => {
  const { onClose, isOpen, customerEmail, customerId } = useChangePeopleModal();
  const { onOpen, forMessage } = useMessageModal();
  const { text } = useLang();

  const textData = text?.my_pages;

  const onChange = (open: boolean) => {
    if (!open) onClose();
  };

  const addTodo = async (wish: string) => {
    try {
      await axios.post("/api/add-todo", {
        customer_email: customerEmail,
        customer_id: customerId,
        actions: "CHANGE_PEOPLE",
        wish,
      });
      forMessage(true, "");
      onOpen();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Något gick fel. Försök igen.");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const peopleValue = data.get("people");
    if (peopleValue && typeof peopleValue === "string") {
      addTodo(`Vill ändra antal personer till ${peopleValue}.`);
    } else {
      toast.error("Välj ett giltigt alternativ");
    }
  };

  const saveLabel = textData?.peopleSaveButton ?? textData?.saveButton ?? "Spara";

  return (
    <Modal
      title={textData?.peopleModalTitle ?? "Ändra antal personer"}
      description={textData?.peopleModalDescription ?? "Välj nytt antal personer för din matkasse."}
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 p-4">
        {/* Wrapper för egen pil */}
        <div className="relative">
          <select
            className={twMerge(
              `w-full border border-primary bg-transparent p-2 pr-10 rounded-md font-bold text-secondary
               ring-1 ring-transparent focus:ring-primary focus:outline-none focus:border-secondary
               appearance-none`
            )}
            name="people"
            id="people"
          >
            <option value="2-3 pers">2–3 pers</option>
            <option value="3-4 pers">3–4 pers</option>
          </select>

          {/* Egen oifylld pil, positionerad närmare (right-3) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-secondary"
          >
            ▾
          </span>
        </div>

        <Button type="submit" aria-label={saveLabel}>
          {saveLabel}
        </Button>
      </form>
    </Modal>
  );
};

export default ChangePeopleModal;
