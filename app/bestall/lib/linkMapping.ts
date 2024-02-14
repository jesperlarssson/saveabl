export type ResponseLinks = {
  link: string;
  buyButtonId: string;
  publishableKey: string;
};

export function getResponse(
  availableDays?: number[],
  offerId?: number,
  dk?: boolean
): ResponseLinks[] | null {
  const data: { [key: string]: ResponseLinks[] } = {
    "6,0,1-1-false": [
      {
        link: "https://buy.stripe.com/3cs4ikcneazE7fybIT",
        buyButtonId: "buy_btn_1NwQaAEhPZIzKmuiPOeW64ix",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/28o3egfzq4bgbvO00f",
        buyButtonId: "buy_btn_1NwQgEEhPZIzKmuiT38PNbM0",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/dR6bKM0EwcHMeI0eVd",
        buyButtonId: "buy_btn_1NwQk5EhPZIzKmuif0utwx4Y",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/7sI0243QI8rwczS7sP",
        buyButtonId: "buy_btn_1NwQYuEhPZIzKmuiv2hPtOy9",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
    ],
    "6,1-1-false": [
      {
        link: "https://buy.stripe.com/eVa5mogDuazE0Ra5kw",
        buyButtonId: "buy_btn_1NwQcbEhPZIzKmuins4E7aCS",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/eVa8yAfzqePUarK9AQ",
        buyButtonId: "buy_btn_1NwQgEEhPZIzKmuiT38PNbM0",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/bIY024af66jo57q28s",
        buyButtonId: "buy_btn_1NwQkNEhPZIzKmuiYTdoOA2r",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/cN24ikcnebDI43m00o",
        buyButtonId: "buy_btn_1NwQlxEhPZIzKmuitRxWILys",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
    ],
    "6,0,1-2-false": [
      {
        link: "https://buy.stripe.com/28o4ik72U7nsarKeV7",
        buyButtonId: "buy_btn_1NwQd0EhPZIzKmui2ioMFy6b",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/00g2acbjagY27fy4gx",
        buyButtonId: "buy_btn_1NwQgwEhPZIzKmui0Pj92L1M",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/6oE9CEevmdLQfM45kF",
        buyButtonId: "buy_btn_1NwQkgEhPZIzKmuiKVSRiQvZ",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/eVaaGI9b2gY2gQ84gF",
        buyButtonId: "buy_btn_1NwQmEEhPZIzKmuiWjRP6wjB",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
    ],
    "6,1-2-false": [
      {
        link: "https://buy.stripe.com/aEU2ac4UMdLQeI014i",
        buyButtonId: "buy_btn_1NwQdlEhPZIzKmuinfH9ozaX",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/8wMg12fzqfTYarKbJ0",
        buyButtonId: "buy_btn_1NwQhDEhPZIzKmuiHuxnhEgi",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/eVaaGI2MEdLQfM46oK",
        buyButtonId: "buy_btn_1NwQkwEhPZIzKmuiuShMpbyR",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
    ],
    "null-1-true": [
      {
        link: "https://buy.stripe.com/eVa2acaf64bg57q3cJ",
        buyButtonId: "buy_btn_1NwRPZEhPZIzKmuiSHqrWrJc",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/28o2acfzq37cbvOeVp",
        buyButtonId: "buy_btn_1NwRK3EhPZIzKmuipHNrXRFn",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/eVa1680Ew4bg57q00r",
        buyButtonId: "buy_btn_1NwRAwEhPZIzKmui6u2Yi52k",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/6oE6qscnecHMarK8wZ",
        buyButtonId: "buy_btn_1NwRG1EhPZIzKmuiYhyDLQrE",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
    ],
    "null-2-true": [
      {
        link: "https://buy.stripe.com/9AQ1682MEcHMfM48wY",
        buyButtonId: "buy_btn_1NwRDIEhPZIzKmuiqtqzti4w",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/aEU8yA3QI0Z49nG6oS",
        buyButtonId: "buy_btn_1NwRHHEhPZIzKmuifYcbOFN1",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/fZe6qsaf6ePU1Ve7sY",
        buyButtonId: "buy_btn_1NwRO1EhPZIzKmuiHPHChc2e",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
      {
        link: "https://buy.stripe.com/aEUbKM1IA4bgdDW7t0",
        buyButtonId: "buy_btn_1NwRQpEhPZIzKmuigktd6WNj",
        publishableKey:
          "pk_live_51JJyMpEhPZIzKmuiJlsglRPcLTT9dLLdE7kY8fTXL5INYWiN1o6G1BQ2lqDC2qmBd0zZo7VJ9kKfshUa0Ykja8lB009CDY1C3U",
      },
    ],
  };

  const key = `${availableDays?.join(",") || "null"}-${offerId}-${dk}`;
  return data[key] || null;
}
