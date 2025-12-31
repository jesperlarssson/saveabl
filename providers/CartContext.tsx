"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const CART_STORAGE_KEY = "saveabl_cart_v1";

/** Typ för items i varukorgen */
export type CartItem = {
  id: string; // t.ex. "mealkit" eller produktens id
  name: string; // visningsnamn
  price: number; // pris i kr
  priceId: string; // Stripe priceId
  image?: string; // bild-url, valfri
  quantity: number; // antal
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  /* 🧷 1) Läs in från localStorage när CartProvider mountar på klienten */
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      // ✅ ROBUST: Om vi landar på /success med session_id → töm direkt,
      // innan vi ens försöker läsa localStorage.
      const path = window.location.pathname || "";
      const params = new URLSearchParams(window.location.search || "");
      const hasSessionId = params.has("session_id");

      if (path.startsWith("/success") && hasSessionId) {
        setItems([]);
        try {
          window.localStorage.removeItem(CART_STORAGE_KEY);
        } catch (e) {
          console.warn("Kunde inte rensa localStorage för varukorg", e);
        }
        return; // viktigt: läs inte in gammal varukorg efteråt
      }

      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (err) {
      console.warn("Kunde inte läsa varukorg från localStorage", err);
    }
  }, []);

  /* 🧷 2) Spara till localStorage varje gång items ändras */
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn("Kunde inte spara varukorg till localStorage", err);
    }
  }, [items]);

  const addItem: CartContextValue["addItem"] = (item) => {
    setItems((prev) => {
      const existing = prev.find(
        (p) => p.id === item.id && p.priceId === item.priceId
      );

      // Om samma produkt redan finns → öka antal
      if (existing) {
        return prev.map((p) =>
          p === existing
            ? { ...p, quantity: p.quantity + (item.quantity ?? 1) }
            : p
        );
      }

      // Annars lägg till ny rad
      return [
        ...prev,
        {
          ...item,
          quantity: item.quantity ?? 1,
        },
      ];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart: CartContextValue["clearCart"] = () => {
    setItems([]);
  };

  const increaseQuantity: CartContextValue["increaseQuantity"] = (id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };

  const decreaseQuantity: CartContextValue["decreaseQuantity"] = (id) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart måste användas innanför CartProvider");
  }
  return ctx;
};
