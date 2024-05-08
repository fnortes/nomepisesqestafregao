"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { SHIRT_SIZE_LITERALS } from "../../clients/clients.constants";
import { ShirtSize } from "@prisma/client";

export type DashboardShirtsColumn = {
  type: string;
  M_6: number;
  A_2: number;
  A_3_4: number;
  A_6: number;
  A_8: number;
  A_12: number;
  A_16: number;
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
  XXXL: number;
  resume: number;
};

export const columns: ColumnDef<DashboardShirtsColumn>[] = [
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "M_6",
    header: SHIRT_SIZE_LITERALS[ShirtSize.M_6],
  },
  {
    accessorKey: "A_2",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_2],
  },
  {
    accessorKey: "A_3_4",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_3_4],
  },
  {
    accessorKey: "A_6",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_6],
  },
  {
    accessorKey: "A_8",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_8],
  },
  {
    accessorKey: "A_12",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_12],
  },
  {
    accessorKey: "A_16",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_16],
  },
  {
    accessorKey: "S",
    header: SHIRT_SIZE_LITERALS[ShirtSize.S],
  },
  {
    accessorKey: "M",
    header: SHIRT_SIZE_LITERALS[ShirtSize.M],
  },
  {
    accessorKey: "L",
    header: SHIRT_SIZE_LITERALS[ShirtSize.L],
  },
  {
    accessorKey: "XL",
    header: SHIRT_SIZE_LITERALS[ShirtSize.XL],
  },
  {
    accessorKey: "XXL",
    header: SHIRT_SIZE_LITERALS[ShirtSize.XXL],
  },
  {
    accessorKey: "XXXL",
    header: SHIRT_SIZE_LITERALS[ShirtSize.XXXL],
  },
  {
    accessorKey: "resume",
    header: "Total",
  },
];
