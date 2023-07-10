"use client";

import { useEffect, useState } from "react";

import { ProductWithPrice } from "@/types";
import Modal from "@/components/ui/Modal";
import AuthModal from "@/components/modals/AuthModal";
import LocationModal from "@/components/modals/LocationModal";


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
      <AuthModal />
      <LocationModal />
    </>
  );
};

export default ModalProvider;
