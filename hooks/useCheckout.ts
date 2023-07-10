import { useContext } from 'react';
import { CheckoutContext, actionTypes, Product, AddOn } from '../providers/CheckoutProvider';
import { free, shippingCostStage1, shippingCostStage2, shippingCostStage3 } from '@/lib/zipCodes';

const useCheckout = () => {
  const { state, dispatch } = useContext(CheckoutContext);

  const addMealKit = (mealKit: Product) => {
    dispatch({ type: actionTypes.ADD_MEALKIT, payload: mealKit });
  };

  const removeMealKit = () => {
    dispatch({ type: actionTypes.REMOVE_MEALKIT, payload: {} });
  };

  const addAddOn = (addOn: Omit<AddOn, 'quantity'>) => {
    if (state.product) {
      dispatch({ type: actionTypes.ADD_ADDON, payload: addOn });
    } else {
      console.log('Add a meal kit before adding this add-on.');
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
      shippingCost = 39;  // Replace with your actual shipping cost for stage 1
    } else if (shippingCostStage2.includes(zipCode)) {
      shippingCost = 69;  // Replace with your actual shipping cost for stage 2
    } else if (shippingCostStage3.includes(zipCode)) {
      shippingCost = 89;  // Replace with your actual shipping cost for stage 3
    } else {
      shippingCost = 0;  // Default shipping cost if zipcode is not in any list
    }
  
    dispatch({ type: actionTypes.UPDATE_SHIPPING_COST, payload: shippingCost });
  };

  const getTotalPrice = () => {
    const productPrice = state.product ? state.product.price : 0;
    const addOnsPrice = state.addOns.reduce((total, addOn) => total + addOn.price * (addOn.quantity || 0), 0);
    const totalPrice = productPrice + addOnsPrice + state.shippingCost;
    return totalPrice;
  };

  return {
    product: state.product,
    addOns: state.addOns,
    shippingCost: state.shippingCost,
    addMealKit,
    removeMealKit,
    addAddOn,
    removeAddOn,
    updateShippingCost,
    getTotalPrice,
  };
};

export default useCheckout;
