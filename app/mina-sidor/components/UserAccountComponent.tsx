"use client";

import { useLang } from "@/hooks/useLang";
import useManageSubscriptionModal from "@/hooks/useManageSubscriptionModal";
import useChangeIntervalModal from "@/hooks/useChangeIntervalModal";
import useChangeDeliveryDayModal from "@/hooks/useChangeDeliveryDayModal";

// Nya hooks för dina extra modaler
import useChangePeopleModal from "@/hooks/useChangePeopleModal";
import useChangeMealboxModal from "@/hooks/useChangeMealboxModal";

// Befintliga adress-/pausmoduler
import useManageAddressModal from "@/hooks/useManageAddressModal";
import ManageAddressModal from "@/components/modals/ManageAddressModal";
import ManageSubscriptionModal from "@/components/modals/ManageSubscriptionModal";

// Nya modal-komponenter
import ChangePeopleModal from "@/components/modals/ChangePeopleModal";
import ChangeMealboxModal from "@/components/modals/ChangeMealboxModal";

import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { usePauseWeek } from "@/context/PauseWeekContext";
import { addWeeks, format } from "date-fns";

/* ------- Helpers ------- */
const translateDay = (day: string, language: "sv" | "en" | "da") => {
  if (!day) return null;
  const formattedDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
  const normalizedDays: Record<string, string> = {
    Lördag: "Saturday",
    Söndag: "Sunday",
    Måndag: "Monday",
    Lørdag: "Saturday",
    Søndag: "Sunday",
    Mandag: "Monday",
    Saturday: "Saturday",
    Sunday: "Sunday",
    Monday: "Monday",
  };
  const normalizedDay = normalizedDays[formattedDay] || formattedDay;
  const days: Record<"en" | "sv" | "da", Record<string, string>> = {
    en: { Saturday: "Saturday", Sunday: "Sunday", Monday: "Monday" },
    sv: { Saturday: "Lördag", Sunday: "Söndag", Monday: "Måndag" },
    da: { Saturday: "Lørdag", Sunday: "Søndag", Monday: "Mandag" },
  };
  return days[language]?.[normalizedDay] || normalizedDay;
};

/* ------- Types ------- */
interface DeliveryInfo {
  city: string;
  country: string;
  line1: string;
  postal_code: string;
}
interface UserAccountProps {
  loading: boolean;
  stripeResponse: any;
  billingFrequency: string;
  isEvenWeek: boolean | null;
  activeSubscription: any;
  deliveryInfo: DeliveryInfo;
}

/* ======================================================================= */

