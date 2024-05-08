"use client";

import CellAction from "./cell-action";

import type { ExpenseCategory, ExpenseFamily } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { EXPENSE_FAMILY_LITERALS } from "./expenseCategories.constants";

export type ExpenseCategoryColumn = {
  comments: string | null;
  createdAt: string;
  family: ExpenseFamily;
  id: string;
  name: string;
  previousYearWorkUnitsConsumed: number;
  updatedAt: string;
};

export const columns: ColumnDef<ExpenseCategoryColumn>[] = [
  {
    accessorKey: "family",
    header: "Familia",
    cell: ({ row }) => EXPENSE_FAMILY_LITERALS[row.original.family],
    filterFn: (params, columnId, currentFilter) => {
      const value = params.getValue(columnId) as ExpenseCategory["family"];
      const formattedValue = EXPENSE_FAMILY_LITERALS[value];
      return (
        formattedValue.toLowerCase().indexOf(currentFilter.toLowerCase()) !== -1
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "previousYearWorkUnitsConsumed",
    header: "Consumo año anterior",
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
