"use client";

import useCheckout from "@/hooks/useCheckout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { getResponse, ResponseLinks } from "../lib/linkMapping";

function getUniqueWeekdaysFromDeliveryWindows(deliveryWindows: any) {
  const uniqueDays = new Set();

  for (const window of deliveryWindows) {
    const date = new Date(window.start * 1000); // Convert epoch timestamp to milliseconds
    const day = date.getUTCDay();

    if ([6, 0, 1].includes(day)) {
      uniqueDays.add(day);
    }
  }

  return [...uniqueDays] as number[];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-buy-button": any;
    }
  }
}

const PaymentArea = ({
  deliveryWindows,
  dk,
  offerId,
}: {
  deliveryWindows: any;
  dk: boolean;
  offerId: number;
}) => {
  const availableDays = getUniqueWeekdaysFromDeliveryWindows(deliveryWindows);

  const [links, setLinks] = useState<ResponseLinks[] | null>(null);

  useEffect(() => {
    const availableDays = getUniqueWeekdaysFromDeliveryWindows(deliveryWindows);

    const links: ResponseLinks[] | null = getResponse(
      availableDays,
      offerId,
      dk
    );

    setLinks(links);
  }, [deliveryWindows, dk, offerId]);

  return (
    <>
      <script async src="https://js.stripe.com/v3/buy-button.js"></script>
      <div className="grid sm:grid-cols-2">
        {links &&
          links.map((_, index: number) => (
            <div key={index} className="col-span-1">
              <stripe-buy-button
                buy-button-id={_.buyButtonId}
                publishable-key={_.publishableKey}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default PaymentArea;
