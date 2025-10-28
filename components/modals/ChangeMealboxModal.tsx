"use client";

import React from "react";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import { useLang } from "@/hooks/useLang";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import Button from "../ui/Button";
import useMessageModal from "@/hooks/useMessageModal";
import useChangeMealboxModal from "@/hooks/useChangeMealboxModal";

const ChangeMealboxModal = () => {
  const { onClose, isOpen, customerEmail, customerId } = useChangeMealboxModal();
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
        actions: "CHANGE_MEALBOX",
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
    const mealboxValue = data.get("mealbox");
    if (mealboxValue && typeof mealboxValue === "string") {
      addTodo(`Vill byta till ${mealboxValue}.`);
    } else {
      toast.error("Välj ett giltigt alternativ");
    }
  };

  return (
    <Modal
      title={textData?.mealboxModalTitle ?? "Ändra matkasse"}
      description={textData?.mealboxModalDescription ?? "Välj vilken matkasse du vill ha framöver."}
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
            name="mealbox"
            id="mealbox"
          >
            <option value="Saveabl Gård">Saveabl Gård</option>
            <option value="Saveabl Grön">Saveabl Grön</option>
          </select>

          {/* Egen oifylld pil, positionerad närmare (right-3) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-secondary"
          >
            ▾
          </span>
        </div>

        <Button type="submit">{textData?.saveButton ?? "Spara"}</Button>
      </form>
    </Modal>
  );
};

export default ChangeMealboxModal;
