"use client";

import { useEffect } from "react";

import { useWorkYearModal } from "@/hooks/use-work-year-modal";

export default function SetupPage() {
  const { isOpen, onOpen } = useWorkYearModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
