"use client";

import { DATE_FORMAT } from "@/constants/date";
import { formatCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type DashboardFoodsColumn = {
  date: Date;
  price: number;
  title: string;
  total: number;
  totalAdult: number;
  totalBaby: number;
  totalChild: number;
  totalChildHalfPortion: number;
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
    accessorKey: "totalChildHalfPortion",
    header: "Niños con cuota 50% Ración",
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
