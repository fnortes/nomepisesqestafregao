"use client";

import { DATE_FORMAT } from "@/constants/date";
import { formatCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type DashboardFoodsColumn = {
  date: Date;
  price: number;
  title: string;
  total: number;
  totalList: string[];
  // totalAdult: number;
  // totalAdultList: string[];
  // totalBaby: number;
  // totalBabyList: string[];
  // totalChild: number;
  // totalChildHalfPortion: number;
  // totalChildHalfPortionList: string[];
  // totalChildList: string[];
  totalPrice: number;
  // totalTeen: number;
  // totalTeenHalfPortion: number;
  // totalTeenHalfPortionList: string[];
  // totalTeenList: string[];
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
    accessorKey: "totalList",
    header: "Adultos",
    cell: ({ row }) =>
      row.original.totalList.length > 0 ? (
        <div>
          <strong>({row.original.total})</strong>
          <br />
          {row.original.totalList.toSorted().map((c) => (
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
  // {
  //   accessorKey: "totalChild",
  //   header: "Niños con cuota",
  //   cell: ({ row }) =>
  //     row.original.totalChildList.length > 0 ? (
  //       <div>
  //         <strong>({row.original.totalChild})</strong>
  //         <br />
  //         {row.original.totalChildList.toSorted().map((c) => (
  //           <span key={c}>
  //             {c}
  //             <br />
  //           </span>
  //         ))}
  //       </div>
  //     ) : (
  //       0
  //     ),
  // },
  // {
  //   accessorKey: "totalChildHalfPortion",
  //   header: "Niños con cuota 50% Ración",
  //   cell: ({ row }) =>
  //     row.original.totalChildHalfPortionList.length > 0 ? (
  //       <div>
  //         <strong>({row.original.totalChildHalfPortion})</strong>
  //         <br />
  //         {row.original.totalChildHalfPortionList.toSorted().map((c) => (
  //           <span key={c}>
  //             {c}
  //             <br />
  //           </span>
  //         ))}
  //       </div>
  //     ) : (
  //       0
  //     ),
  // },
  // {
  //   accessorKey: "totalBaby",
  //   header: "Bebés",
  //   cell: ({ row }) =>
  //     row.original.totalBabyList.length > 0 ? (
  //       <div>
  //         <strong>({row.original.totalBaby})</strong>
  //         <br />
  //         {row.original.totalBabyList.toSorted().map((c) => (
  //           <span key={c}>
  //             {c}
  //             <br />
  //           </span>
  //         ))}
  //       </div>
  //     ) : (
  //       0
  //     ),
  // },
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
