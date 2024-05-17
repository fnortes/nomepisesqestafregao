"use client";

import { formatCurrency } from "@/lib/utils";
import CellAction from "./cell-action";

import type { ColumnDef } from "@tanstack/react-table";

export type FoodColumn = {
  comments: string;
  date: string;
  description: string;
  id: string;
  paid: number;
  price: number;
  title: string;
};

export const columns: ColumnDef<FoodColumn>[] = [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "price",
    header: "Precio por persona",
    cell: ({ row }) => formatCurrency(row.original.price),
  },
  {
    accessorKey: "paid",
    header: "Total Pagado",
    cell: ({ row }) => formatCurrency(row.original.paid),
  },
  {
    accessorKey: "description",
    header: "Descripción",
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
