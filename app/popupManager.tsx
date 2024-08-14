"use client";
import React, { useState } from "react";
import PopupNewsletterForm from "./nyhetsbrev/PopupNewsletterForm"; // Importera från nyhetsbrevsmappen

export default function PopupManager() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const hideButton = () => {
    setIsButtonVisible(false);
  };

  return (
    <>
      {isPopupOpen && <PopupNewsletterForm onClose={closePopup} />}
      {isButtonVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "65px",
            height: "65px",
            borderRadius: "50%",
            backgroundColor: "#fcf7e8",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          <button
            onClick={hideButton}
            style={{
              position: "absolute",
              top: "0px",
              right: "-10px",
              width: "30px",
              height: "20px",
              borderRadius: "50%",
              color: "#6E2936",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              zIndex: 1001, // Se till att knappen är ovanpå allt annat
            }}
          >
            &times;
          </button>
          <button
            onClick={openPopup}
            className="popup-button"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#fcf7e8",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 1000,
            }}
          >
            <img
              src="/images/popup.svg"
              alt="Öppna popup"
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          </button>
        </div>
      )}
    </>
  );
}