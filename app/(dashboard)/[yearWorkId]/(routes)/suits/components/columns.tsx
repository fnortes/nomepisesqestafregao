"use client";

import { formatCurrency } from "@/lib/utils";
import CellAction from "./cell-action";

import type { ColumnDef } from "@tanstack/react-table";
import { AgeGroup, Gender, SuitGroup } from "@prisma/client";
import {
  AGE_GROUPS_LITERALS,
  GENDER_LITERALS,
  SUIT_GROUPS_LITERALS,
} from "../../clients/clients.constants";

export type SuitColumn = {
  ageGroup: AgeGroup;
  comments: string;
  gender: Gender;
  id: string;
  paid: number;
  suitGroup: SuitGroup;
  total: number;
  unitPrice: number;
  units: number;
};

export const columns: ColumnDef<SuitColumn>[] = [
  {
    accessorKey: "gender",
    header: "Sexo",
    cell: ({ row }) => GENDER_LITERALS[row.original.gender],
  },
  {
    accessorKey: "ageGroup",
    header: "Grupo de edad",
    cell: ({ row }) => AGE_GROUPS_LITERALS[row.original.ageGroup],
  },
  {
    accessorKey: "suitGroup",
    header: "Grupo de precio",
    cell: ({ row }) => SUIT_GROUPS_LITERALS[row.original.suitGroup],
  },
  {
    accessorKey: "units",
    header: "Unidades",
  },
  {
    accessorKey: "price",
    header: "Precio por persona",
    cell: ({ row }) => formatCurrency(row.original.unitPrice),
  },
  {
    accessorKey: "total",
    header: "Total coste",
    cell: ({ row }) => formatCurrency(row.original.total),
  },
  {
    accessorKey: "paid",
    header: "Total Pagado",
    cell: ({ row }) => formatCurrency(row.original.paid),
  },
  {
    accessorKey: "comments",
    header: "Comentarios",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
