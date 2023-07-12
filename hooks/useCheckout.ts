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
import { getWeekNumber } from "@/helpers/format";

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
      shippingCost = 69; // Replace with your actual shipping cost for stage 2
    } else if (shippingCostStage3.includes(zipCode)) {
      shippingCost = 89; // Replace with your actual shipping cost for stage 3
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

  return {
    product: state.product,
    addOns: state.addOns,
    shippingCost: state.shippingCost,
    productType: state.productType,
    setProductType,
    addMealKit,
    removeMealKit,
    addAddOn,
    removeAddOn,
    updateShippingCost,
    getTotalPrice,
    selectNextSubscription,
    selectNextOneTimePurchase,
  };
};

export default useCheckout;
