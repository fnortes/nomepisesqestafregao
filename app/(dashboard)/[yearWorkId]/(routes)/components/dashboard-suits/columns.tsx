"use client";

import { formatCurrency } from "@/lib/utils";
import { AgeGroup, Gender } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import {
  AGE_GROUPS_LITERALS,
  GENDER_LITERALS,
} from "../../clients/clients.constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

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
    cell: ({ row }) => (
      <>
        <span>{row.original.clients.length}</span>&nbsp;
        {row.original.clients.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.clients.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Precio Total",
    cell: ({ row }) => formatCurrency(row.original.totalPrice),
  },
];
