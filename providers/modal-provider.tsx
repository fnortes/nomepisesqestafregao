"use client";

import { YearWork } from "@prisma/client";
import { useEffect, useState } from "react";

import WorkYearModal from "@/components/modals/work-year-modal";

interface Props {
  workYears: YearWork[];
}

export const ModalProvider = ({ workYears }: Props) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <WorkYearModal workYears={workYears} />
    </>
  );
};
