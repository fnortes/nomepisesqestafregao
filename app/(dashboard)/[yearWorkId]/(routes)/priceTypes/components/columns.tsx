"use client";

import CellAction from "./cell-action";

import type { ColumnDef } from "@tanstack/react-table";

export type PriceTypeColumn = {
  adultPrice: number;
  babyPrice: number;
  childPrice: number;
  createdAt: string;
  dinners: boolean;
  drinkTickets: boolean;
  id: string;
  meals: boolean;
  name: string;
  paradeSuit: boolean;
  paradeWater: boolean;
  updatedAt: string;
};

export const columns: ColumnDef<PriceTypeColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "adultPrice",
    header: "Adulto",
  },
  {
    accessorKey: "childPrice",
    header: "Niño",
  },
  {
    accessorKey: "babyPrice",
    header: "Bebé",
  },
  {
    accessorKey: "meals",
    header: "Comidas",
  },
  {
    accessorKey: "dinners",
    header: "Cenas",
  },
  {
    accessorKey: "paradeSuit",
    header: "Desfile Traje",
  },
  {
    accessorKey: "paradeWater",
    header: "Desfile Agua",
  },
  {
    accessorKey: "drinkTickets",
    header: "Tickets Bebida",
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
