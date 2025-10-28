import { create } from "zustand";

interface ChangeMealboxModalStore {
  isOpen: boolean;
  customerEmail?: string;
  customerId?: string;
  isPaused?: boolean;
  onOpen: () => void;
  onClose: () => void;
  forCustomer: (customerId: string, email: string, isPaused?: boolean) => void;
}

const useChangeMealboxModal = create<ChangeMealboxModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  forCustomer: (customerId, email, isPaused) =>
    set({ customerId, customerEmail: email, isPaused, isOpen: true }),
}));

export default useChangeMealboxModal;
