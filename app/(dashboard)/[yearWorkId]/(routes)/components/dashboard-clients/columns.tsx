"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type DashboardColumn = {
  type: string;
  withFoods: number;
  withSuits: number;
  withWater: number;
  withBar: number;
  resume: number;
};

export const columns: ColumnDef<DashboardColumn>[] = [
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "withFoods",
    header: "Comidas",
  },
  {
    accessorKey: "withSuits",
    header: "Trajes",
  },
  {
    accessorKey: "withWater",
    header: "Desfile Agua",
  },
  {
    accessorKey: "withBar",
    header: "Barra",
  },
  {
    accessorKey: "resume",
    header: "Total",
  },
];
