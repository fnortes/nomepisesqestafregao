"use client";

import { Client } from "@prisma/client";
import CellAction from "./cell-action";

import type { ColumnDef } from "@tanstack/react-table";

export type BarGroupColumn = {
  clients: { client: Client }[];
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

export const columns: ColumnDef<BarGroupColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      return `(${row.original.clients.length}) - ${row.original.name}`;
    },
  },
  {
    accessorKey: "clients",
    header: "Comparsistas",
    cell: ({ row }) => {
      return row.original.clients
        .map(
          ({ client }) =>
            `${client.firstName}${client.lastName ? ` ${client.lastName}` : ""}`
        )
        .join(", ");
    },
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
