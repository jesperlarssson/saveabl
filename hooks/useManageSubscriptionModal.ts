import { create } from "zustand";

interface ManageSubscriptionModalStore {
  isOpen: boolean;
  customerId?: string;
  customerEmail?: string;
  isPaused?: boolean;
  onOpen: () => void;
  onClose: () => void;
  forCustomer: (
    customerId: string,
    customerEmail: string,
    isPaused: boolean
  ) => void;
}

const useManageSubscriptionModal = create<ManageSubscriptionModalStore>(
  (set) => ({
    isOpen: false,
    isPaused: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    forCustomer: (
      customerId: string,
      customerEmail: string,
      isPaused: boolean
    ) => {
      set({
        customerId,
        customerEmail,
        isPaused,
      });
    },
  })
);

export default useManageSubscriptionModal;
