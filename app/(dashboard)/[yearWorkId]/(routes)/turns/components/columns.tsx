"use client";

import CellAction from "./cell-action";

import type { BarGroup, Client, Turn } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export type TurnColumn = {
  id: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  barGroup: BarGroup & { clients: { client: Client }[]; turns: Turn[] };
};

export const columns: ColumnDef<TurnColumn>[] = [
  {
    accessorKey: "startDate",
    header: "Comienzo",
  },
  {
    accessorKey: "endDate",
    header: "Fin",
  },
  {
    accessorKey: "barGroup",
    header: "Grupo",
    cell: ({ row }) =>
      `(${row.original.barGroup.turns.length}) - ${
        row.original.barGroup.name
      } - [${row.original.barGroup.clients
        .map((client) => client.client.firstName)
        .join(", ")}]`,
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
