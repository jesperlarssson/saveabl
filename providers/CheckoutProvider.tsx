"use client";

import { useEffect } from "react";

import { AddOn } from "@/lib/addons";
import { Product } from "@/lib/mealkits";
import React, { createContext, useReducer } from "react";

interface Type {
  odd: boolean;
  even: boolean;
}

interface DeliveryDay {
  id: string;
  start: number;
  label: string;
  end: number;
}

// Define the state
interface State {
  product: Product | null;
  addOns: AddOn[];
  shippingCost: number;
  productType: Type;
  deliveryDay: DeliveryDay | null;
  zipCode: string | null;
  deliveryDays: DeliveryDay[];
  deliveryDaysError: string | null;
  preferredWeekDay: number | null;
}

// Define the action
interface Action {
  type: string;
  payload: Product | AddOn | Type | number | any;
}

// Define the context
interface CheckoutContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

interface CheckoutProviderProps {
  children: React.ReactNode;
}

// Before the creation of the CheckoutContext
const initialState: State =
  typeof window !== "undefined"
    ? {
        product: JSON.parse(localStorage.getItem("product") || "null"),
        addOns: JSON.parse(localStorage.getItem("addOns") || "[]"),
        shippingCost: JSON.parse(localStorage.getItem("shippingCost") || "0"),
        productType: JSON.parse(
          localStorage.getItem("productType") || '{"odd": false, "even": false}'
        ),
        deliveryDay: JSON.parse(
          localStorage.getItem("deliveryDay") ||
            '{"label": null, "start": null}'
        ),
        zipCode: JSON.parse(localStorage.getItem("zipCode") || "null"),
        deliveryDays: JSON.parse(localStorage.getItem("deliveryDays") || "[]"),
        deliveryDaysError: JSON.parse(
          localStorage.getItem("deliveryDaysError") || "null"
        ),
        preferredWeekDay: JSON.parse(
          localStorage.getItem("preferredWeekDay") || "null"
        ),
      }
    : {
        product: null,
        addOns: [],
        shippingCost: 0,
        productType: {
          odd: false,
          even: false,
        },
        deliveryDay: null,
        zipCode: null,
        deliveryDays: [],
        deliveryDaysError: null,
        preferredWeekDay: null,
      };

// Actions
export const actionTypes = {
  ADD_MEALKIT: "ADD_MEALKIT",
  ADD_ADDON: "ADD_ADDON",
  REMOVE_MEALKIT: "REMOVE_MEALKIT",
  REMOVE_ADDON: "REMOVE_ADDON",
  UPDATE_SHIPPING_COST: "UPDATE_SHIPPING_COST",
  SET_PRODUCT_TYPE: "SET_PRODUCT_TYPE",
  SET_DELIVERY_DAY: "SET_DELIVERY_DAY",
  SET_ZIP_CODE: "SET_ZIP_CODE",
  SET_DELIVERY_DAYS: "SET_DELIVERY_DAYS",
  SET_DELIERY_DAYS_ERROR: "SET_DELIERY_DAYS_ERROR",
  SET_PREFERRED_WEEK_DAY: "SET_PREFERRED_WEEK_DAY",

};

// Reducer
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case actionTypes.ADD_MEALKIT:
      return { ...state, product: action.payload as Product };
    case actionTypes.ADD_ADDON:
      const existingAddOnIndex = state.addOns.findIndex(
        (addOn) => addOn.id === (action.payload as AddOn).id
      );
      if (existingAddOnIndex > -1) {
        const updatedAddOns = [...state.addOns];
        updatedAddOns[existingAddOnIndex].quantity! += 1;
        return { ...state, addOns: updatedAddOns };
      } else {
        return {
          ...state,
          addOns: [
            ...state.addOns,
            { ...(action.payload as AddOn), quantity: 1 },
          ],
        };
      }
    case actionTypes.REMOVE_MEALKIT:
      return { ...state, product: null, addOns: [] }; // When product is removed, clear the addOns too
    case actionTypes.REMOVE_ADDON:
      const existingAddOnIndexRemove = state.addOns.findIndex(
        (addOn) => addOn.id === (action.payload as AddOn).id
      );
      if (
        existingAddOnIndexRemove > -1 &&
        state.addOns[existingAddOnIndexRemove].quantity! > 1
      ) {
        // Decrease the quantity of the existing add-on
        const updatedAddOns = [...state.addOns];
        updatedAddOns[existingAddOnIndexRemove].quantity! -= 1;
        return { ...state, addOns: updatedAddOns };
      } else {
        // Remove the add-on entirely if the quantity is 1 or less
        return {
          ...state,
          addOns: state.addOns.filter(
            (item) => item.id !== (action.payload as AddOn).id
          ),
        };
      }

    case actionTypes.UPDATE_SHIPPING_COST:
      return { ...state, shippingCost: action.payload as number };

    case actionTypes.SET_PRODUCT_TYPE:
      return { ...state, productType: action.payload as Type };

    case actionTypes.SET_DELIVERY_DAY:
      return { ...state, deliveryDay: action.payload as DeliveryDay };

    case actionTypes.SET_ZIP_CODE:
      return { ...state, zipCode: action.payload as string };

    case actionTypes.SET_DELIVERY_DAYS:
      return { ...state, deliveryDays: action.payload as DeliveryDay[] };
    
    case actionTypes.SET_DELIERY_DAYS_ERROR:
      return { ...state, deliveryDaysError: action.payload as string };

    case actionTypes.SET_PREFERRED_WEEK_DAY:
      return { ...state, preferredWeekDay: action.payload as number | null };

    default:
      return state;
  }
};

export const CheckoutContext = createContext<CheckoutContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // This useEffect will run every time the state changes
  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(state.product));
    localStorage.setItem("addOns", JSON.stringify(state.addOns));
    localStorage.setItem("shippingCost", JSON.stringify(state.shippingCost));
    localStorage.setItem("productType", JSON.stringify(state.productType));
    localStorage.setItem("deliveryDay", JSON.stringify(state.deliveryDay));
    localStorage.setItem("zipCode", JSON.stringify(state.zipCode));
    localStorage.setItem("deliveryDays", JSON.stringify(state.deliveryDays));
    localStorage.setItem("deliveryDaysError", JSON.stringify(state.deliveryDaysError));
    localStorage.setItem("preferredWeekDay", JSON.stringify(state.preferredWeekDay));
    
  }, [state]); // Dependency array with state. If state changes, useEffect will run again.

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};
