"use client";

import { useEffect } from "react";

import { AddOn } from "@/lib/addons";
import { Product } from "@/lib/mealkits";
import React, { createContext, useReducer } from "react";

interface Type {
  odd: boolean;
  even: boolean;
}

//
// {
//   "address": {
//     "street": "Göteborgsvägen 2",
//     "city": "Göteborg",
//     "postalCode": "94301"
//   },
//   "name": "Jesper Larsson",
//   "phone": "+46701234567",
//   "productId": "aksldjiaosjdsjalsnd",
//   "deliveryWindow": {
//     "start": 69069706,
//     "end": 690697089
//   },
//   "email": "testtest@hotmail.com",
//   "password": "password123456",
//   "deliveryPeriodId": "uas9-0du9s0ud9sud90sud0"
// }

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

// Define the action
interface Action {
  type: string;
  payload: Product | AddOn | Type | number | any;
}

// Define the context
interface CheckoutContextProps {
  state: UserInformation;
  dispatch: React.Dispatch<Action>;
}

interface CheckoutProviderProps {
  children: React.ReactNode;
}

// Before the creation of the CheckoutContext
const initialState: UserInformation =
  typeof window !== "undefined"
    ? {
        address: {
          street: null,
          city: null,
          postalCode: null,
          country: "SE",
        },
        name: JSON.parse(localStorage.getItem("name") || "null"),
        extraInfo: JSON.parse(localStorage.getItem("extraInfo") || "null"),
        phone: null,
        productId: JSON.parse(localStorage.getItem("productId") || "null"),
        deliveryWindow: JSON.parse(
          localStorage.getItem("deliveryWindow") ||
            '{"start": null, "end": null}'
        ),
        email: JSON.parse(localStorage.getItem("email") || "null"),
        password: null,
        deliveryPeriodId: JSON.parse(
          localStorage.getItem("deliveryPeriodId") || "null"
        ),
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
        deliveryWindow: {
          start: null,
          end: null,
        },
        email: null,
        password: null,
        deliveryPeriodId: null,
        addOns: [],
      };

export const actionTypes = {
  // Address actions
  SET_ADDRESS_STREET: "SET_ADDRESS_STREET",
  SET_ADDRESS_CITY: "SET_ADDRESS_CITY",
  SET_ADDRESS_POSTAL_CODE: "SET_ADDRESS_POSTAL_CODE",
  SET_ADDRESS_COUNTRY: "SET_ADDRESS_COUNTRY",

  // User info actions
  SET_NAME: "SET_NAME",
  SET_PHONE: "SET_PHONE",
  SET_PRODUCT_ID: "SET_PRODUCT_ID",
  SET_EXTRA_INFO: "SET_EXTRA_INFO",

  // Delivery Window actions
  SET_DELIVERY_WINDOW_START: "SET_DELIVERY_WINDOW_START",
  SET_DELIVERY_WINDOW_END: "SET_DELIVERY_WINDOW_END",

  // Other fields
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
  SET_DELIVERY_PERIOD_ID: "SET_DELIVERY_PERIOD_ID",

  // Other actions
  ADD_ADDON: "ADD_ADDON",
  REMOVE_ADDON: "REMOVE_ADDON",

};

