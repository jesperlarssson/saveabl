"use client";
import BodyText from "@/components/ui/BodyText";
import Button from "@/components/ui/Button";
import TitleH2 from "@/components/ui/TitleH2";
import { useLang } from "@/hooks/useLang";
import { useRouter, useSearchParams } from "next/navigation";

import React from "react";

const SuccessPage: React.FC = () => {
  const router = useRouter();

  const { lang, text } = useLang();
  const searchParams = useSearchParams();

  const recurring = searchParams.get("recurring");

  return (
    <div className="flex items-center mt-10 justify-center">
      <div className="max-w-3xl flex flex-col items-center">
        <TitleH2>{text?.success?.title ?? "Tack för din beställning!"}</TitleH2>

        {recurring ? (
          <BodyText className="text-center mt-4">
            {text?.success?.recurring ??
              "Du har nu ett aktivt abonnemang. Du kan när som helst avsluta ditt abonnemang på dina sidor."}
          </BodyText>
        ) : (
          <BodyText className="text-center mt-4">
            {text?.success?.description ??
              "Logga in på dina sidor för att se information om din beställning."}
          </BodyText>
        )}
        {recurring && (
          <Button onClick={() => router.push("/mina-sidor")} className="mt-6">
            {text?.success?.button ?? "Till mina sidor"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
