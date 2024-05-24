"use client";

import type { ColumnDef } from "@tanstack/react-table";

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
    cell: ({ row }) =>
      row.original.withLaunchesList.length > 0 ? (
        <div>
          <strong>({row.original.withLaunchesList.length})</strong>
          <br />
          {row.original.withLaunchesList.toSorted().map((c) => (
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
    accessorKey: "withDinnersList",
    header: "Cenas",
    cell: ({ row }) =>
      row.original.withDinnersList.length > 0 ? (
        <div>
          <strong>({row.original.withDinnersList.length})</strong>
          <br />
          {row.original.withDinnersList.toSorted().map((c) => (
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
    accessorKey: "withSuitsList",
    header: "Trajes",
    cell: ({ row }) =>
      row.original.withSuitsList.length > 0 ? (
        <div>
          <strong>({row.original.withSuitsList.length})</strong>
          <br />
          {row.original.withSuitsList.toSorted().map((c) => (
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
    accessorKey: "withWaterList",
    header: "Desfile Agua",
    cell: ({ row }) =>
      row.original.withWaterList.length > 0 ? (
        <div>
          <strong>({row.original.withWaterList.length})</strong>
          <br />
          {row.original.withWaterList.toSorted().map((c) => (
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
    accessorKey: "withBarList",
    header: "Barra",
    cell: ({ row }) =>
      row.original.withBarList.length > 0 ? (
        <div>
          <strong>({row.original.withBarList.length})</strong>
          <br />
          {row.original.withBarList.toSorted().map((c) => (
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
    accessorKey: "resume",
    header: "Total",
  },
];
