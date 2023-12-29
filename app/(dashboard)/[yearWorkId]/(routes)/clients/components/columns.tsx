"use client";

import { calculateQuote, formatCurrency } from "@/lib/utils";
import CellAction from "./cell-action";

import type {
  AgeGroup,
  Gender,
  PriceType,
  ShirtSize,
  YearWork,
} from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { BadgeX, Check } from "lucide-react";
import {
  AGE_GROUPS_LITERALS,
  GENDER_LITERALS,
  SHIRT_SIZE_LITERALS,
} from "../clients.constants";

export type ClientColumn = {
  ageGroup: AgeGroup;
  comments: string | null;
  createdAt: string;
  email: string | null;
  firstName: string;
  gender: Gender;
  id: string;
  isNew: boolean;
  lastName: string | null;
  phone: string | null;
  priceType: PriceType;
  quotaPaid: number;
  shirtSize: ShirtSize | null;
  updatedAt: string;
  yearWork: YearWork;
};

export const columns: ColumnDef<ClientColumn>[] = [
  {
    accessorKey: "firstName",
    header: "Nombre",
  },
  {
    accessorKey: "lastName",
    header: "Apellidos",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
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
    accessorKey: "isNew",
    header: "¿Es nuevo?",
    cell: ({ row }) =>
      row.original.isNew ? (
        <Check className="w-4 h-4 text-green-700" />
      ) : (
        <BadgeX className="w-4 h-4 text-red-700" />
      ),
  },
  {
    accessorKey: "priceTypeName",
    header: "Tipo cuota",
    cell: ({ row }) => row.original.priceType.name,
  },
  {
    accessorKey: "shirtSize",
    header: "Talla camiseta",
    cell: ({ row }) =>
      row.original.shirtSize
        ? SHIRT_SIZE_LITERALS[row.original.shirtSize]
        : "-",
  },
  {
    accessorKey: "quota",
    header: "Cálculo cuota",
    cell: ({ row }) =>
      formatCurrency(
        calculateQuote({
          ageGroup: row.original.ageGroup,
          isNew: row.original.isNew,
          priceType: row.original.priceType,
          newClientPrice: row.original.yearWork.newClientPrice,
        })
      ),
  },
  {
    accessorKey: "quotaPaid",
    header: "Pagado cuota",
    cell: ({ row }) => formatCurrency(row.original.quotaPaid),
  },
  {
    accessorKey: "comments",
    header: "Comentarios",
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
