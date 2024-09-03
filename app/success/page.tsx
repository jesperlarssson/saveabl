"use client";
import BodyText from "@/components/ui/BodyText";
import Button from "@/components/ui/Button";
import { useLang } from "@/hooks/useLang";
import { useRouter } from "next/navigation";

import React from "react";

const SuccessPage: React.FC = () => {
  const { text } = useLang();

  return (
    <div className="flex items-center mt-10 justify-center px-4">
      <div className="max-w-3xl flex flex-col items-start text-left sm:text-center">
        {/* Anpassad rubrik för "Tack för din beställning!" med färg */}
        <h1 className="w-full text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#6E2936' }}>
          {text?.success?.title ?? "Tack för din beställning!"}
        </h1>

        <BodyText className="mt-1 w-full text-lg sm:text-xl">
          {text?.success?.description ??
            "Leveransinformation kommer att skickas till ditt mobilnummer från vår partner Gordon Delivery när de planerat upp rutten."}
        </BodyText>

        {/* Ny underrubrik och knapp */}
        <BodyText className="mt-4 w-full text-lg sm:text-xl">
          {text?.success?.nextStepsDescription ??
            "För att hantera din beställning eller se dina abonnemang, gå till Mina sidor."}
        </BodyText>
        <div className="w-full flex justify-start sm:justify-center">
          <Button
            onClick={() => window.location.href = "https://www.saveabl.com/mina-sidor"}
            className="mt-6 mb-6 w-full max-w-xs"
            style={{ backgroundColor: "#6E2936", color: "#FFFFFF" }}
          >
            {text?.success?.button ?? "Gå till Mina sidor"}
          </Button>
        </div>

        {/* Anpassad rubrik för "Kontakta oss" med färg */}
        <h2 className="w-full text-2xl sm:text-3xl font-semibold mt-8 sm:mt-10" style={{ color: '#6E2936' }}>
          {text?.success?.contactTitle ?? "Kontakta oss"}
        </h2>
        <BodyText className="mt-4 w-full text-lg sm:text-xl">
          {text?.success?.contactDescription ??
            "Har du frågor? Tveka inte att kontakta oss på "}
          <a href="mailto:hello@saveabl.se" className="text-current underline">
            hello@saveabl.se
          </a>.
        </BodyText>
      </div>
    </div>
  );
};

export default SuccessPage;
