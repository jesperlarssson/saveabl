"use client";

import { useEffect, useState } from "react";

import { ProductWithPrice } from "@/types";
import Modal from "@/components/ui/Modal";
import AuthModal from "@/components/modals/AuthModal";
import LocationModal from "@/components/modals/LocationModal";
import AddMealkitModal from "@/components/modals/AddMealkitModal";
import ManageSubscriptionModal from "@/components/modals/ManageSubscriptionModal";
import MessageModal from "@/components/modals/MessageModal";

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
      <MessageModal />
      <ManageSubscriptionModal />
      <AuthModal />
      <LocationModal />
    </>
  );
};

export default ModalProvider;
