"use client";

import { useEffect, useState } from "react";

import { ProductWithPrice } from "@/types";
import Modal from "@/components/ui/Modal";
import AuthModal from "@/components/modals/AuthModal";
import LocationModal from "@/components/modals/LocationModal";
import AddMealkitModal from "@/components/modals/AddMealkitModal";
import ManageSubscriptionModal from "@/components/modals/ManageSubscriptionModal";

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
      <ManageSubscriptionModal />
      <AuthModal />
      <LocationModal />
    </>
  );
};

export default ModalProvider;
