import { useContext } from "react";
import { CheckoutContext, actionTypes } from "../providers/CheckoutProvider";
import {
  free,
  shippingCostStage1,
  shippingCostStage2,
  shippingCostStage3,
} from "@/lib/zipCodes";
import { Product, productInfo } from "@/lib/mealkits";
import { AddOn } from "@/lib/addons";
import { toast } from "react-hot-toast";
import { deliveryDayParser, getWeekNumber } from "@/helpers/format";

interface Type {
  odd: boolean;
  even: boolean;
}

const useCheckout = () => {
  const { state, dispatch } = useContext(CheckoutContext);

  const addMealKit = (mealKit: Product) => {
    dispatch({ type: actionTypes.ADD_MEALKIT, payload: mealKit });
  };

  const removeMealKit = () => {
    dispatch({ type: actionTypes.REMOVE_MEALKIT, payload: {} });
    dispatch({
      type: actionTypes.SET_PRODUCT_TYPE,
      payload: { odd: null, even: null },
    });
    dispatch({ type: actionTypes.SET_DELIVERY_DAY, payload: null });
    dispatch({ type: actionTypes.SET_PREFERRED_WEEK_DAY, payload: null });
  };

  const isWeekEven = (weekNumber: number) => {
    return weekNumber % 2 === 0;
  };

  const selectNextSubscription = (intervalWeekly: boolean) => {
    if (intervalWeekly) {
      setProductType({
        odd: true,
        even: true,
      });
    } else {
      const currentWeekIsEven = isWeekEven(getWeekNumber(new Date()));
      if (currentWeekIsEven) {
        setProductType({
          odd: true,
          even: false,
        });
      } else {
        setProductType({
          odd: false,
          even: true,
        });
      }
    }
  };

  const selectNextOneTimePurchase = () => {
    setProductType({
      odd: false,
      even: false,
    });
  };

  const updateProductType = (newType: Type) => {
    dispatch({ type: actionTypes.SET_PRODUCT_TYPE, payload: newType });
  };

  const setProductType = (newType: Type) => {
    updateProductType(newType);
    if (newType.odd === true && newType.even === false) {
      // Add product varannan vecka udda veckor
      // TODO: Fetch correct product and price_id
      dispatch({ type: actionTypes.ADD_MEALKIT, payload: productInfo[1] });
    } else if (newType.odd === false && newType.even === true) {
      // Add product varannan vecka jämna veckor
      // TODO: Fetch correct product and price_id
      dispatch({ type: actionTypes.ADD_MEALKIT, payload: productInfo[1] });
    } else if (newType.odd === false && newType.even === false) {
      // Add product Engångsköp
      // TODO: Fetch correct product and price_id
      dispatch({ type: actionTypes.ADD_MEALKIT, payload: productInfo[3] });
    } else if (newType.odd === true && newType.even === true) {
      // Add product Prenumeration varje vecka
      // TODO: Fetch correct product and price_id
      dispatch({ type: actionTypes.ADD_MEALKIT, payload: productInfo[0] });
    } else {
      dispatch({ type: actionTypes.ADD_MEALKIT, payload: productInfo[2] });
    }
  };

  const addAddOn = (addOn: Omit<AddOn, "quantity">) => {
    //TODO: If variants !== null and variants.length > 1 open select variant modal. 
    if (state.product) {
      dispatch({ type: actionTypes.ADD_ADDON, payload: addOn });
    } else {
      toast.error("Du måste välja en matkasse först");
    }
  };

  const removeAddOn = (id: string) => {
    dispatch({ type: actionTypes.REMOVE_ADDON, payload: { id } });
  };

  const updateShippingCost = (zipCode: string) => {
    let shippingCost = 0;

    if (free.includes(zipCode)) {
      shippingCost = 0;
    } else if (shippingCostStage1.includes(zipCode)) {
      shippingCost = 39; // Replace with your actual shipping cost for stage 1
    } else if (shippingCostStage2.includes(zipCode)) {
      shippingCost = 59; // Replace with your actual shipping cost for stage 2
    } else if (shippingCostStage3.includes(zipCode)) {
      shippingCost = 59; // Replace with your actual shipping cost for stage 3 Dansk
    } else {
      shippingCost = 0; // Default shipping cost if zipcode is not in any list
    }

    dispatch({ type: actionTypes.UPDATE_SHIPPING_COST, payload: shippingCost });
  };

  const getTotalPrice = () => {
    const productPrice = state.product ? state.product.price : 0;
    const addOnsPrice = state.addOns.reduce(
      (total, addOn) => total + addOn.price * (addOn.quantity || 0),
      0
    );
    const totalPrice = productPrice + addOnsPrice + state.shippingCost;
    return totalPrice;
  };

  const selectDeliveryDate = (date: any) => {
    dispatch({ type: actionTypes.SET_DELIVERY_DAY, payload: date });
  };

  const setZipCode = (zipCode: string) => {
    dispatch({ type: actionTypes.SET_ZIP_CODE, payload: zipCode });
    fetchAvailableDeliveryDaysGordon(zipCode);
  };

  const setPreferredWeekDay = (preferredWeekDay: number | null) => {
    dispatch({
      type: actionTypes.SET_PREFERRED_WEEK_DAY,
      payload: preferredWeekDay,
    });
  };

  const fetchAvailableDeliveryDaysGordon = async (zipCode: string) => {
    const response = await fetch("/api/gordon/get-delivery-dates", {
      method: "POST",
      body: JSON.stringify({
        zipCode: zipCode,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const thisWeek = data.thisWeek;
    const nextWeek = data.nextWeek;

    if (response.status !== 200) {
      dispatch({
        type: actionTypes.SET_DELIERY_DAYS_ERROR,
        payload:
          "Just nu kunde vi inte hämta leveransdagar. Kontrollera angiven postkod.",
      });
      return;
    } else if (thisWeek.length === 0) {
      dispatch({ type: actionTypes.SET_DELIVERY_DAYS, payload: [] });
      dispatch({
        type: actionTypes.SET_DELIERY_DAYS_ERROR,
        payload:
          "Inga möjliga leveransdagar hittade. Kontakta gärna vår support.",
      });
      return;
    } else {
      const deliveryDays = thisWeek
        .map((day: { start: any; end: any; label: any }, index: number) => {
          return {
            id: `this-${index}`,
            label: deliveryDayParser(day),
            start: day.start,
            end: day.end,
          };
        })
        .filter((v: any) => v.label !== undefined);
      const deliveryDaysNextWeek = nextWeek
        .map((day: { start: any; end: any; label: any }, index: number) => {
          return {
            id: `next-${index}`,
            label: deliveryDayParser(day),
            start: day.start,
            end: day.end,
          };
        })
        .filter((v: any) => v.label !== undefined);

      const allDeliveryDays = [...deliveryDays, ...deliveryDaysNextWeek];

      const deduplicatedDeliveryDays = Array.from(
        allDeliveryDays
          .reduce((map, item) => {
            // Convert the timestamp to a date string (YYYY-MM-DD)
            const dateStr = new Date(item.start * 1000)
              .toISOString()
              .split("T")[0];

            // If the date string is not already in the map, or the time span of the new item is larger,
            // add/replace the item in the map
            if (
              !map.has(dateStr) ||
              item.end - item.start >
                map.get(dateStr).end - map.get(dateStr).start
            ) {
              map.set(dateStr, item);
            }

            return map;
          }, new Map())
          .values()
      );

      dispatch({ type: actionTypes.SET_DELIERY_DAYS_ERROR, payload: "" });
      dispatch({
        type: actionTypes.SET_DELIVERY_DAYS,
        payload: [...new Set(deduplicatedDeliveryDays)], //.slice(0, 3),
      });
    }
  };

  return {
    product: state.product,
    addOns: state.addOns,
    shippingCost: state.shippingCost,
    productType: state.productType,
    deliveryDay: state.deliveryDay,
    deliveryDays: state.deliveryDays,
    deliveryDaysError: state.deliveryDaysError,
    preferredWeekDay: state.preferredWeekDay,
    setProductType,
    addMealKit,
    removeMealKit,
    addAddOn,
    removeAddOn,
    updateShippingCost,
    getTotalPrice,
    selectNextSubscription,
    selectNextOneTimePurchase,
    selectDeliveryDate,
    setZipCode,
    setPreferredWeekDay,
  };
};

export default useCheckout;
