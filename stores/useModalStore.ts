import React, { ReactNode } from "react";
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  children: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  children: null,
  openModal: (content) => set({ isOpen: true, children: content }),
  closeModal: () => set({ isOpen: false, children: null }),
}));
