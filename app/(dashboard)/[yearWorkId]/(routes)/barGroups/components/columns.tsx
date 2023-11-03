"use client";

import CellAction from "./cell-action";

import type { ColumnDef } from "@tanstack/react-table";

export type BarGroupColumn = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<BarGroupColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "createdAt",
    header: "Creado",
  },
  {
    accessorKey: "updatedAt",
    header: "Actualizado",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
