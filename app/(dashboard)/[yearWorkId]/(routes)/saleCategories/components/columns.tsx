"use client";

import CellAction from "./cell-action";

import type { ColumnDef } from "@tanstack/react-table";

export type SaleCategoryColumn = {
  comments: string | null;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

export const columns: ColumnDef<SaleCategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "comments",
    header: "Comentarios",
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
