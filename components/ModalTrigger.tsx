"use client";
import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { useModalStore } from "@/stores/useModalStore";

const ModalTrigger = ({
  title,
  modalContent,
}: {
  title: string;
  modalContent: ReactNode;
}) => {
  const { openModal } = useModalStore();
  return <Button onClick={() => openModal(modalContent)}>{title}</Button>;
};

export default ModalTrigger;
