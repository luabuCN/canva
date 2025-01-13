import { create } from "zustand";

type SubscriptModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSubscriptModal = create<SubscriptModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
