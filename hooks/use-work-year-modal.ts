import { create } from "zustand";

interface UseWorkYearModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useWorkYearModal = create<UseWorkYearModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
