"use client";

import { formatCurrency } from "@/lib/utils";
import { ExpenseCategory } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { EXPENSE_FAMILY_LITERALS } from "../../expenseCategories/components/expenseCategories.constants";

export type DashboardPlasticColumn = {
  category: ExpenseCategory;
  comments: string | null;
  description: string | null;
  paid: number;
  previousYearWorkUnits: number;
  title: string;
  total: number;
  unitPrice: number;
  estimatedUnits: number;
  units: number;
};

export const columns: ColumnDef<DashboardPlasticColumn>[] = [
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) =>
      `[${EXPENSE_FAMILY_LITERALS[row.original.category.family]}] - ${
        row.original.category.name
      }`,
    filterFn: (params, columnId, currentFilter) => {
      const value = params.getValue(columnId) as ExpenseCategory;
      const formattedValue = `[${EXPENSE_FAMILY_LITERALS[value.family]}] - ${
        value.name
      }`;
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
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "comments",
    header: "Comentarios",
  },
  {
    accessorKey: "previousYearWorkUnits",
    header: "Consumido año anterior",
  },
  {
    accessorKey: "estimatedUnits",
    header: "Estimado año actual",
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
