"use client";

import { useLang } from "@/hooks/useLang";
import useManageSubscriptionModal from "@/hooks/useManageSubscriptionModal";
import useChangeIntervalModal from "@/hooks/useChangeIntervalModal";
import useChangeDeliveryDayModal from "@/hooks/useChangeDeliveryDayModal";
import useManageAddressModal from "@/hooks/useManageAddressModal";
import ManageAddressModal from "@/components/modals/ManageAddressModal";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import ManageSubscriptionModal from "@/components/modals/ManageSubscriptionModal";
import { usePauseWeek } from "@/context/PauseWeekContext";
import { addWeeks, format } from "date-fns";

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

  const { isOpen, onClose, onOpen, forCustomer } = useManageSubscriptionModal();
  const { isOpen: isOpenInterval, onOpen: onOpenInterval, forCustomer: forCustomerInterval } = useChangeIntervalModal();
  const {
    isOpen: isOpenDeliveryDay,
    onOpen: onOpenDeliveryDay,
    forCustomer: forCustomerDeliveryDay,
  } = useChangeDeliveryDayModal();
  const { onOpen: onOpenAddress, forCustomer: forCustomerAddress } = useManageAddressModal();

  const { text } = useLang();
  const authContext = useContext(AuthContext);
  const { referralCode } = authContext || {};

  useEffect(() => {
    if (loading || !activeSubscription) return;

    const stripeResumesAt = activeSubscription?.pause_collection?.resumes_at;
    const isPausedIndefinitely = stripeResumesAt === null || stripeResumesAt === 0;
    const isStripePaused = stripeResumesAt > Date.now() / 1000 || isPausedIndefinitely;

    setIsPaused(isStripePaused);
    setIsIndefinitePause(isPausedIndefinitely);

    if (isStripePaused && !manualPauseSet && stripeResumesAt && !isPausedIndefinitely) {
      const stripeResumeDate = new Date(stripeResumesAt * 1000);
      const nextWeekDate = addWeeks(stripeResumeDate, 1);
      const formattedResumeWeek = format(nextWeekDate, "w");
      setPauseWeek(formattedResumeWeek);
    } else if (!isStripePaused) {
      setPauseWeek("");
    }
  }, [activeSubscription, loading, manualPauseSet, setPauseWeek]);

  // Om komponenten laddar, visa laddningsindikator
  if (loading) {
    return (
      <div className="flex gap-2 items-center">
        <div className="w-3 h-3 rounded-full animate-pulse bg-accent"></div> Loading...
      </div>
    );
  }

  // Om ingen aktiv prenumeration finns, visa fallback-meddelandet
  if (!activeSubscription) {
    return (
      <div className="w-full h-36 rounded-lg text-secondary font-semibold text-xl bg-primary-500 bg-opacity-50 flex flex-col justify-center items-center mb-8">
        <div>{text?.my_pages?.no_connection}</div>
        <div className="font-light text-sm">{text?.my_pages?.no_connection_desc}</div>
      </div>
    );
  }

  const updatePauseStatus = (status: boolean) => {
    setIsPaused(status);
  };

  const updatePauseWeek = (week: string) => {
    setPauseWeek(week);
  };

  const handleModifyAccountClick = async () => {
    try {
      const response = await axios.post("/api/create-billing-portal-session", {
        customerId: stripeResponse.customer.id,
      });
      const data = response.data;
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error redirecting to billing portal:", error);
    }
  };

  const handleSubscriptionClick = () => {
    forCustomer(stripeResponse.customer.id, stripeResponse.customer.email, isPaused);
    onOpen(); // Endast öppna modal här utan att sätta pausen
  };

  const handleResumeSubscription = async () => {
    try {
      await axios.post("/api/add-todo", {
        customer_email: stripeResponse.customer.email,
        customer_id: stripeResponse.customer.id,
        actions: "RESUME",
        wish: "Vill återuppta prenumerationen",
      });
      setIsPaused(false); // Återställ pausstatusen
      setPauseWeek(""); // Återställ pausveckan
    } catch (error) {
      console.error("Error adding resume action to backlog:", error);
    }
  };

  const handleChangeIntervalClick = () => {
    forCustomerInterval(stripeResponse.customer.id, stripeResponse.customer.email, isPaused);
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode || "").then(() => {
      alert(text.referral.copy_success);
    }).catch(err => {
      alert(text.referral.copy_fail + ': ' + err);
    });
  };

  const shareCode = () => {
    if (navigator.share) {
      const message = text?.referral?.sms_message ?? 
      "Hej! Med min kod får du 100kr rabatt på www.saveabl.com. Ange den i checkouten när du gör din beställning :)";
      const formattedMessage = message.replace("{referralCode}", referralCode);
      const fullMessage = `${formattedMessage}\n\nhttps://www.saveabl.com`;

      navigator.share({
        text: fullMessage,
      }).catch((error) => console.error("Delning misslyckades:", error));
    } else {
      alert("Delning stöds inte på denna enhet");
    }
  };

  if (loading || !activeSubscription) {
    return (
      <div className="flex gap-2 items-center">
        <div className="w-3 h-3 rounded-full animate-pulse bg-accent"></div> Loading...
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl text-secondary font-semibold mb-4">
        {text?.my_pages?.referral_title ?? "Värva en vän"}
      </h2>
      {referralCode ? (
        <div className="bg-primary bg-opacity-60 shadow-inner rounded px-8 pt-6 pb-8 mb-4">
          <p className="mb-4 font-medium">
            {text?.my_pages?.referral_explanation ?? "Dela din värvningskod med vänner och få belöningar!"}
          </p>
          <p className="mb-4 text-medium font-bold">
            {text?.my_pages?.referral_your_code ?? "Din värvningskod"}:{" "}
            <span className="font-bold">{referralCode}</span>
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
              onClick={copyToClipboard}
            >
              {text?.my_pages?.referral_copy_button ?? "Kopiera kod"}
            </button>
            <button
              className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
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
      {activeSubscription && (
        <>
          <h3 className="text-2xl text-secondary font-semibold mb-3">
            {text?.my_pages?.subscription_details ?? "Subscription Details"}
          </h3>
          <div className="bg-primary bg-opacity-60 shadow-inner rounded px-8 pt-6 pb-8 mb-4">
            <p className="mb-4">
              {text?.my_pages?.billing_frequency ?? "Billing Frequency"}:{" "}
              <span className="font-medium">
                {billingFrequency === "bi-weekly"
                  ? text?.my_pages?.biweekly
                  : text?.my_pages?.weekly}
              </span>
            </p>
            {isPaused && (
            <p className="mb-4">
            {isIndefinitePause
            ? text?.my_pages?.pause_indefinite ?? "Pausad tills vidare"
            : text?.my_pages?.pause_until?.replace("{week}", pauseWeek ? pauseWeek.toString() : "")}
            </p>
             )}
            {stripeResponse?.customer?.metadata?.deliveryDay && (
              <p className="mb-4">
                {text?.my_pages?.deliveryDay}:{" "}
                <span className="font-medium">
                  {stripeResponse.customer.metadata.deliveryDay}
                </span>
              </p>
            )}
            <div className="flex gap-2 flex-wrap">
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
              {!isPaused && (
                <button
                  className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
                  onClick={handleChangeIntervalClick}
                >
                  {text?.my_pages?.change_mealbox_button ?? "Ändra interval"}
                </button>
              )}
              <button
                className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
                onClick={handleChangeDeliveryDayClick}
              >
                {text?.my_pages?.change_delivery_day_button ?? "Change delivery day"}
              </button>
            </div>
          </div>
        </>
      )}
      <h2 className="text-2xl text-secondary font-semibold mb-4">
        {text?.my_pages?.account_information ?? "Account Information"}
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
              {deliveryInfo.line1}, {deliveryInfo.city}, {deliveryInfo.postal_code}, {deliveryInfo.country}
            </span>
          </p>
          <button
            className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-4 mt-4"
            onClick={() =>
              forCustomerAddress(
                stripeResponse.customer.id,
                stripeResponse.customer.email,
                stripeResponse.customer.phone,
                deliveryInfo.line1
              )
            }
          >
            {text?.my_pages?.change_address_button ?? "Ändra adress och telefonnummer"}
          </button>
          <button
            className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-8"
            onClick={handleModifyAccountClick}
          >
            {text?.my_pages?.manage_account}
          </button>
        </div>
      ) : (
        <div className="w-full h-36 rounded-lg text-secondary font-semibold text-xl bg-primary-500 bg-opacity-50 flex flex-col justify-center items-center">
          <div>{text?.my_pages?.no_connection}</div>
          <div className="font-light text-sm">{text?.my_pages?.no_connection_desc}</div>
        </div>
      )}
      <ManageSubscriptionModal
        updatePauseStatus={updatePauseStatus}
        updatePauseWeek={updatePauseWeek}
      />
      <ManageAddressModal />
    </div>
  );
};

export default UserAccountComponent;
