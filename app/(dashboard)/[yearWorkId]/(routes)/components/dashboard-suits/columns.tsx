"use client";

import { formatCurrency } from "@/lib/utils";
import { AgeGroup, Gender } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import {
  AGE_GROUPS_LITERALS,
  GENDER_LITERALS,
} from "../../clients/clients.constants";

export type DashboardSuitsColumn = {
  ageGroup: AgeGroup;
  gender: Gender;
  price: number;
  clients: string[];
  totalPrice: number;
};

export const columns: ColumnDef<DashboardSuitsColumn>[] = [
  {
    accessorKey: "gender",
    header: "Sexo",
    cell: ({ row }) => GENDER_LITERALS[row.original.gender],
  },
  {
    accessorKey: "ageGroup",
    header: "Grupo de edad",
    cell: ({ row }) => AGE_GROUPS_LITERALS[row.original.ageGroup],
  },
  {
    accessorKey: "price",
    header: "Precio por persona",
    cell: ({ row }) => formatCurrency(row.original.price),
  },
  {
    accessorKey: "clients",
    header: "Comparsistas",
    cell: ({ row }) =>
      row.original.clients.length > 0 ? (
        <div>
          <strong>({row.original.clients.length})</strong>
          <br />
          {row.original.clients.toSorted().map((c) => (
            <span key={c}>
              {c}
              <br />
            </span>
          ))}
        </div>
      ) : (
        0
      ),
  },
  {
    accessorKey: "totalPrice",
    header: "Precio Total",
    cell: ({ row }) => formatCurrency(row.original.totalPrice),
  },
];
