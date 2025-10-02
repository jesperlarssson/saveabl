"use client";

import { useEffect } from "react";
import { AddOn } from "@/lib/addons";
import { Product } from "@/lib/mealkits";
import React, { createContext, useReducer } from "react";

interface Type {
  odd: boolean;
  even: boolean;
}

export interface Address {
  street: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
}

export interface DeliveryWindow {
  start?: number | null;
  end?: number | null;
}

export interface UserInformation {
  address: Address;
  name: string | null;
  extraInfo: string | null;
  phone: string | null;
  productId: string | null;
  deliveryWindow: any | null;
  email: string | null;
  password: string | null;
  deliveryPeriodId: string | null;
  addOns: string[];
}

interface Action {
  type: string;
  payload: Product | AddOn | Type | number | any;
}

interface CheckoutContextProps {
  state: UserInformation;
  dispatch: React.Dispatch<Action>;
}

interface CheckoutProviderProps {
  children: React.ReactNode;
}

/* -------- Safe parser -------- */
const safeParse = <T,>(raw: string | null, fallback: T): T => {
  if (!raw || raw === "undefined") return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

/* -------- Initial state -------- */
const initialState: UserInformation =
  typeof window !== "undefined"
    ? {
        address: {
          street: null,
          city: null,
          postalCode: null,
          country: "SE",
        },
        name: safeParse(localStorage.getItem("name"), null),
        extraInfo: safeParse(localStorage.getItem("extraInfo"), null),
        phone: null,
        productId: safeParse(localStorage.getItem("productId"), null),
        deliveryWindow: safeParse(
          localStorage.getItem("deliveryWindow"),
          { start: null, end: null }
        ),
        email: safeParse(localStorage.getItem("email"), null),
        password: null,
        deliveryPeriodId: safeParse(localStorage.getItem("deliveryPeriodId"), null),
        addOns: [],
      }
    : {
        address: {
          street: null,
          city: null,
          postalCode: null,
          country: "SE",
        },
        name: null,
        extraInfo: null,
        phone: null,
        productId: null,
        deliveryWindow: { start: null, end: null },
        email: null,
        password: null,
        deliveryPeriodId: null,
        addOns: [],
      };

export const actionTypes = {
  SET_ADDRESS_STREET: "SET_ADDRESS_STREET",
  SET_ADDRESS_CITY: "SET_ADDRESS_CITY",
  SET_ADDRESS_POSTAL_CODE: "SET_ADDRESS_POSTAL_CODE",
  SET_ADDRESS_COUNTRY: "SET_ADDRESS_COUNTRY",

  SET_NAME: "SET_NAME",
  SET_PHONE: "SET_PHONE",
  SET_PRODUCT_ID: "SET_PRODUCT_ID",
  SET_EXTRA_INFO: "SET_EXTRA_INFO",

  SET_DELIVERY_WINDOW_START: "SET_DELIVERY_WINDOW_START",
  SET_DELIVERY_WINDOW_END: "SET_DELIVERY_WINDOW_END",

  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
  SET_DELIVERY_PERIOD_ID: "SET_DELIVERY_PERIOD_ID",

  ADD_ADDON: "ADD_ADDON",
  REMOVE_ADDON: "REMOVE_ADDON",
};

const reducer = (state: UserInformation, action: Action): UserInformation => {
  switch (action.type) {
    case actionTypes.SET_ADDRESS_STREET:
      return { ...state, address: { ...state.address, street: action.payload as string } };
    case actionTypes.SET_ADDRESS_CITY:
      return { ...state, address: { ...state.address, city: action.payload as string } };
    case actionTypes.SET_ADDRESS_POSTAL_CODE:
      return { ...state, address: { ...state.address, postalCode: action.payload as string } };
    case actionTypes.SET_ADDRESS_COUNTRY:
      return { ...state, address: { ...state.address, country: action.payload as string } };
    case actionTypes.SET_NAME:
      return { ...state, name: action.payload as string };
    case actionTypes.SET_PHONE:
      return { ...state, phone: action.payload as string };
    case actionTypes.SET_EXTRA_INFO:
      return { ...state, extraInfo: action.payload as string };
    case actionTypes.SET_PRODUCT_ID:
      return { ...state, productId: action.payload as string };
    case actionTypes.SET_DELIVERY_WINDOW_START:
      return {
        ...state,
        deliveryWindow: { ...state.deliveryWindow, start: action.payload as number },
      };
    case actionTypes.SET_DELIVERY_WINDOW_END:
      return {
        ...state,
        deliveryWindow: { ...state.deliveryWindow, end: action.payload as number },
      };
    case actionTypes.SET_EMAIL:
      return { ...state, email: action.payload as string };
    case actionTypes.SET_PASSWORD:
      return { ...state, password: action.payload as string };
    case actionTypes.SET_DELIVERY_PERIOD_ID:
      return { ...state, deliveryPeriodId: action.payload as string };
    default:
      return state;
  }
};

export const CheckoutContext = createContext<CheckoutContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(state.name));
    localStorage.setItem("email", JSON.stringify(state.email));
    localStorage.setItem("productId", JSON.stringify(state.productId ?? null));
    localStorage.setItem("deliveryWindow", JSON.stringify(state.deliveryWindow));
    localStorage.setItem("deliveryPeriodId", JSON.stringify(state.deliveryPeriodId));
  }, [state]);

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};
