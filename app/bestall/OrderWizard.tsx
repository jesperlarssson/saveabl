"use client";
import React, {
  useState,
  useEffect,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from "react";
import Button from "@/components/ui/Button";
import { useLang } from "@/hooks/useLang";

export interface OrderWizardHandle {
  prev: () => void;
  next: () => void;
  getStep: () => number;
  // ⬇️ Uppdaterad: kan nu forcera hopp till ett steg
  goTo?: (to: number, options?: { force?: boolean }) => void;
}

interface OrderWizardProps {
  /** Steginnehåll: 5 block (smartkasse, antal, variant, leveransdag, adress) */
  children: ReactNode[];

  /** Actions */
  handleConfirm: () => void;
  stripeCheckoutIsLoading: boolean;

  /** Tillstånd för låsning per steg (fallback-logik) */
  selectedType: any; // Steg 2
  selectedSmartType: "veg" | "gard" | null; // Steg 1
  selectedVariant: any; // Steg 3
  selectedDay: any; // Steg 4

  /** Exponera steg utåt – för t.ex. CheckoutStepBar */
  onStepChange?: (step: number, total: number) => void;

  /** Valfritt: extern guard som styr om "Fortsätt" är aktiv i varje steg */
  canProceedGuard?: (step: number) => boolean;

  /** Valfria setters (orörda här, men kvar för kompatibilitet) */
  setSelectedVariant?: (v: any | null) => void;
  setSelectedSmartType?: (v: "veg" | "gard" | null) => void;
  setSelectedDay?: (v: any | null) => void;
  setDeliveryWindow?: (v: any | null) => void;
  setSelectedWeekday?: (v: number | null) => void;
  postalCode?: string | null;
}

const OrderWizard = forwardRef<OrderWizardHandle, OrderWizardProps>(
  (
    {
      children,
      handleConfirm,
      stripeCheckoutIsLoading,
      selectedType,
      selectedSmartType,
      selectedVariant,
      selectedDay,
      onStepChange,
      canProceedGuard,
    },
    ref
  ) => {
    const { text } = useLang();

    const maxStep = Array.isArray(children) ? children.length : 1;
    const [currentStep, setCurrentStep] = useState(1);

    // ✅ Korrekt fallback-låsning per steg
    // Steg 1: smartkasse, Steg 2: antal, Steg 3: variant, Steg 4: leveransdag
    const fallbackCanProceed = (step: number) => {
      if (step === 1) return Boolean(selectedSmartType);
      if (step === 2) return Boolean(selectedType);
      if (step === 3) return Boolean(selectedVariant);
      if (step === 4) return Boolean(selectedDay);
      return true; // sista steget (adress/betalning) hanteras i handleConfirm
    };

    const canProceed = (step: number) =>
      typeof canProceedGuard === "function"
        ? canProceedGuard(step)
        : fallbackCanProceed(step);

    // Hjälp för att blockera hopp framåt
    const allPrevSatisfied = (toStep: number) => {
      for (let s = 1; s < toStep; s++) {
        if (!canProceed(s)) return false;
      }
      return true;
    };

    // ⬇️ Nu med stöd för force
    const guardedGoTo = (to: number, options?: { force?: boolean }) => {
      if (to === currentStep) return;

      const target = Math.min(Math.max(1, to), maxStep);

      // Blockera hopp framåt om tidigare steg inte är uppfyllda,
      // förutom om vi explicit sagt force: true (t.ex. från varukorgen)
      if (target > currentStep && !options?.force && !allPrevSatisfied(target)) {
        return;
      }

      setCurrentStep(target);
    };

    // Ping till stegbaren när steg ändras
    useEffect(() => {
      onStepChange?.(currentStep, maxStep);
    }, [currentStep, maxStep, onStepChange]);

    const nextStep = () => setCurrentStep((s) => Math.min(s + 1, maxStep));
    const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

    // Exponera API (för bakåtpil etc.)
    useImperativeHandle(ref, () => ({
      prev: prevStep,
      next: () => {
        if (canProceed(currentStep)) nextStep();
      },
      getStep: () => currentStep,
      goTo: (to, options) => guardedGoTo(to, options),
    }));

    // Enhetlig CTA-storlek
    const ctaStyle: React.CSSProperties = {
      width: "100%",
      maxWidth: 360,
      height: 52,
      margin: "10px auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      backgroundColor: "#F4664A",
      color: "#FCF7E8",
      cursor: "pointer",
    };

    // Språkstyrda CTA-etiketter
    const nextCtas = [
      String(text?.order?.step2_button ?? ""),
      String(text?.order?.step3_button ?? ""),
      String(text?.order?.step4_button ?? ""),
      String(text?.order?.step5_button ?? ""),
    ];
    const nextLabel = nextCtas[currentStep - 1] || "Fortsätt";

    // NEW: blockera Enter från att hoppa vidare när steget inte får fortsätta
    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      if (e.key === "Enter" && !canProceed(currentStep)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    return (
      <div onKeyDown={onKeyDown}>
        {/* Innehåll för aktuellt steg */}
        <div className="space-y-6 sm:space-y-8">
          {Array.isArray(children) ? children[currentStep - 1] : children}
        </div>

        {/* CTA-rad */}
        <div className="flex justify-center mt-8 sm:mt-10 px-4 pt-6 border-t border-primary/20">
          {currentStep < maxStep ? (
            <Button
              onClick={() => {
                if (canProceed(currentStep)) nextStep();
              }}
              style={ctaStyle}
              disabled={!canProceed(currentStep)}
            >
              {nextLabel}
            </Button>
          ) : (
            <Button
              onClick={handleConfirm}
              style={ctaStyle}
              // NEW: även sista knappen är disabled tills alla krav för steg 5 är uppfyllda
              disabled={stripeCheckoutIsLoading || !canProceed(currentStep)}
            >
              {stripeCheckoutIsLoading
                ? (text?.order?.loading ?? "Laddar...")
                : (text?.order?.pay ?? "Betala")}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

OrderWizard.displayName = "OrderWizard";
export default OrderWizard;
