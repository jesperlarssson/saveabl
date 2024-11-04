"use client";

import { useEffect, useState } from "react";

import { ProductWithPrice } from "@/types";
import Modal from "@/components/ui/Modal";
import AuthModal from "@/components/modals/AuthModal";
import LocationModal from "@/components/modals/LocationModal";
import AddMealkitModal from "@/components/modals/AddMealkitModal";
import ManageSubscriptionModal from "@/components/modals/ManageSubscriptionModal";
import MessageModal from "@/components/modals/MessageModal";
import ChangeIntervalModal from "@/components/modals/ChangeIntervallModal";
import ChangeDeliveryDayModal from "@/components/modals/ChangeDeliveryDayModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddMealkitModal />
      <ChangeDeliveryDayModal />
      <MessageModal />
      <ChangeIntervalModal />
      <ManageSubscriptionModal updatePauseStatus={function (status: boolean): void {
        throw new Error("Function not implemented.");
      } } updatePauseWeek={function (week: string): void {
        throw new Error("Function not implemented.");
      } } />
      <AuthModal />
      <LocationModal />
    </>
  );
};

export default ModalProvider;
