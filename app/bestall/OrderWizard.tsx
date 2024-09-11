import React, { useState, useEffect, ReactNode } from "react";
import Button from "@/components/ui/Button";
import { useLang } from "@/hooks/useLang";

interface OrderWizardProps {
  children: ReactNode[]; // Behandla children som en array
  handleConfirm: () => void; // Funktion för hantering av betalning
  stripeCheckoutIsLoading: boolean; // Laddningsindikator för betalning
  selectedType: any; // Valt matkasse
  selectedVariant: any; // Vald frekvens eller variant
  selectedDay: any; // Vald leveransdag
}

const OrderWizard = ({
  children,
  handleConfirm,
  stripeCheckoutIsLoading,
  selectedType,
  selectedVariant,
  selectedDay,
}: OrderWizardProps) => {
  const { text, lang } = useLang(); // Flytta denna rad inuti komponenten
  const [currentStep, setCurrentStep] = useState(1);
  const [step1ChoicesMade, setStep1ChoicesMade] = useState(false); // Kontroll för steg 1 val
  const [step2ChoicesMade, setStep2ChoicesMade] = useState(false); // Kontroll för steg 2 val

  const nextStep = () => setCurrentStep((prevStep) => Math.min(prevStep + 1, children.length));
  const prevStep = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));

  // Aktivera "Gå vidare" för steg 1 när både selectedType och selectedVariant är valda
  useEffect(() => {
    if (selectedType && selectedVariant) {
      setStep1ChoicesMade(true);
    } else {
      setStep1ChoicesMade(false);
    }
  }, [selectedType, selectedVariant]);

  // Aktivera "Gå vidare" för steg 2 när en dag är vald
  useEffect(() => {
    if (selectedDay) {
      setStep2ChoicesMade(true);
    } else {
      setStep2ChoicesMade(false);
    }
  }, [selectedDay]);

  // Unika stilar och egenskaper för varje steg
  const buttonStyles = {
    common: {
            backgroundColor: "#F4664A", // Färgen som ska vara gemensam
            padding: "10px 20px",
            color: "white",
            width: "100%", // Full bredd på mobilen
            maxWidth: "600px", // Mindre bredd på större skärmar
            margin: "10px auto", // Centrera på större skärmar
            display: "flex", // Flexbox för layout
            justifyContent: "center", // Centrerar horisontellt
            alignItems: "center", // Centrerar vertikalt
            textAlign: "center", // Centrerar texten horisontellt
            flexGrow: 1, // Låter knappen växa
            minWidth: "150px", // Minsta bredd
            height: "auto", // Se till att höjden inte begränsar texten
            lineHeight: "normal", // Se till att texten visas korrekt
          } as React.CSSProperties,
  };

  return (
    <div>
      <div>{children[currentStep - 1]} {/* Rendera aktuellt steg */}</div>
      
      {/* Flexcontainer för knappar */}
      <div className="flex justify-center gap-4 mt-4 px-4">
        {/* Hantering av knappar för första steget */}
        {currentStep === 1 && (
          <Button onClick={nextStep} style={buttonStyles.common} disabled={!step1ChoicesMade}>
            {text.order.step1_button}
          </Button>
        )}

        {/* Hantering av knappar för andra steget */}
        {currentStep === 2 && (
          <>
            <Button onClick={prevStep} style={buttonStyles.common}>
              {text.order.back_button}
            </Button>
            <Button onClick={nextStep} style={buttonStyles.common} disabled={!step2ChoicesMade}>
            {text.order.step2_button} 
           </Button>
          </>
        )}

        {/* Hantering av knappar för sista steget */}
        {currentStep === 3 && (
          <>
            <Button onClick={prevStep} style={buttonStyles.common}>
              {text.order.back_button}
            </Button>
            <Button
              onClick={handleConfirm}
              style={buttonStyles.common}
              disabled={stripeCheckoutIsLoading} // Deaktivera knappen om betalning pågår
            >
              {stripeCheckoutIsLoading ? text.order.loading : text.order.pay}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderWizard;
