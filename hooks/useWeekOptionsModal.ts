import { Mealkit } from "@/types";
import { create } from "zustand";

interface WeekOptionsModalStore {
  isOpen: boolean;
  mealkit: Mealkit;
  productOptions: any;
  setProductOptions: (productOptions: any) => void;
  setMealkit: (mealkit: Mealkit) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useWeekOptionsModal = create<WeekOptionsModalStore>((set) => ({
  isOpen: false,
  mealkit: {
    id: "",
    price_id: "",
    product_id: "",
    cut_off_time: 0,
    week_number: 0,
    delivery_range: {
      start: 0,
      end: 0,
    },
    quantity: 0,
    active: false,
    name: "",
    description: "",
    image: "",
  },
  productOptions: [],
  setProductOptions: (productOptions) => set({ productOptions }),
  setMealkit: (mealkit) => set({ mealkit }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useWeekOptionsModal;
