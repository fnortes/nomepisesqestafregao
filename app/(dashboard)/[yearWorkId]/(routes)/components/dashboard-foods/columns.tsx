"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATE_FORMAT } from "@/constants/date";
import { formatCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Info } from "lucide-react";

export type DashboardFoodsColumn = {
  date: Date;
  price: number;
  title: string;
  total: number;
  totalAdult: number;
  totalAdultList: string[];
  totalBaby: number;
  totalBabyList: string[];
  totalChild: number;
  totalChildHalfPortion: number;
  totalChildHalfPortionList: string[];
  totalChildList: string[];
  totalPrice: number;
};

export const columns: ColumnDef<DashboardFoodsColumn>[] = [
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ row }) => format(row.original.date, DATE_FORMAT),
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "price",
    header: "Precio persona",
    cell: ({ row }) => formatCurrency(row.original.price),
  },
  {
    accessorKey: "totalAdult",
    header: "Adultos",
    cell: ({ row }) => (
      <>
        <span>{row.original.totalAdult}</span>&nbsp;
        {row.original.totalAdultList.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.totalAdultList.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "totalChild",
    header: "Niños con cuota",
    cell: ({ row }) => (
      <>
        <span>{row.original.totalChild}</span>&nbsp;
        {row.original.totalChildList.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.totalChildList.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "totalChildHalfPortion",
    header: "Niños con cuota 50% Ración",
    cell: ({ row }) => (
      <>
        <span>{row.original.totalChildHalfPortion}</span>&nbsp;
        {row.original.totalChildHalfPortionList.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.totalChildHalfPortionList.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "totalBaby",
    header: "Bebés",
    cell: ({ row }) => (
      <>
        <span>{row.original.totalBaby}</span>&nbsp;
        {row.original.totalBabyList.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.totalBabyList.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "total",
    header: "Total comensales",
  },
  {
    accessorKey: "totalPrice",
    header: "Precio Total",
    cell: ({ row }) => formatCurrency(row.original.totalPrice),
  },
];
