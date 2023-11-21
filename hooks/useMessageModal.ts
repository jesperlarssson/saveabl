import { create } from "zustand";

interface MessageModalStore {
  isOpen: boolean;
  success: boolean;
  message: string;
  onOpen: () => void;
  onClose: () => void;
  forMessage: (success: boolean, message: string) => void;
}

const useMessageModal = create<MessageModalStore>((set) => ({
  isOpen: false,
  success: true,
  message: "",

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  forMessage: (success: boolean, message: string) => {
    set({
      success,
      message,
    });
  },
}));

export default useMessageModal;
