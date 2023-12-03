import { create } from "zustand";

interface ChangeDeliveryDayModalStore {
  isOpen: boolean;
  customerId?: string;
  postalCode?: string;
  customerEmail?: string;
  isPaused?: boolean;
  onOpen: () => void;
  onClose: () => void;
  forCustomer: (
    customerId: string,
    postalCode: string,
    customerEmail: string,
    isPaused: boolean
  ) => void;
}

const useChangeDeliveryDayModal = create<ChangeDeliveryDayModalStore>(
  (set) => ({
    isOpen: false,
    isPaused: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    forCustomer: (
      customerId: string,
      postalCode: string,
      customerEmail: string,
      isPaused: boolean
    ) => {
      set({
        customerId,
        postalCode,
        customerEmail,
        isPaused,
      });
    },
  })
);

export default useChangeDeliveryDayModal;
