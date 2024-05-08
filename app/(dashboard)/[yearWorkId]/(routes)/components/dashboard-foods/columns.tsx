"use client";

import { DATE_FORMAT } from "@/constants/date";
import { formatCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type DashboardFoodsColumn = {
  title: string;
  date: Date;
  price: number;
  totalAdult: number;
  totalChild: number;
  totalBaby: number;
  total: number;
  totalPrice: number;
};

export const columns: ColumnDef<DashboardFoodsColumn>[] = [
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ row }) => format(row.original.date, DATE_FORMAT),
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "price",
    header: "Precio persona",
    cell: ({ row }) => formatCurrency(row.original.price),
  },
  {
    accessorKey: "totalAdult",
    header: "Adultos",
  },
  {
    accessorKey: "totalChild",
    header: "Niños con cuota",
  },
  {
    accessorKey: "totalBaby",
    header: "Niños sin cuota",
  },
  {
    accessorKey: "total",
    header: "Total comensales",
  },
  {
    accessorKey: "totalPrice",
    header: "Precio Total",
    cell: ({ row }) => formatCurrency(row.original.totalPrice),
  },
];
