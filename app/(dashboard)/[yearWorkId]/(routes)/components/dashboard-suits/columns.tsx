"use client";

import { formatCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

export type DashboardSuitsColumn = {
  comments: string | null;
  description: string | null;
  paid: number;
  title: string;
  total: number;
  unitPrice: number;
  units: number;
};

export const columns: ColumnDef<DashboardSuitsColumn>[] = [
  {
    accessorKey: "title",
    header: "Título",
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
    accessorKey: "units",
    header: "Consumido/Pedido año actual",
  },
  {
    accessorKey: "unitPrice",
    header: "Precio unitario",
    cell: ({ row }) => formatCurrency(row.original.unitPrice),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => formatCurrency(row.original.total),
  },
  {
    accessorKey: "paid",
    header: "Pagado",
    cell: ({ row }) => formatCurrency(row.original.paid),
  },
];
