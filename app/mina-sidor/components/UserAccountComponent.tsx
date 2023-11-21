"use client";

import useManageSubscriptionModal from "@/hooks/useManageSubscriptionModal";
import axios from "axios";
import React from "react";

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
  const { isOpen, onClose, onOpen, forCustomer } = useManageSubscriptionModal();
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
    forCustomer(stripeResponse.customer.id, stripeResponse.customer.email);
    onOpen();
  };

  const handleCancelSubscriptionClick = () => {
    // Placeholder for cancel subscription logic
    console.log("Cancel Subscription clicked");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      {activeSubscription && (
        <>
          <h3 className="text-xl text-secondary font-semibold mb-3">
            Subscription Details
          </h3>
          <div className="bg-primary bg-opacity-60 shadow-inner rounded px-8 pt-6 pb-8 mb-4">
            <p className="mb-4">
              Billing Frequency:{" "}
              <span className="font-medium">{billingFrequency}</span>
            </p>
            {billingFrequency === "bi-weekly" && (
              <p>
                Active on:{" "}
                <span className="font-medium">
                  {isEvenWeek ? "Even Weeks" : "Odd Weeks"}
                </span>
              </p>
            )}
            <div className="flex gap-4">
              <button
                className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
                onClick={handleSubscriptionClick}
              >
                Pausa
              </button>
              <button
                className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
                onClick={handleSubscriptionClick}
              >
                Byt intervall
              </button>
            </div>
          </div>
        </>
      )}

      <h2 className="text-2xl text-secondary font-semibold mb-4">
        Account Information
      </h2>
      {stripeResponse && (
        <div className="bg-primary bg-opacity-60 shadow-inner rounded px-8 pt-6 pb-8 mb-4">
          <p className="mb-2">
            Email:{" "}
            <span className="font-medium">{stripeResponse.customer.email}</span>
          </p>
          <p className="mb-2">
            Name:{" "}
            <span className="font-medium">{stripeResponse.customer.name}</span>
          </p>
          <p className="mb-4">
            Phone:{" "}
            <span className="font-medium">{stripeResponse.customer.phone}</span>
          </p>
          <p>
            Address:{" "}
            <span className="font-medium">
              {deliveryInfo.line1}, {deliveryInfo.city},{" "}
              {deliveryInfo.postal_code}, {deliveryInfo.country}
            </span>
          </p>
          <button
            className="bg-secondary hover:bg-secondary-800 text-white font-bold py-2 px-4 mr-2 mt-4"
            onClick={handleModifyAccountClick}
          >
            Hantera konto
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAccountComponent;
