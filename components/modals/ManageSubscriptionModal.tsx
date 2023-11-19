"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import useManageSubscriptionModal from "@/hooks/useManageSubscriptionModal";
import Modal from "@/components/ui/Modal";
import axios from "axios";

const ManageSubscriptionModal = () => {
  const router = useRouter();
  const { onClose, isOpen, customerEmail, customerId } =
    useManageSubscriptionModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleOnPauseSubsription = async (numberOfMealkits: number) => {
    try {
      const res = await axios.post("/api/add-todo", {
        customer_email: customerEmail,
        customer_id: customerId,
        actions: "PAUSE",
        wish: `Vill pausa nästa ${numberOfMealkits} matkassar`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnPauseSubsriptionWithDate = async (until: Date) => {};

  return (
    <Modal
      title="Hantera Prenumeration"
      description="Här kan du pausa, byta intervall eller avbryta din prenumeration."
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        <div>{customerEmail}</div>
        <div className="flex">
          <button onClick={() => handleOnPauseSubsription(2)} className="">
            Pausa nästa
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default ManageSubscriptionModal;