// Reducer
const reducer = (state: UserInformation, action: Action): UserInformation => {
  switch (action.type) {
    case actionTypes.SET_ADDRESS_STREET:
      return {
        ...state,
        address: { ...state.address, street: action.payload as string },
      };

    case actionTypes.SET_ADDRESS_CITY:
      return {
        ...state,
        address: { ...state.address, city: action.payload as string },
      };

    case actionTypes.SET_ADDRESS_POSTAL_CODE:
      return {
        ...state,
        address: { ...state.address, postalCode: action.payload as string },
      };

    case actionTypes.SET_ADDRESS_COUNTRY:
      return {
        ...state,
        address: { ...state.address, country: action.payload as string },
      };

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
        deliveryWindow: {
          ...state.deliveryWindow,
          start: action.payload as number,
        },
      };

    case actionTypes.SET_DELIVERY_WINDOW_END:
      return {
        ...state,
        deliveryWindow: {
          ...state.deliveryWindow,
          end: action.payload as number,
        },
      };

    case actionTypes.SET_EMAIL:
      return { ...state, email: action.payload as string };

    case actionTypes.SET_PASSWORD:
      return { ...state, password: action.payload as string };

    case actionTypes.SET_DELIVERY_PERIOD_ID:
      return { ...state, deliveryPeriodId: action.payload as string };

    // case actionTypes.ADD_ADDON:
    //   return {
    //     ...state,
    //     addOns: [...state.addOns, { ...(action.payload as AddOn), quantity: 1 }],
    //   };
    
    // case actionTypes.REMOVE_ADDON:
    //   return {
    //     ...state,
    //     addOns: state.addOns.filter(
    //       (item) => item.id !== (action.payload as AddOn).id
    //     ),
    //   };
      

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

  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(state.name));
    localStorage.setItem("email", JSON.stringify(state.email)); 
    localStorage.setItem("productId", JSON.stringify(state.productId));
    localStorage.setItem(
      "deliveryWindow",
      JSON.stringify(state.deliveryWindow)
    );

    localStorage.setItem(
      "deliveryPeriodId",
      JSON.stringify(state.deliveryPeriodId)
    );
  }, [state]);
  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};

// OLD VERSION

// "use client";

// import { useEffect } from "react";

// import { AddOn } from "@/lib/addons";
// import { Product } from "@/lib/mealkits";
// import React, { createContext, useReducer } from "react";

// interface Type {
//   odd: boolean;
//   even: boolean;
// }

// interface DeliveryDay {
//   id: string;
//   start: number;
//   label: string;
//   end: number;
// }

// // Define the state
// interface State {
//   product: Product | null;
//   addOns: AddOn[];
//   shippingCost: number;
//   productType: Type;
//   deliveryDay: DeliveryDay | null;
//   zipCode: string | null;
//   deliveryDays: DeliveryDay[];
//   deliveryDaysError: string | null;
//   preferredWeekDay: number | null;
// }

// // Define the action
// interface Action {
//   type: string;
//   payload: Product | AddOn | Type | number | any;
// }

// // Define the context
// interface CheckoutContextProps {
//   state: State;
//   dispatch: React.Dispatch<Action>;
// }

// interface CheckoutProviderProps {
//   children: React.ReactNode;
// }

// // Before the creation of the CheckoutContext
// const initialState: State =
//   typeof window !== "undefined"
//     ? {
//         product: JSON.parse(localStorage.getItem("product") || "null"),
//         addOns: JSON.parse(localStorage.getItem("addOns") || "[]"),
//         shippingCost: JSON.parse(localStorage.getItem("shippingCost") || "0"),
//         productType: JSON.parse(
//           localStorage.getItem("productType") || '{"odd": false, "even": false}'
//         ),
//         deliveryDay: JSON.parse(
//           localStorage.getItem("deliveryDay") ||
//             '{"label": null, "start": null}'
//         ),
//         zipCode: JSON.parse(localStorage.getItem("zipCode") || "null"),
//         deliveryDays: JSON.parse(localStorage.getItem("deliveryDays") || "[]"),
//         deliveryDaysError: JSON.parse(
//           localStorage.getItem("deliveryDaysError") || "null"
//         ),
//         preferredWeekDay: JSON.parse(
//           localStorage.getItem("preferredWeekDay") || "null"
//         ),
//       }
//     : {
//         product: null,
//         addOns: [],
//         shippingCost: 0,
//         productType: {
//           odd: false,
//           even: false,
//         },
//         deliveryDay: null,
//         zipCode: null,
//         deliveryDays: [],
//         deliveryDaysError: null,
//         preferredWeekDay: null,
//       };

// // Actions
// export const actionTypes = {
//   ADD_MEALKIT: "ADD_MEALKIT",
//   ADD_ADDON: "ADD_ADDON",
//   REMOVE_MEALKIT: "REMOVE_MEALKIT",
//   REMOVE_ADDON: "REMOVE_ADDON",
//   UPDATE_SHIPPING_COST: "UPDATE_SHIPPING_COST",
//   SET_PRODUCT_TYPE: "SET_PRODUCT_TYPE",
//   SET_DELIVERY_DAY: "SET_DELIVERY_DAY",
//   SET_ZIP_CODE: "SET_ZIP_CODE",
//   SET_DELIVERY_DAYS: "SET_DELIVERY_DAYS",
//   SET_DELIERY_DAYS_ERROR: "SET_DELIERY_DAYS_ERROR",
//   SET_PREFERRED_WEEK_DAY: "SET_PREFERRED_WEEK_DAY",