const UserAccountComponent: React.FC<UserAccountProps> = ({
  loading,
  stripeResponse,
  billingFrequency,
  isEvenWeek,
  activeSubscription,
  deliveryInfo,
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isIndefinitePause, setIsIndefinitePause] = useState<boolean>(false);
  const { pauseWeek, setPauseWeek } = usePauseWeek();
  const [manualPauseSet, setManualPauseSet] = useState<boolean>(false);

  // Paus-modal
  const { onOpen, forCustomer } = useManageSubscriptionModal();

  // Ändra intervall / leveransdag
  const { onOpen: onOpenInterval, forCustomer: forCustomerInterval } =
    useChangeIntervalModal();
  const { onOpen: onOpenDeliveryDay, forCustomer: forCustomerDeliveryDay } =
    useChangeDeliveryDayModal();

  // Nya: antal personer / matkasse
  const { onOpen: onOpenPeople, forCustomer: forCustomerPeople } =
    useChangePeopleModal();
  const { onOpen: onOpenMealbox, forCustomer: forCustomerMealbox } =
    useChangeMealboxModal();

  // Adress
  const { forCustomer: forCustomerAddress } = useManageAddressModal();

  const { text, lang } = useLang();
  const authContext = useContext(AuthContext);
  const { referralCode } = authContext || {};

  // “Ändra”-overlay: trigger + positionering
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  // Repositionera panelen när den öppnas / vid scroll / resize
  useEffect(() => {
    const update = () => {
      if (!triggerRef.current) return;
      const r = triggerRef.current.getBoundingClientRect();
      const PANEL_W = 288; // px
      const left = Math.min(Math.max(8, r.left), window.innerWidth - PANEL_W - 8);
      const top = r.bottom + 8;
      setMenuPos({ top, left });
    };

    if (editMenuOpen) {
      update();
      window.addEventListener("resize", update);
      window.addEventListener("scroll", update, true); // capture=true
    }
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [editMenuOpen]);

  // ESC för att stänga
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setEditMenuOpen(false);
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  /* --------- Extrahera värden ur Stripe-beskrivning --------- */
  const description = stripeResponse?.customer?.description ?? "";
  const deliveryDayMatch = description.match(/Vald leverans:\s([^\n]+)/);
  let deliveryDay = deliveryDayMatch ? deliveryDayMatch[1] : null;
  if (deliveryDay) deliveryDay = deliveryDay.split(" ")[0]; // endast veckodagen

  // Antal personer: sluta innan Matkasse eller Extra info
  const peopleMatch = description.match(
    /Antal personer:\s(.*?)(?=\s?Matkasse:|\s?Extra info:|$)/
  );
  const people = peopleMatch ? peopleMatch[1].trim() : null;

  // Matkasse: sluta innan nästa fält
  const mealBoxMatch = description.match(
    /Matkasse:\s(.*?)(?=\sVald leverans:|\sAntal personer:|\sExtra info:|$)/
  );
  let mealBoxType = mealBoxMatch ? mealBoxMatch[1].trim() : null;

  // Fallback via price.id
  const productId = activeSubscription?.items?.data?.[0]?.price?.id || "";
  if (!mealBoxType) {
    if (productId.toLowerCase().includes("gard")) mealBoxType = "Saveabl Gård";
    else if (productId.toLowerCase().includes("gron")) mealBoxType = "Saveabl Grön";
  }

  const translatedDeliveryDay = deliveryDay
    ? translateDay(deliveryDay, lang as "sv" | "en" | "da")
    : null;

  /* --------- Läs pausstatus --------- */
  useEffect(() => {
    if (loading || !activeSubscription) return;
    const stripeResumesAt = activeSubscription?.pause_collection?.resumes_at;
    const isPausedIndefinitely =
      stripeResumesAt === null || stripeResumesAt === 0;
    const isStripePaused =
      stripeResumesAt > Date.now() / 1000 || isIndefinitePause;
    setIsPaused(isStripePaused);
    setIsIndefinitePause(isPausedIndefinitely);

    if (
      isStripePaused &&
      !manualPauseSet &&
      stripeResumesAt &&
      !isIndefinitePause
    ) {
      const stripeResumeDate = new Date(stripeResumesAt * 1000);
      const nextWeekDate = addWeeks(stripeResumeDate, 1);
      const formattedResumeWeek = format(nextWeekDate, "w");
      setPauseWeek(formattedResumeWeek);
    } else if (!isStripePaused) {
      setPauseWeek("");
    }
  }, [activeSubscription, loading, manualPauseSet, setPauseWeek, isIndefinitePause]);

  /* --------- Loading / No sub --------- */
  if (loading) {
    return (
      <div className="flex gap-2 items-center">
        <div className="w-3 h-3 rounded-full animate-pulse bg-accent"></div>{" "}
        Loading...
      </div>
    );
  }
  if (!activeSubscription) {
    return (
      <div className="w-full h-36 rounded-lg text-secondary font-semibold text-xl bg-primary-500 bg-opacity-50 flex flex-col justify-center items-center mb-8">
        <div>{text?.my_pages?.no_connection}</div>
        <div className="font-light text-sm">{text?.my_pages?.no_connection_desc}</div>
      </div>
    );
  }

  /* --------- Handlers --------- */
  const handleModifyAccountClick = async () => {
    try {
      const response = await axios.post("/api/create-billing-portal-session", {
        customerId: stripeResponse.customer.id,
      });
      if (response.data.url) window.location.href = response.data.url;
    } catch (error) {
      console.error("Error redirecting to billing portal:", error);
    }
  };

  const handleSubscriptionClick = () => {
    forCustomer(
      stripeResponse.customer.id,
      stripeResponse.customer.email,
      isPaused
    );
    onOpen();
  };

  const handleResumeSubscription = async () => {
    try {
      await axios.post("/api/add-todo", {
        customer_email: stripeResponse.customer.email,
        customer_id: stripeResponse.customer.id,
        actions: "RESUME",
        wish: "Vill återuppta prenumerationen",
      });
      setIsPaused(false);
      setPauseWeek("");
    } catch (error) {
      console.error("Error adding resume action to backlog:", error);
    }
  };

  const handleChangeIntervalClick = () => {
    forCustomerInterval(
      stripeResponse.customer.id,
      stripeResponse.customer.email,
      isPaused
    );
    onOpenInterval();
  };

  const handleChangeDeliveryDayClick = () => {
    forCustomerDeliveryDay(
      stripeResponse.customer.id,
      deliveryInfo.postal_code,
      stripeResponse.customer.email,
      isPaused
    );
    onOpenDeliveryDay();
  };

  const handleChangePeopleClick = () => {
    forCustomerPeople(
      stripeResponse.customer.id,
      stripeResponse.customer.email,
      isPaused
    );
    onOpenPeople();
  };

  const handleChangeMealboxClick = () => {
    forCustomerMealbox(
      stripeResponse.customer.id,
      stripeResponse.customer.email,
      isPaused
    );
    onOpenMealbox();
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralCode || "")
      .then(() => alert(text.referral.copy_success))
      .catch((err) => alert(text.referral.copy_fail + ": " + err));
  };

  const shareCode = () => {
    if (navigator.share) {
      const message =
        text?.referral?.sms_message ??
        "Hej! Med min kod får du 100kr rabatt på www.saveabl.com. Ange den i checkouten när du gör din beställning :)";
      const formattedMessage = message.replace("{referralCode}", referralCode);
      const fullMessage = `${formattedMessage}\n\nhttps://www.saveabl.com`;
      navigator.share({ text: fullMessage }).catch(console.error);
    } else {
      alert("Delning stöds inte på denna enhet");
    }
  };

  /* --------- UI --------- */
  return (
    <div className="w-full">
      {/* --- Referral/Värva en vän --- */}
      <h2 className="text-2xl text-secondary font-semibold mb-4">
        {text?.my_pages?.referral_title ?? "Värva en vän"}
      </h2>

      {referralCode ? (
        <div className="bg-primary bg-opacity-60 shadow-inner rounded px-8 pt-6 pb-8 mb-4">
          <p className="mb-4 font-medium">
            {text?.my_pages?.referral_explanation ??
              "Dela din värvningskod med vänner och få belöningar!"}
          </p>
          <p className="mb-4 text-medium font-bold">
            {text?.my_pages?.referral_your_code ?? "Din värvningskod"}:{" "}
            <span className="font-bold">{referralCode}</span>
          </p>
          <p className="text-sm text-black mb-4 italic">
            * {text?.my_pages?.referral_code_note ?? "Koden är giltig för nya kunder"}
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
              onClick={copyToClipboard}
            >
              {text?.my_pages?.referral_copy_button ?? "Kopiera kod"}
            </button>
            <button
              className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mt-4"
              onClick={shareCode}
            >
              {text?.my_pages?.referral_share_button ?? "Dela kod"}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-36 rounded-lg text-secondary font-semibold text-xl bg-primary-500 bg-opacity-50 flex flex-col justify-center items-center">
          <div>{text?.my_pages?.referral_no_code ?? "Ingen värvningskod tillgänglig"}</div>
        </div>
      )}

      {/* --- Prenumerationsdetaljer --- */}
      <h3 className="text-2xl text-secondary font-semibold mb-3">
        {text?.my_pages?.subscription_details ?? "Prenumerationsdetaljer"}
      </h3>

      <div className="bg-primary bg-opacity-60 shadow-inner rounded px-8 pt-6 pb-8 mb-4">
        <p className="mb-2">
          {text?.my_pages?.billing_frequency ?? "Frekvens"}:{" "}
          <span className="font-medium">
            {billingFrequency === "bi-weekly"
              ? text?.my_pages?.biweekly
              : text?.my_pages?.weekly}
          </span>
        </p>

        {translatedDeliveryDay && (
          <p className="mb-2">
            {text?.my_pages?.delivery_day ?? "Leveransdag"}:{" "}
            <span className="font-medium">{translatedDeliveryDay}</span>
          </p>
        )}

        {people && (
          <p className="mb-2">
            {text?.my_pages?.people ?? "Antal personer"}:{" "}
            <span className="font-medium">{people}</span>
          </p>
        )}

        {mealBoxType && (
          <p className="mb-4">
            {text?.my_pages?.mealbox_type ?? "Matkasse"}:{" "}
            <span className="font-medium">{mealBoxType}</span>
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 flex-wrap items-start">
          {isPaused ? (
            <button
              className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
              onClick={handleResumeSubscription}
            >
              {text?.my_pages?.resume_mealbox_button ?? "Återuppta"}
            </button>
          ) : (
            <button
              className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
              onClick={handleSubscriptionClick}
            >
              {text?.my_pages?.pause_mealbox_button ?? "Pausa"}
            </button>
          )}

          {/* ▼ Ändra – trigger utan kryss i menyn */}
          <button
            ref={triggerRef}
            type="button"
            aria-haspopup="menu"
            aria-expanded={editMenuOpen}
            onClick={() => setEditMenuOpen((v) => !v)}
            className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4 flex items-center gap-2"
          >
            {text?.my_pages?.edit_subscription_button ?? "Ändra"}
            <span aria-hidden className="ml-2">
              {editMenuOpen ? "▴" : "▾"}
            </span>
          </button>
        </div>
      </div>

      {/* Fixed overlay för rullgardinsmenyn (klick utanför stänger, inget kryss) */}
      {editMenuOpen && (
        <div className="fixed inset-0 z-[999] pointer-events-none">
          {/* klick utanför stänger */}
          <button
            aria-label={text?.common?.close ?? "Stäng"}
            className="absolute inset-0 pointer-events-auto bg-transparent"
            onClick={() => setEditMenuOpen(false)}
          />
          <div
            className="absolute pointer-events-auto"
            style={{ top: menuPos.top, left: menuPos.left, width: 288 }}
          >
            <div className="relative rounded-xl shadow-lg border border-[#eecfaa]/40 bg-[#fcf7e8] overflow-visible">
              {/* Meny-alternativ */}
              <div className="flex flex-col p-2">
                {!isPaused && (
                  <button
                    role="menuitem"
                    onClick={() => {
                      setEditMenuOpen(false);
                      handleChangeIntervalClick();
                    }}
                    className="w-full text-left px-4 py-3 text-[#6e2936] font-bold hover:bg-[#eecfaa] transition-colors flex items-center justify-between rounded-lg"
                  >
                    <span>{text?.my_pages?.interval_label ?? "Intervall"}</span>
                    <span aria-hidden>›</span>
                  </button>
                )}

                <button
                  role="menuitem"
                  onClick={() => {
                    setEditMenuOpen(false);
                    handleChangeDeliveryDayClick();
                  }}
                  className="w-full text-left px-4 py-3 text-[#6e2936] font-bold hover:bg-[#eecfaa] transition-colors flex items-center justify-between rounded-lg"
                >
                  <span>{text?.my_pages?.delivery_day_label ?? "Leveransdag"}</span>
                  <span aria-hidden>›</span>
                </button>

                <button
                  role="menuitem"
                  onClick={() => {
                    setEditMenuOpen(false);
                    handleChangePeopleClick();
                  }}
                  className="w-full text-left px-4 py-3 text-[#6e2936] font-bold hover:bg-[#eecfaa] transition-colors flex items-center justify-between rounded-lg"
                >
                  <span>{text?.my_pages?.people_label ?? "Antal personer"}</span>
                  <span aria-hidden>›</span>
                </button>

                <button
                  role="menuitem"
                  onClick={() => {
                    setEditMenuOpen(false);
                    handleChangeMealboxClick();
                  }}
                  className="w-full text-left px-4 py-3 text-[#6e2936] font-bold hover:bg-[#eecfaa] transition-colors flex items-center justify-between rounded-lg"
                >
                  <span>{text?.my_pages?.mealbox_label ?? "Matkasse"}</span>
                  <span aria-hidden>›</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Kundinformation --- */}
      <h2 className="text-2xl text-secondary font-semibold mb-4">
        {text?.my_pages?.account_information ?? "Kundinformation"}
      </h2>

      {stripeResponse ? (
        <div className="bg-primary bg-opacity-60 shadow-inner rounded px-8 pt-6 pb-8 mb-4">
          <p className="mb-2">
            {text?.my_pages?.email}:{" "}
            <span className="font-medium">{stripeResponse.customer.email}</span>
          </p>
          <p className="mb-2">
            {text?.my_pages?.name}:{" "}
            <span className="font-medium">{stripeResponse.customer.name}</span>
          </p>
          <p className="mb-2">
            {text?.my_pages?.phone}:{" "}
            <span className="font-medium">{stripeResponse.customer.phone}</span>
          </p>
          <p>
            {text?.my_pages?.address}:{" "}
            <span className="font-medium">
              {deliveryInfo.line1}, {deliveryInfo.city}, {deliveryInfo.postal_code},{" "}
              {deliveryInfo.country}
            </span>
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
              onClick={() =>
                forCustomerAddress(
                  stripeResponse.customer.id,
                  stripeResponse.customer.email,
                  stripeResponse.customer.phone,
                  deliveryInfo.line1
                )
              }
            >
              {text?.my_pages?.change_address_button ??
                "Ändra adress och telefonnummer"}
            </button>

            <button
              className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
              onClick={handleModifyAccountClick}
            >
              {text?.my_pages?.manage_account}
            </button>
          </div>
        </div>
      ) : null}

      {/* Modaler måste vara monterade i trädet */}
      <ManageSubscriptionModal
        updatePauseStatus={setIsPaused}
        updatePauseWeek={setPauseWeek}
      />
      <ManageAddressModal />
      <ChangePeopleModal />
      <ChangeMealboxModal />
    </div>
  );
};

export default UserAccountComponent;
