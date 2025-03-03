"use client";
import React, { useState, useEffect } from "react";
import { useLang } from "@/hooks/useLang";
import { db } from "@/firebase/firebaseNewsletterConfig";
import { doc, setDoc } from "firebase/firestore";
import { FiMail } from "react-icons/fi";
import Image from "next/image";

// Importera bilder
import image1 from "../../public/images/popup1.jpg";
import image2 from "../../public/images/popup2.jpg";
import image3 from "../../public/images/popup3.jpg";
import image4 from "../../public/images/popup4.jpg";
import image5 from "../../public/images/popup5.jpg";
import image6 from "../../public/images/popup6.jpg";
import image7 from "../../public/images/popup7.jpg";

const images = [image1, image2, image3, image4, image5, image6, image7];

const PopupNewsletterForm = () => {
  const { lang, text = { popup: {} } } = useLang();
  const [email, setEmail] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // 🔹 Styr popupens visning

  // 🔹 Kolla om popupen ska visas (baserat på localStorage)
  useEffect(() => {
    const lastSeenTimestamp = localStorage.getItem("popupLastSeen");
    const now = new Date().getTime();
    const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000; // 6 månader i millisekunder

    if (!lastSeenTimestamp || now - parseInt(lastSeenTimestamp) > sixMonths) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, []);

  // 🔹 Spara att popupen har visats (i localStorage)
  const handleClose = () => {
    localStorage.setItem("popupLastSeen", new Date().getTime().toString());
    setShowPopup(false);
  };

  // Byt bild var 4:e sekund
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError(text.popup.error_message);
      return;
    }
    if (!selectedCountry) {
      setError(text.popup.select_country_error);
      return;
    }
    try {
      await setDoc(doc(db, "newslettersubscribers", email), {
        "Namn": "",
        "Mejl": email,
        "Land": selectedCountry,
        timestamp: new Date().toISOString(),
      });

      setSubmitted(true);
      setEmail("");
      setSelectedCountry("");
      setError("");
    } catch (error) {
      console.error("❌ Firebase-fel:", error);
      setError(text.popup.error_message);
    }
  };

  return (
    <>
      {showPopup && ( // 🔹 Popup visas endast om showPopup är true
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-[95%] max-w-3xl bg-[#EECFAA] flex flex-row md:flex-row rounded-lg overflow-hidden shadow-lg relative">
            
            {/* Stängningsknapp */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 w-6 h-6 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#6E2936] text-[#EECFAA] text-xl md:text-3xl hover:bg-[#57212C] transition duration-300 z-50"
            >
              <span className="relative top-[-1px]">&times;</span>
            </button>

            {/* Vänster sektion - Formulär */}
            <div className={`w-3/5 md:w-1/2 p-2 md:p-6 flex flex-col justify-center transition-all duration-500 ${submitted || error ? "pb-2 md:pb-4" : ""}`}>
              <h2 className="text-md md:text-2xl mb-2 md:mb-4 font-bold text-[#6E2936] text-center">
                {text.popup.title}
              </h2>
              <p className="text-[#6E2936] text-center text-[11px] md:text-base mb-3 md:mb-4">
                {text.popup.description}
              </p>

              <form onSubmit={handleSubmit} className="mt-2 md:mt-4 relative px-1">
                <div className="flex items-center border-b border-[#6E2936] pb-2">
                  <input
                    type="email"
                    placeholder={text.popup.placeholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsTyping(e.target.value.length > 0);
                      setError("");
                    }}
                    className="w-full bg-transparent text-[#6E2936] outline-none text-[11px] md:text-[16px] placeholder-[#6E2936] px-1"
                    required
                  />

                  {isTyping ? (
                    <button type="submit" className="ml-2 text-[#6E2936] font-bold text-[11px] md:text-base hover:text-[#F4664A] transition duration-300">
                      {text.popup.submit_button}
                    </button>
                  ) : (
                    <FiMail className="text-[#6E2936] text-lg md:text-2xl ml-2" />
                  )}
                </div>
              </form>

              {/* Felmeddelande */}
              {error && <p className="mt-2 text-[8px] md:text-sm text-center text-red-500">{error}</p>}

              {/* Bekräftelsemeddelande */}
              {submitted && (
                <div className="mt-4 text-[11px] md:text-sm bg-[#6E2936] text-[#EECFAA] px-4 py-2 rounded-md w-fit mx-auto flex items-center justify-center min-h-[40px] transition-all duration-500">
                  {text.popup.thank_you_message}
                </div>
              )}
            </div>

            {/* Höger sektion - Bildkarusell */}
            <div className={`flex-1 min-w-0 overflow-hidden relative transition-all duration-500 ${submitted || error ? "h-[350px] md:h-[500px]" : "h-[250px] md:h-[450px]"}`}>
              <Image src={images[currentImage]} alt="Popup Image" width={500} height={450} className="absolute top-0 left-0 w-full h-full object-cover object-center" priority />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupNewsletterForm;
