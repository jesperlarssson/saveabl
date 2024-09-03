"use client";

import BodyText from "@/components/ui/BodyText";
import Button from "@/components/ui/Button";
import { useLang } from "@/hooks/useLang";
import React, { useState } from "react";
import { db } from '@/firebase/init'; // Använder init.ts
import { collection, addDoc } from "firebase/firestore";
import Image from 'next/image';
import MatkasseImage from '../../public/images/illustrations/Matkasse.png';
import morotImage from '../../public/images/illustrations/morot.png';

const SuccessPage: React.FC = () => {
  const { text } = useLang();
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [otherText, setOtherText] = useState<string>("");

  const handleFeedback = async () => {
    console.log("Firestore instance:", db);
    const feedbackData = {
      source: selectedOption === text?.success?.options?.other ? otherText : selectedOption,
      timestamp: Date.now()
    };
    
    try {
      const feedbackCollectionRef = collection(db, "feedback"); 
      await addDoc(feedbackCollectionRef, feedbackData); 
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  return (
    <div>
      <style jsx>{`
        .custom-radio {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid #6E2936;
          border-radius: 50%;
          display: inline-block;
          position: relative;
          cursor: pointer;
          margin-right: 0.5rem;
        }

        .custom-radio:checked {
          background-color: #6E2936;
          border-color: #6E2936;
        }

        .custom-radio:checked::after {
          content: "";
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        /* Ändra ramfärgen på inputfältet vid focus */
        input[type="text"]:focus {
          outline: none;
          border-color: #6E2936;
          box-shadow: 0 0 0 2px rgba(110, 41, 54, 0.5);
        }
        
        /* Gör rutan längre */
        input[type="text"] {
          width: 100%; /* Full bredd inom sin container */
          max-width: 320px; /* Sätter maxbredd för att göra rutan längre */
          padding: 0.5rem;
          border: 2px solid #6E2936;
          border-radius: 5px;
          box-sizing: border-box; /* Se till att padding inkluderas i bredden */
        }
        
        /* Container som håller textfältet */
        .feedback-input-container {
          width: 100%;
          display: flex;
          justify-content: flex-start; /* Vänstercentrerar textfältet på alla skärmar */
        }

        /* Placera alternativen under varandra */
        .feedback-options {
          display: flex;
          flex-direction: column; /* Ändrar riktningen till kolumn för att placera alternativen vertikalt */
          align-items: flex-start; /* Justerar innehållet till vänster */
          width: 100%;
        }

        .feedback-options label {
          margin-bottom: 1rem; /* Ger lite utrymme mellan alternativen */
        }

        /* Centrera översta delen på datorn */
        .centered-section {
          margin-bottom: 2rem;
        }

        @media (min-width: 641px) {
          .centered-section {
            display: flex;
            flex-direction: column;
            align-items: center; /* Centrera innehållet horisontellt */
            text-align: center;
          }
        }

        /* Centrera knappen "Till mina sidor" på datorn */
        .centered-button {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .centered-button .button {
          max-width: 200px; /* Sätt maxbredd för att hålla knappen liten */
          width: 100%;
        }

        /* Vänsterjustera knappen "Skicka" */
        .left-aligned-buttons {
          display: flex;
          justify-content: flex-start;
          width: 100%;
        }

        .left-aligned-buttons .button {
          max-width: 200px; /* Sätt maxbredd för att hålla knappen liten */
          width: 100%;
        }
        /* Stil för bildcontainer */
        .morot-image-container {
          position: absolute; /* Gör bilden absolut placerad */
          top: 640px; /* Justerar placeringen beroende på var du vill ha bilden */
          right: 40px; /* Flyttar bilden ut till höger */
          z-index: 0; /* Ser till att bilden ligger bakom texten */
          opacity: 0.8; /* Gör bilden transparent så att den inte tar över sidan */
        }
        /* Anpassa bildstorlek och position för dator */
        @media (min-width: 641px) {
          .morot-image-container {
            width: 500px; /* Storlek på bilden för dator */
            height: 500px;
            top: 450px; /* Placering på dator */
            right: -200px;
          }
        }

        /* Anpassa bildstorlek och position för mobil */
        @media (max-width: 640px) {
          .morot-image-container {
            width: 150px; /* Mindre storlek på bilden för mobil */
            height: 150px;
            top: 450px; /* Annan placering för mobil */
            right: -40px;
          }
        }
      `}</style>

      <div className="flex items-center mt-10 justify-center px-4">
        <div className="max-w-3xl flex flex-col items-start text-left"> {/* Texten är vänstercentrerad */}
          <div className="centered-section">
            <h1 className="w-full text-3xl sm:text-4xl font-bold" style={{ color: '#6E2936' }}>
              {text?.success?.title ?? "Tack för din beställning!"}
            </h1>

            <BodyText className="mt-4 w-full text-lg sm:text-xl">
              {text?.success?.description ??
                "Leveransinformation kommer att skickas till ditt mobilnummer från vår partner Gordon Delivery när de planerat upp rutten."}
            </BodyText>

            <BodyText className="mt-4 w-full text-lg sm:text-xl">
              {text?.success?.nextStepsDescription ??
                "För att hantera din beställning eller se dina abonnemang, gå till Mina sidor."}
            </BodyText>
            
            <div className="centered-buttons mt-6 mb-2">
  <Button
    onClick={() => window.location.href = "https://www.saveabl.com/mina-sidor"}
    className="button"
    style={{
      backgroundColor: "#6E2936",
      color: "#FFFFFF",
      width: "auto", // Säkerställer att knappen inte sträcker sig utanför innehållets bredd
      maxWidth: "340px", // Sätter maxbredd till en mindre storlek
      padding: "10px 110px", // Justerar padding för att få en mindre knapp
    }}
  >
    {text?.success?.button ?? "Gå till Mina sidor"}
  </Button>
</div>
          </div>

          {/* Lägg till bilden som ligger bakom texten */}
          <div className="morot-image-container">
              <Image
                src={morotImage}
                alt="morot"
                layout="fixed"
                width={150}
                height={150}
              />
            </div>
      

          {!feedbackSubmitted ? (
            <>
              <h2 className="w-full text-2xl sm:text-3xl font-semibold mt-2 sm:mt-10" style={{ color: '#6E2936' }}>
                {text?.success?.feedbackTitle ?? "Hur hittade du oss?"}
              </h2>
              
              <BodyText className="mt-2 w-full text-lg sm:text-xl">
                {text?.success?.feedbackSubtitle ?? "Vi skulle bli så tacksamma om du vill ange hur du hittade till Saveabl :)"} 
              </BodyText>

              <div className="feedback-options mt-4 w-full">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="custom-radio"
                    name="feedback"
                    value={text?.success?.options?.friend ?? "Via en vän"}
                    onChange={() => setSelectedOption(text?.success?.options?.friend ?? "Via en vän")}
                    checked={selectedOption === (text?.success?.options?.friend ?? "Via en vän")}
                  />
                  <span className="ml-2">{text?.success?.options?.friend ?? "Via en vän"}</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="custom-radio"
                    name="feedback"
                    value={text?.success?.options?.socialMedia ?? "Sociala medier"}
                    onChange={() => setSelectedOption(text?.success?.options?.socialMedia ?? "Sociala medier")}
                    checked={selectedOption === (text?.success?.options?.socialMedia ?? "Sociala medier")}
                  />
                  <span className="ml-2">{text?.success?.options?.socialMedia ?? "Sociala medier"}</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="custom-radio"
                    name="feedback"
                    value={text?.success?.options?.other ?? "Annat"}
                    onChange={() => setSelectedOption(text?.success?.options?.other ?? "Annat")}
                    checked={selectedOption === (text?.success?.options?.other ?? "Annat")}
                  />
                  <span className="ml-2">{text?.success?.options?.other ?? "Annat"}</span>
                </label>
              </div>

              {selectedOption === (text?.success?.options?.other ?? "Annat") && (
                <div className="feedback-input-container mt-4">
                  <input
                    type="text"
                    placeholder={text?.success?.placeholderOther ?? "Ange hur du hittade oss"}
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                  />
                </div>
              )}

<div className="left-aligned-buttons mt-6 mb-4">
  <Button
    onClick={handleFeedback}
    className="button"
    style={{
      backgroundColor: "#6E2936",
      color: "#FFFFFF",
      width: "auto", // Detta säkerställer att knappen inte sträcker sig utanför innehållets bredd
      maxWidth: "340px", // Sätter maxbredd till en mindre storlek
      padding: "10px 135px", // Justerar padding för att få en mindre knapp
    }}
    disabled={
      !selectedOption ||
      (selectedOption === (text?.success?.options?.other ?? "Annat") && !otherText)
    }
  >
    {text?.success?.submitButton ?? "Skicka"}
  </Button>
</div>
            </>
          ) : (
            <div className="mt-2">
              <h2 className="w-full text-2xl sm:text-3xl font-semibold mt-0 sm:mt-10" style={{ color: '#6E2936' }}>
                {text?.success?.thankYouTitle ?? "Tack för din feedback!"}
              </h2>
              <BodyText className="mt-4 w-full mb-4 text-lg sm:text-xl">
                {text?.success?.thankYouDescription ?? "Vi uppskattar din feedback och kommer att använda den för att förbättra vår tjänst."}
              </BodyText>
            </div>
          )}

          <h2 className="w-full text-2xl sm:text-3xl font-semibold mt-8 sm:mt-10" style={{ color: '#6E2936' }}>
            {text?.success?.contactTitle ?? "Kontakta oss"}
          </h2>
          <BodyText className="mt-2 mb-20 w-full text-lg sm:text-xl">
            {text?.success?.contactDescription ??
              "Har du frågor? Tveka inte att kontakta oss på "}
            <a href="mailto:hello@saveabl.se" className="text-current underline">
              hello@saveabl.se
            </a>.
          </BodyText>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;




