"use client";

import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import React, { useEffect } from "react";
// Import Stripe
import { loadStripe } from "@stripe/stripe-js";
import BodyText from "@/components/ui/BodyText";
import instance from "@/lib/apiAxios";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface AdminContentProps {
  children?: React.ReactNode;
}

const AdminContent: React.FC<AdminContentProps> = () => {
  const [errors, setErrors] = React.useState<any>();
  const [latestResponse, setLatestResponse] = React.useState<any>();
  const [terminalOpen, setTerminalOpen] = React.useState<boolean>(false);
  const [callUrl, setCallUrl] = React.useState<string>("api/ping");
  const [callBody, setCallBody] = React.useState<string>("{}");
  const [callResponse, setCallResponse] = React.useState<string | null>(null);

  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { user } = auth;

  const testConnection = async () => {
    try {
      const res = await fetch("https://main-cxgvpi5ruq-ey.a.run.app/api/ping");
      const data = await res.text();

      setLatestResponse(data);
    } catch (error: any) {
      setErrors(error.message);
    }
  };

  const checkCustomClaims = async () => {
    if (user) {
      user
        .getIdTokenResult()
        .then((idTokenResult) => {
          // Get custom claims
          const customClaims = idTokenResult.claims;

          // Check for the 'admin' custom claim
          if (customClaims.admin) {
            setLatestResponse("User is an admin");
          }

          // Display all custom claims
          setLatestResponse("Custom claims:" + JSON.stringify(customClaims));
        })
        .catch((error) => {
          setLatestResponse("Error getting custom claims:" + error);
        });
    }
  };

  const displayToken = async () => {
    if (user) {
      const token = await user.getIdToken();
      setLatestResponse(token);
    }
  };

  const handleAdminCreation = async () => {
    try {
      const res = await axios.post("/api/user/make-user-admin", {});
      const data = await res.data;

      setLatestResponse(JSON.stringify(data));
    } catch (error: any) {
      setErrors(error.message);
    }
  };

  const addProductWithInterval = async (interval: number) => {
    try {
      const userToken = await user?.getIdToken();
      console.log("userToken", userToken);
      const res = await axios.post("/api/products/create", {
        token: userToken,
        interval: interval,
      });
      console.log("Product added:", res.data);
      setLatestResponse("Product added:" + JSON.stringify(res.data));
    } catch (error: any) {
      setErrors(error.message);
    }
  };

  // Function to redirect to Stripe Checkout
  async function redirectToCheckout(sessionId: string) {
    const stripe = await stripePromise;
    if (!stripe) {
      return;
    }
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    if (error) {
      console.error(error);
    }
  }

  const handleTestCheckout = async () => {
    try {
      const res = await axios.post("", {
        name: "Jesper",
        extraInfo: "Test test test",
        phone: "123456",
        productId: "9bee681b-59a4-4a37-83a6-f8ee17e9e022",
        email: "new@saveabl.se",
        deliveryWindow: {
          start: 1693726501, // Sun Sep 03 2023 09:35:01 GMT+0200
          end: 1693744501, // Sun Sep 03 2023 14:35:01 GMT+0200
        },
        deliveryPeriodId: "4801ee7c-8477-4de6-a9ff-26fb365b4fab",
        password: "123456",
        address: {
          city: "Göteborg",
          street: "Test",
          postalCode: "22334",
        },
      });
      const data = await res.data;
      redirectToCheckout(data.id);

      setLatestResponse(JSON.stringify(data));
    } catch (error: any) {
      setErrors(error.message);
    }
  };

  const handleOpenTerminal = async () => {
    setTerminalOpen(!terminalOpen);
  };

  const handleApiCall = async () => {
    try {
      const res = await instance.post(callUrl, JSON.parse(callBody));
      const data = await res.data;

      setCallResponse(JSON.stringify(data));
    } catch (error: any) {
      setCallResponse(error.message);
    }
  };

  const resetMessages = () => {
    setErrors(null);
    setLatestResponse(null);
  };

  return (
    <div>
      <div className="mx-8 flex gap-8 mt-8 flex-wrap">
        <div
          onClick={testConnection}
          className="drop-shadow w-80 h-36 rounded-lg bg-primary flex flex-col justify-end p-4 hover:-translate-y-2 hover:bg-opacity-90 transition cursor-pointer"
        >
          <h3 className="font-poppins text-secondary">PING</h3>
        </div>
        <div
          onClick={handleAdminCreation}
          className="drop-shadow w-80 h-36 rounded-lg bg-primary flex flex-col justify-end p-4 hover:-translate-y-2 hover:bg-opacity-90 transition cursor-pointer"
        >
          <h3 className="font-poppins text-secondary">Skapa en admin</h3>
        </div>
        <div
          onClick={checkCustomClaims}
          className="drop-shadow w-80 h-36 rounded-lg bg-primary flex flex-col justify-end p-4 hover:-translate-y-2 hover:bg-opacity-90 transition cursor-pointer"
        >
          <h3 className="font-poppins text-secondary">Kolla claims</h3>
        </div>
        <div
          onClick={displayToken}
          className="drop-shadow w-80 h-36 rounded-lg bg-primary flex flex-col justify-end p-4 hover:-translate-y-2 hover:bg-opacity-90 transition cursor-pointer"
        >
          <h3 className="font-poppins text-secondary">Visa Token</h3>
        </div>

        <div
          onClick={() => addProductWithInterval(1)}
          className="drop-shadow w-80 h-36 rounded-lg bg-primary flex flex-col justify-end p-4 hover:-translate-y-2 hover:bg-opacity-90 transition cursor-pointer"
        >
          <h3 className="font-poppins text-secondary">
            Lägg till varje vecka product
          </h3>
        </div>
        <div
          onClick={handleTestCheckout}
          className="drop-shadow w-80 h-36 rounded-lg bg-primary flex flex-col justify-end p-4 hover:-translate-y-2 hover:bg-opacity-90 transition cursor-pointer"
        >
          <h3 className="font-poppins text-secondary">Checkout</h3>
        </div>

        <div
          onClick={handleOpenTerminal}
          className="drop-shadow w-80 h-36 rounded-lg bg-primary flex flex-col justify-end p-4 hover:-translate-y-2 hover:bg-opacity-90 transition cursor-pointer"
        >
          <h3 className="font-poppins text-secondary">Saveabl-terminalen</h3>
        </div>

        <div
          onClick={resetMessages}
          className="drop-shadow w-80 h-36 rounded-lg bg-primary flex flex-col justify-end p-4 hover:-translate-y-2 hover:bg-opacity-90 transition cursor-pointer"
        >
          <h3 className="font-poppins text-secondary">RESET</h3>
        </div>
      </div>

      {terminalOpen && (
        <>
          <div className="w-full p-8 flex flex-col">
            <BodyText>POST Terminal</BodyText>
            <div className="flex gap-4 mb-2 mt-2">
              <button
                onClick={() => {
                  setCallUrl("areas");
                  setCallBody('{"name": "Exempel", "audience": "exempel"}');
                }}
                className="test-sm px-2 py-1 bg-primary rounded-md text-secondary"
              >
                New area
              </button>
              <button
                onClick={() => {
                  setCallUrl("areas/{INSERT AREA ID HERE}/postalcode/batch");
                  setCallBody('{"postalCodes": [], "country": "SE"}');
                }}
                className="test-sm px-2 py-1 bg-primary rounded-md text-secondary"
              >
                Postkoder
              </button>
              <button
                onClick={() => {
                  setCallUrl("products");
                  setCallBody(
                    '{"type": "subscription" eller "standard" eller "addon","stripeProductId": "PRODUCT_ID FRÅN STRIPE","schedule": (om prenumeration) {"interval": "week","intervalCount": 2}}'
                  );
                }}
                className="test-sm px-2 py-1 bg-primary rounded-md text-secondary"
              >
                New product
              </button>
            </div>
            <input
              onChange={(e) => setCallUrl(e.target.value)}
              className="p-2 bg-black bg-opacity-80 text-green-500 placeholder-green-500 border-b border-green-400"
              type="text"
              placeholder="url"
              value={callUrl}
            />
            <textarea
              onChange={(e) => setCallBody(e.target.value)}
              className="bg-black bg-opacity-80 text-green-500 placeholder-green-500 p-2 h-96"
              value={callBody}
            />
            <div onClick={handleApiCall} className="flex">
              <button className="px-4 py-2 bg-accent-500 text-white mt-4 rounded-md">
                Send to backend
              </button>
            </div>
          </div>
          {callResponse && (
            <div className="w-full p-8 flex flex-col">
              <BodyText>Response</BodyText>
              <textarea
                className="bg-black bg-opacity-80 text-green-500 placeholder-green-500 p-2 h-96"
                value={callResponse}
              />
            </div>
          )}
        </>
      )}

      {latestResponse && (
        <div className="m-8 w-full p-8 rounded-xl bg-green-200">
          <div className="flex flex-col gap-4">
            <h3 className="font-poppins text-secondary">Senaste svar:</h3>
            <p className="">{latestResponse}</p>
          </div>
        </div>
      )}

      {errors && (
        <div className="m-8 w-full p-8 rounded-xl bg-red-300">
          <div className="flex flex-col gap-4">
            <h3 className="font-poppins text-secondary">Felmeddelande</h3>
            <p className="">{errors}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContent;
