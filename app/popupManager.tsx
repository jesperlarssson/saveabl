"use client";
import React, { useState, useEffect } from "react";
import PopupNewsletterForm from "./nyhetsbrev/popupNewsletterForm";

export default function PopupManager() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 0); // ⚡ Popup visas direkt vid sidladdning

    return () => clearTimeout(timer); // Rensar timern om användaren navigerar bort
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
     {isPopupOpen && <PopupNewsletterForm />}
    </>
  );
}
