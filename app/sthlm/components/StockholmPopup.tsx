"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/firebase/firebaseNewsletterConfig";
import { doc, setDoc } from "firebase/firestore";
import { FiMail } from "react-icons/fi";
import { useLang } from "@/hooks/useLang";

// 🔄 Direkt import utan dynamic
import LottieStockholm from "../LottieStockholm";

const StockholmPopup = () => {
  const { lang, text = { stockholmPopup: {} } } = useLang();
  const t = text.stockholmPopup;

  const [email, setEmail] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const lastSeenTimestamp = localStorage.getItem("stockholmPopupLastSeen");
    const now = new Date().getTime();
    const delay = 3000;

    if (!lastSeenTimestamp || now - parseInt(lastSeenTimestamp) > delay) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("stockholmPopupLastSeen", new Date().getTime().toString());
    setShowPopup(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError(t.error_empty);
      return;
    }

    try {
      await setDoc(doc(db, "stockholm-offer", email), {
        Mejl: email,
        Stad: "Stockholm",
        timestamp: new Date().toISOString(),
      });

      setSubmitted(true);
      setEmail("");
      setError("");
    } catch (err) {
      console.error("Firebase-fel:", err);
      setError(t.error_generic);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 px-3 z-50">
      <div className="bg-[#EECFAA] pt-8 pb-2 px-5 shadow-lg w-full max-w-md relative text-[#6E2936] overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-0 right-2 text-2xl font-bold text-[#6E2936] hover:text-black z-10"
        >
          &times;
        </button>

        <h2 className="text-2xl sm:text-2xl font-bold text-center mb-4">{t.title}</h2>
        <p className="text-center text-sm sm:text-base mb-4">
          {t.description} <span className="font-semibold">{t.code_note}</span>
        </p>

        {!submitted ? (
          <>
            <p className="text-xs sm:text-sm text-center mb-2">
              <span className="font-semibold">{t.save_later}</span> {t.save_description}
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-4 flex items-center border-b border-[#6E2936] pb-1 mx-auto max-w-[350px]"
            >
              <input
                type="email"
                placeholder={t.placeholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsTyping(e.target.value.length > 0);
                  setError("");
                }}
                className="w-full bg-transparent text-md placeholder-[#6E2936] outline-none px-1"
                required
              />
              {isTyping ? (
                <button
                  type="submit"
                  className="ml-2 text-sm font-bold text-[#6E2936] hover:text-[#F4664A]"
                >
                  {t.send_button}
                </button>
              ) : (
                <FiMail className="ml-2 text-2xl text-[#6E2936]" />
              )}
            </form>

            {isTyping && (
              <div className="mx-auto max-w-[350px]">
                <p className="text-xs text-[#6E2936] mt-2 text-center">{t.consent_text}</p>
              </div>
            )}

            {error && (
              <div className="mx-auto max-w-[350px]">
                <p className="text-red-600 text-xs text-center mt-2">{error}</p>
              </div>
            )}
          </>
        ) : (
          <div className="mt-4 bg-[#6E2936] text-[#EECFAA] px-4 py-2 rounded-md text-sm text-center">
            {t.success_message}
          </div>
        )}

        <div className="mt-2 flex justify-center overflow-hidden">
          <LottieStockholm />
        </div>
      </div>
    </div>
  );
};

export default StockholmPopup;
