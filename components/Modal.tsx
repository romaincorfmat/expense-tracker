"use client";
import { useModalStore } from "@/stores/useModalStore";
import React from "react";

const Modal = () => {
  const { isOpen, children, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-lg shadow-lg p-4 w-full max-w-md"
      >
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
