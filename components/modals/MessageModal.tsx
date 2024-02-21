"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import useMessageModal from "@/hooks/useMessageModal";
import Modal from "@/components/ui/Modal";
import Button from "../ui/Button";

const MessageModal = () => {
  const router = useRouter();
  const { onClose, isOpen, success, message } = useMessageModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title={success ? "Now it's fixed!" : "Något gick fel"}
      description={
        success
          ? "Don't worry, everything is fixed! It may take a little while before it appears on your page. Give us a shout if you have any questions, we're happy to help at hello@saveabl.se 💌"
          : "Något gick fel, försök igen senare."
      }
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        <p> {message}</p>
        <Button className=" px-8 py-2 mt-4" onClick={onClose}>
          Stäng
        </Button>
      </div>
    </Modal>
  );
};
export default MessageModal;
