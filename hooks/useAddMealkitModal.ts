import { create } from "zustand";

interface LocationModalStore {
  isOpen: boolean;
  week: number;
  postalCode: string;
  subscriptionId: string;
  setSubscriptionId: (subscriptionId: string) => void;
  onOpen: () => void;
  onClose: () => void;
  setWeek: (week: number) => void;
  setPostalCode: (postalCode: string) => void;
}

const useLocationModal = create<LocationModalStore>((set) => ({
  isOpen: false,
  week: 0,
  postalCode: "",
  subscriptionId: "",
  setSubscriptionId: (subscriptionId: string) => set({ subscriptionId }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setWeek: (week: number) => set({ week }),
  setPostalCode: (postalCode: string) => set({ postalCode }),
}));

export default useLocationModal;
