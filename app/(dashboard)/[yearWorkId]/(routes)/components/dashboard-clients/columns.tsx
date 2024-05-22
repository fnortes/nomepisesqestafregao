"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type DashboardColumn = {
  resume: number;
  type: string;
  withBar: number;
  withDinners: number;
  withLaunches: number;
  withSuits: number;
  withWater: number;
};

export const columns: ColumnDef<DashboardColumn>[] = [
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "withLaunches",
    header: "Comidas",
  },
  {
    accessorKey: "withDinners",
    header: "Cenas",
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
