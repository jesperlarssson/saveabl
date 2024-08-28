"use client";

import { useLang } from "@/hooks/useLang";
import useManageSubscriptionModal from "@/hooks/useManageSubscriptionModal";
import useChangeIntervalModal from "@/hooks/useChangeIntervalModal";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import useChangeDeliveryDayModal from "@/hooks/useChangeDeliveryDayModal";
import { AuthContext } from "@/providers/AuthProvider"; 

interface DeliveryInfo {
  city: string;
  country: string;
  line1: string;
  postal_code: string;
}

interface UserAccountProps {
  loading: boolean;
  stripeResponse: any; // Consider defining a more specific type for this
  billingFrequency: string;
  isEvenWeek: boolean | null;
  activeSubscription: any; // Consider defining a more specific type for this
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
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const { isOpen, onClose, onOpen, forCustomer } = useManageSubscriptionModal();
  const {
    isOpen: isOpenInterval,
    onOpen: onOpenInterval,
    forCustomer: forCustomerInterval,
  } = useChangeIntervalModal();
  const {
    isOpen: isOpenDeliveryDay,
    onOpen: onOpenDeliveryDay,
    forCustomer: forCustomerDeliveryDay,
  } = useChangeDeliveryDayModal();

  const { text } = useLang();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Error: AuthContext is not available.</div>;
  }

  const { referralCode } = authContext;
  
  // useEffect kallad direkt och alltid
  useEffect(() => {
    setIsPaused(activeSubscription?.pause_collection !== null);
  }, [activeSubscription]);

  const handleModifyAccountClick = async () => {
    try {
      const response = await axios.post("/api/create-billing-portal-session", {
        customerId: stripeResponse.customer.id,
      });

      const data = response.data;

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Billing Portal
      }
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

  const shareOnSms = () => {
    const baseUrl = "https://www.saveabl.com";
    const urlWithCode = `${baseUrl}?referralCode=${encodeURIComponent(referralCode || "")}`;
    
    const message = text.referral.sms_message
      .replace("{referralCode}", referralCode || "")
      .replace("{urlWithCode}", urlWithCode);
  
    const smsLink = `sms:?&body=${encodeURIComponent(message)}`;
  
    window.location.href = smsLink;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode || "").then(() => {
      alert(text.referral.copy_success);
    }).catch(err => {
      alert(text.referral.copy_fail + ': ' + err);
    });
  };

  if (loading) {
    return (
      <div className="flex gap-2 items-center">
        <div className="w-3 h-3 rounded-full animate-pulse bg-accent"></div>{" "}
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Ny sektion för Värva en Vän */}
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
              onClick={shareOnSms}
            >
              {text?.my_pages?.referral_share_sms_button ?? "Dela via SMS"}
            </button>
            {/* Du kan lägga till fler delningsalternativ här */}
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
            {stripeResponse?.customer?.metadata?.deliveryDay && (
              <p className="mb-4">
                {text?.my_pages?.deliveryDay}:{" "}
                <span className="font-medium">
                  {stripeResponse.customer.metadata.deliveryDay}
                </span>
              </p>
            )}
            <div className="flex gap-2 flex-wrap">
              <button
                className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
                onClick={handleSubscriptionClick}
              >
                {isPaused
                  ? text?.my_pages?.resume_mealbox_button ?? "Återuppta"
                  : text?.my_pages?.pause_mealbox_button ?? "Pause"}
              </button>
              {!isPaused && (
                <button
                  className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
                  onClick={handleChangeIntervalClick}
                >
                  {text?.my_pages?.change_mealbox_button ?? "Change interval"}
                </button>
              )}
              <button
                className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
                onClick={handleChangeDeliveryDayClick}
              >
                {text?.my_pages?.change_delivery_day_button ??
                  "Change delivery day"}
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
          <p className="mb-4">
            {text?.my_pages?.phone}:{" "}
            <span className="font-medium">{stripeResponse.customer.phone}</span>
          </p>
          <p>
            {text?.my_pages?.address}:{" "}
            <span className="font-medium">
              {deliveryInfo.line1}, {deliveryInfo.city},{" "}
              {deliveryInfo.postal_code}, {deliveryInfo.country}
            </span>
          </p>
          <button
            className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
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
  
    </div>
  );
};

export default UserAccountComponent;