// };

// // Reducer
// const reducer = (state: State, action: Action) => {
//   switch (action.type) {
//     case actionTypes.ADD_MEALKIT:
//       return { ...state, product: action.payload as Product };
//     case actionTypes.ADD_ADDON:
//       const existingAddOnIndex = state.addOns.findIndex(
//         (addOn) => addOn.id === (action.payload as AddOn).id
//       );
//       if (existingAddOnIndex > -1) {
//         const updatedAddOns = [...state.addOns];
//         updatedAddOns[existingAddOnIndex].quantity! += 1;
//         return { ...state, addOns: updatedAddOns };
//       } else {
//         return {
//           ...state,
//           addOns: [
//             ...state.addOns,
//             { ...(action.payload as AddOn), quantity: 1 },
//           ],
//         };
//       }
//     case actionTypes.REMOVE_MEALKIT:
//       return { ...state, product: null, addOns: [] }; // When product is removed, clear the addOns too
//     case actionTypes.REMOVE_ADDON:
//       const existingAddOnIndexRemove = state.addOns.findIndex(
//         (addOn) => addOn.id === (action.payload as AddOn).id
//       );
//       if (
//         existingAddOnIndexRemove > -1 &&
//         state.addOns[existingAddOnIndexRemove].quantity! > 1
//       ) {
//         // Decrease the quantity of the existing add-on
//         const updatedAddOns = [...state.addOns];
//         updatedAddOns[existingAddOnIndexRemove].quantity! -= 1;
//         return { ...state, addOns: updatedAddOns };
//       } else {
//         // Remove the add-on entirely if the quantity is 1 or less
//         return {
//           ...state,
//           addOns: state.addOns.filter(
//             (item) => item.id !== (action.payload as AddOn).id
//           ),
//         };
//       }

//     case actionTypes.UPDATE_SHIPPING_COST:
//       return { ...state, shippingCost: action.payload as number };

//     case actionTypes.SET_PRODUCT_TYPE:
//       return { ...state, productType: action.payload as Type };

//     case actionTypes.SET_DELIVERY_DAY:
//       return { ...state, deliveryDay: action.payload as DeliveryDay };

//     case actionTypes.SET_ZIP_CODE:
//       return { ...state, zipCode: action.payload as string };

//     case actionTypes.SET_DELIVERY_DAYS:
//       return { ...state, deliveryDays: action.payload as DeliveryDay[] };

//     case actionTypes.SET_DELIERY_DAYS_ERROR:
//       return { ...state, deliveryDaysError: action.payload as string };

//     case actionTypes.SET_PREFERRED_WEEK_DAY:
//       return { ...state, preferredWeekDay: action.payload as number | null };

//     default:
//       return state;
//   }
// };

// export const CheckoutContext = createContext<CheckoutContextProps>({
//   state: initialState,
//   dispatch: () => null,
// });

// export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
//   children,
// }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   // This useEffect will run every time the state changes
//   useEffect(() => {
//     localStorage.setItem("product", JSON.stringify(state.product));
//     localStorage.setItem("addOns", JSON.stringify(state.addOns));
//     localStorage.setItem("shippingCost", JSON.stringify(state.shippingCost));
//     localStorage.setItem("productType", JSON.stringify(state.productType));
//     localStorage.setItem("deliveryDay", JSON.stringify(state.deliveryDay));
//     localStorage.setItem("zipCode", JSON.stringify(state.zipCode));
//     localStorage.setItem("deliveryDays", JSON.stringify(state.deliveryDays));
//     localStorage.setItem("deliveryDaysError", JSON.stringify(state.deliveryDaysError));
//     localStorage.setItem("preferredWeekDay", JSON.stringify(state.preferredWeekDay));

//   }, [state]); // Dependency array with state. If state changes, useEffect will run again.

//   return (
//     <CheckoutContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CheckoutContext.Provider>
//   );
// };
