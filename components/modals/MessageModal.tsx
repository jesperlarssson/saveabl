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
      title={success ? "Nu är det klart!" : "Något gick fel"}
      description={
        success
          ? "Allt är fixat! Det kan ta en liten stund innan det syns på din sida."
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
