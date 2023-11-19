import { create } from "zustand";

interface ManageSubscriptionModalStore {
  isOpen: boolean;
  customerId?: string;
  customerEmail?: string;
  onOpen: () => void;
  onClose: () => void;
  forCustomer: (customerId: string, customerEmail: string) => void;
}

const useManageSubscriptionModal = create<ManageSubscriptionModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    forCustomer: (customerId: string, customerEmail: string) => {
      set({
        customerId,
        customerEmail,
      });
    },
  })
);

export default useManageSubscriptionModal;
