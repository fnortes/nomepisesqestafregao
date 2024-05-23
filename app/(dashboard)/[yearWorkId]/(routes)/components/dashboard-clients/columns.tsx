"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";

export type DashboardColumn = {
  resume: number;
  type: string;
  withBarList: string[];
  withDinnersList: string[];
  withLaunchesList: string[];
  withSuitsList: string[];
  withWaterList: string[];
};

export const columns: ColumnDef<DashboardColumn>[] = [
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "withLaunchesList",
    header: "Comidas",
    cell: ({ row }) => (
      <>
        <span>{row.original.withLaunchesList.length}</span>&nbsp;
        {row.original.withLaunchesList.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.withLaunchesList.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "withDinnersList",
    header: "Cenas",
    cell: ({ row }) => (
      <>
        <span>{row.original.withDinnersList.length}</span>&nbsp;
        {row.original.withDinnersList.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.withDinnersList.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "withSuitsList",
    header: "Trajes",
    cell: ({ row }) => (
      <>
        <span>{row.original.withSuitsList.length}</span>&nbsp;
        {row.original.withSuitsList.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.withSuitsList.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "withWaterList",
    header: "Desfile Agua",
    cell: ({ row }) => (
      <>
        <span>{row.original.withWaterList.length}</span>&nbsp;
        {row.original.withWaterList.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.withWaterList.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "withBarList",
    header: "Barra",
    cell: ({ row }) => (
      <>
        <span>{row.original.withBarList.length}</span>&nbsp;
        {row.original.withBarList.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.withBarList.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "resume",
    header: "Total",
  },
];
