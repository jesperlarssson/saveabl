"use client";

import { useLang } from "@/hooks/useLang";
import useManageSubscriptionModal from "@/hooks/useManageSubscriptionModal";
import useChangeIntervalModal from "@/hooks/useChangeIntervalModal";
import axios from "axios";
import React, { useEffect } from "react";

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
  const [isPaused, setIsPaused] = React.useState<boolean>(
    activeSubscription?.pause_collection !== null
  );
  const resumeDate = activeSubscription?.pause_collection?.resumes_at
    ? new Date(activeSubscription?.pause_collection?.resumes_at * 1000)
    : "unknown";
  const { isOpen, onClose, onOpen, forCustomer } = useManageSubscriptionModal();
  const {
    isOpen: isOpenInterval,
    onOpen: onOpenInterval,
    forCustomer: forCustomerInterval,
  } = useChangeIntervalModal();
  const { text } = useLang();
  const handleModifyAccountClick = async () => {
    try {
      //setLoading(true); // Assuming you have a loading state
      const response = await axios.post("/api/create-billing-portal-session", {
        customerId: stripeResponse.customer.id,
      });

      const data = response.data;

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Billing Portal
      }
    } catch (error) {
      console.error("Error redirecting to billing portal:", error);
      // Handle error (e.g., show an error message)
    } finally {
      //setLoading(false);
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

  useEffect(() => {
    if (activeSubscription?.pause_collection !== null) {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  }, [activeSubscription]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
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
            {billingFrequency === "bi-weekly" && (
              <p>
                {!isPaused && (text?.my_pages?.active_on ?? "Active on")}:{" "}
                {isPaused ? (
                  <span className="font-medium">
                    {text?.my_pages?.paused_until ?? "Paused until"}{" "}
                    {resumeDate instanceof Date
                      ? resumeDate.toLocaleDateString()
                      : "unknown"}
                  </span>
                ) : (
                  <span className="font-medium">
                    {isEvenWeek
                      ? text?.my_pages?.even_weeks
                      : text?.my_pages?.odd_weeks}
                  </span>
                )}
              </p>
            )}
            <div className="flex gap-4">
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
            </div>
          </div>
        </>
      )}

      <h2 className="text-2xl text-secondary font-semibold mb-4">
        {text?.my_pages?.account_information ?? "Account Information"}
      </h2>
      {stripeResponse && (
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
      )}
    </div>
  );
};

export default UserAccountComponent;
