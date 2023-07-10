"use client";

import { AddOn } from "@/lib/addons";
import { Product } from "@/lib/mealkits";
import React, { createContext, useReducer } from "react";

// Define the state
interface State {
  product: Product | null;
  addOns: AddOn[];
  shippingCost: number;
}

// Define the action
interface Action {
  type: string;
  payload: Product | AddOn | number | any;
}

// Define the context
interface CheckoutContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

interface CheckoutProviderProps {
  children: React.ReactNode;
}

// Initial state
const initialState: State = {
  product: null,
  addOns: [],
  shippingCost: 0,
};

// Actions
export const actionTypes = {
  ADD_MEALKIT: "ADD_MEALKIT",
  ADD_ADDON: "ADD_ADDON",
  REMOVE_MEALKIT: "REMOVE_MEALKIT",
  REMOVE_ADDON: "REMOVE_ADDON",
  UPDATE_SHIPPING_COST: "UPDATE_SHIPPING_COST",
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

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};
