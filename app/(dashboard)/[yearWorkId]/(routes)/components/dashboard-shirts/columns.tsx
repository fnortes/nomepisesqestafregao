"use client";

import { ShirtSize } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { SHIRT_SIZE_LITERALS } from "../../clients/clients.constants";

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
    cell: ({ row }) =>
      row.original.M_6.length > 0 ? (
        <div>
          <strong>({row.original.M_6.length})</strong>
          <br />
          {row.original.M_6.toSorted().map((c) => (
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
    accessorKey: "A_2",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_2],
    cell: ({ row }) =>
      row.original.A_2.length > 0 ? (
        <div>
          <strong>({row.original.A_2.length})</strong>
          <br />
          {row.original.A_2.toSorted().map((c) => (
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
    accessorKey: "A_3_4",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_3_4],
    cell: ({ row }) =>
      row.original.A_3_4.length > 0 ? (
        <div>
          <strong>({row.original.A_3_4.length})</strong>
          <br />
          {row.original.A_3_4.toSorted().map((c) => (
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
    accessorKey: "A_6",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_6],
    cell: ({ row }) =>
      row.original.A_6.length > 0 ? (
        <div>
          <strong>({row.original.A_6.length})</strong>
          <br />
          {row.original.A_6.toSorted().map((c) => (
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
    accessorKey: "A_8",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_8],
    cell: ({ row }) =>
      row.original.A_8.length > 0 ? (
        <div>
          <strong>({row.original.A_8.length})</strong>
          <br />
          {row.original.A_8.toSorted().map((c) => (
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
    accessorKey: "A_12",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_12],
    cell: ({ row }) =>
      row.original.A_12.length > 0 ? (
        <div>
          <strong>({row.original.A_12.length})</strong>
          <br />
          {row.original.A_12.toSorted().map((c) => (
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
    accessorKey: "A_16",
    header: SHIRT_SIZE_LITERALS[ShirtSize.A_16],
    cell: ({ row }) =>
      row.original.A_16.length > 0 ? (
        <div>
          <strong>({row.original.A_16.length})</strong>
          <br />
          {row.original.A_16.toSorted().map((c) => (
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
    accessorKey: "S",
    header: SHIRT_SIZE_LITERALS[ShirtSize.S],
    cell: ({ row }) =>
      row.original.S.length > 0 ? (
        <div>
          <strong>({row.original.S.length})</strong>
          <br />
          {row.original.S.toSorted().map((c) => (
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
    accessorKey: "M",
    header: SHIRT_SIZE_LITERALS[ShirtSize.M],
    cell: ({ row }) =>
      row.original.M.length > 0 ? (
        <div>
          <strong>({row.original.M.length})</strong>
          <br />
          {row.original.M.toSorted().map((c) => (
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
    accessorKey: "L",
    header: SHIRT_SIZE_LITERALS[ShirtSize.L],
    cell: ({ row }) =>
      row.original.L.length > 0 ? (
        <div>
          <strong>({row.original.L.length})</strong>
          <br />
          {row.original.L.toSorted().map((c) => (
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
    accessorKey: "XL",
    header: SHIRT_SIZE_LITERALS[ShirtSize.XL],
    cell: ({ row }) =>
      row.original.XL.length > 0 ? (
        <div>
          <strong>({row.original.XL.length})</strong>
          <br />
          {row.original.XL.toSorted().map((c) => (
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
    accessorKey: "XXL",
    header: SHIRT_SIZE_LITERALS[ShirtSize.XXL],
    cell: ({ row }) =>
      row.original.XXL.length > 0 ? (
        <div>
          <strong>({row.original.XXL.length})</strong>
          <br />
          {row.original.XXL.toSorted().map((c) => (
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
    accessorKey: "XXXL",
    header: SHIRT_SIZE_LITERALS[ShirtSize.XXXL],
    cell: ({ row }) =>
      row.original.XXXL.length > 0 ? (
        <div>
          <strong>({row.original.XXXL.length})</strong>
          <br />
          {row.original.XXXL.toSorted().map((c) => (
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
