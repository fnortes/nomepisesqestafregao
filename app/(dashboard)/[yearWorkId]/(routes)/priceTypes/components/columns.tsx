"use client";

import { BadgeX, Check } from "lucide-react";

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
    cell: ({ row }) =>
      row.original.meals ? (
        <Check className="w-4 h-4 text-green-700" />
      ) : (
        <BadgeX className="w-4 h-4 text-red-700" />
      ),
  },
  {
    accessorKey: "dinners",
    header: "Cenas",
    cell: ({ row }) =>
      row.original.dinners ? (
        <Check className="w-4 h-4 text-green-700" />
      ) : (
        <BadgeX className="w-4 h-4 text-red-700" />
      ),
  },
  {
    accessorKey: "paradeSuit",
    header: "Desfile Traje",
    cell: ({ row }) =>
      row.original.paradeSuit ? (
        <Check className="w-4 h-4 text-green-700" />
      ) : (
        <BadgeX className="w-4 h-4 text-red-700" />
      ),
  },
  {
    accessorKey: "paradeWater",
    header: "Desfile Agua",
    cell: ({ row }) =>
      row.original.paradeWater ? (
        <Check className="w-4 h-4 text-green-700" />
      ) : (
        <BadgeX className="w-4 h-4 text-red-700" />
      ),
  },
  {
    accessorKey: "drinkTickets",
    header: "Tickets Bebida",
    cell: ({ row }) =>
      row.original.drinkTickets ? (
        <Check className="w-4 h-4 text-green-700" />
      ) : (
        <BadgeX className="w-4 h-4 text-red-700" />
      ),
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
