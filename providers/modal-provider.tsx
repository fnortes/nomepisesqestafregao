"use client";

import { useEffect, useState } from "react";

import WorkYearModal from "@/components/modals/work-year-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <WorkYearModal />
    </>
  );
};
