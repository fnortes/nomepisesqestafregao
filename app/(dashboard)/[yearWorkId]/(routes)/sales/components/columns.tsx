"use client";

import { formatCurrency } from "@/lib/utils";
import CellAction from "./cell-action";

import type { SaleCategory, YearWork } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export type SaleColumn = {
  benefitAmount: number;
  category: SaleCategory;
  comments: string | null;
  date: string;
  finallyAmount: number;
  id: string;
  initialAmount: number;
  title: string;
  yearWork: YearWork;
};

export const columns: ColumnDef<SaleColumn>[] = [
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => row.original.category.name,
    filterFn: (params, columnId, currentFilter) => {
      const value = params.getValue(columnId) as SaleCategory;
      const formattedValue = value.name;
      return (
        formattedValue.toLowerCase().indexOf(currentFilter.toLowerCase()) !== -1
      );
    },
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "comments",
    header: "Comentarios",
  },
  {
    accessorKey: "initialAmount",
    header: "Cantidad inicial",
    cell: ({ row }) => formatCurrency(row.original.initialAmount),
  },
  {
    accessorKey: "finallyAmount",
    header: "Cantidad final",
    cell: ({ row }) => formatCurrency(row.original.finallyAmount),
  },
  {
    accessorKey: "benefitAmount",
    header: "Beneficios",
    cell: ({ row }) => formatCurrency(row.original.benefitAmount),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
