import { create } from "zustand";

interface ManageAddressModalStore {
  isOpen: boolean;
  customerId?: string;
  customerEmail?: string;
  phone?: string;
  address?: string;
  onOpen: () => void;
  onClose: () => void;
  forCustomer: (
    customerId: string,
    customerEmail: string,
    phone: string,
    address: string
  ) => void;
}

const useManageAddressModal = create<ManageAddressModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  forCustomer: (customerId: string, customerEmail: string, phone: string, address: string) => {
    set({
      customerId,
      customerEmail,
      phone,
      address,
      isOpen: true,
    });
  },
}));

export default useManageAddressModal;
