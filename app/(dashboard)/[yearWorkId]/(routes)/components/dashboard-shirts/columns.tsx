"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { SHIRT_SIZE_LITERALS } from "../../clients/clients.constants";
import { ShirtSize } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export type DashboardShirtsColumn = {
  type: string;
  M_6: string[];
  A_2: string[];
  A_3_4: string[];
  A_6: string[];
  A_8: string[];
  A_12: string[];
  A_16: string[];
  S: string[];
  M: string[];
  L: string[];
  XL: string[];
  XXL: string[];
  XXXL: string[];
  resume: number;
};

export const columns: ColumnDef<DashboardShirtsColumn>[] = [
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "M_6",
    header: SHIRT_SIZE_LITERALS[ShirtSize.M_6],
    cell: ({ row }) => (
      <>
        <span>{row.original.M_6.length}</span>&nbsp;
        {row.original.M_6.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.M_6.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "A_2",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_2],
    cell: ({ row }) => (
      <>
        <span>{row.original.A_2.length}</span>&nbsp;
        {row.original.A_2.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.A_2.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "A_3_4",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_3_4],
    cell: ({ row }) => (
      <>
        <span>{row.original.A_3_4.length}</span>&nbsp;
        {row.original.A_3_4.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.A_3_4.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "A_6",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_6],
    cell: ({ row }) => (
      <>
        <span>{row.original.A_6.length}</span>&nbsp;
        {row.original.A_6.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.A_6.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "A_8",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_8],
    cell: ({ row }) => (
      <>
        <span>{row.original.A_8.length}</span>&nbsp;
        {row.original.A_8.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.A_8.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "A_12",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_12],
    cell: ({ row }) => (
      <>
        <span>{row.original.A_12.length}</span>&nbsp;
        {row.original.A_12.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.A_12.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "A_16",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_16],
    cell: ({ row }) => (
      <>
        <span>{row.original.A_16.length}</span>&nbsp;
        {row.original.A_16.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.A_16.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "S",
    header: SHIRT_SIZE_LITERALS[ShirtSize.S],
    cell: ({ row }) => (
      <>
        <span>{row.original.S.length}</span>&nbsp;
        {row.original.S.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.S.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "M",
    header: SHIRT_SIZE_LITERALS[ShirtSize.M],
    cell: ({ row }) => (
      <>
        <span>{row.original.M.length}</span>&nbsp;
        {row.original.M.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.M.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "L",
    header: SHIRT_SIZE_LITERALS[ShirtSize.L],
    cell: ({ row }) => (
      <>
        <span>{row.original.L.length}</span>&nbsp;
        {row.original.L.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.L.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "XL",
    header: SHIRT_SIZE_LITERALS[ShirtSize.XL],
    cell: ({ row }) => (
      <>
        <span>{row.original.XL.length}</span>&nbsp;
        {row.original.XL.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.XL.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "XXL",
    header: SHIRT_SIZE_LITERALS[ShirtSize.XXL],
    cell: ({ row }) => (
      <>
        <span>{row.original.XXL.length}</span>&nbsp;
        {row.original.XXL.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.XXL.join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    ),
  },
  {
    accessorKey: "XXXL",
    header: SHIRT_SIZE_LITERALS[ShirtSize.XXXL],
    cell: ({ row }) => (
      <>
        <span>{row.original.XXXL.length}</span>&nbsp;
        {row.original.XXXL.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{row.original.XXXL.join(", ")}</p>
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
