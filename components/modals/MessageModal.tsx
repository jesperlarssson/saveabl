"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useMessageModal from "@/hooks/useMessageModal";
import Modal from "@/components/ui/Modal";
import Button from "../ui/Button";
import { useLang } from "@/hooks/useLang"; // Importera useLang för att hämta översättningar

const MessageModal = () => {
  const router = useRouter();
  const { onClose, isOpen, success, message } = useMessageModal();
  const { text } = useLang(); // Använd useLang för att hämta språket

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      // Använd text från useLang för titeln
      title={
        success 
          ? text.my_pages.success_title || "Now it's fixed!" 
          : text.my_pages.error_title || "Något gick fel"
      }
      // Använd text från useLang för beskrivningen
      description={
        success
          ? text.my_pages.success_description || 
            "Change confirmed! It may take a moment before it shows on your page. Give us a shout if you have any questions, we're happy to help at hello@saveabl.se 💌"
          : text.my_pages.error_description || 
            "Något gick fel, försök igen senare."
      }
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        <p> {message}</p>
        <Button className=" px-8 py-2 mt-0" onClick={onClose}>
          {text.my_pages.close_button || "Close"} {/* Använd text från useLang för knappen */}
        </Button>
      </div>
    </Modal>
  );
};

export default MessageModal;
