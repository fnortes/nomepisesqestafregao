"use client";

import { calculateQuote, cn, formatCurrency } from "@/lib/utils";
import CellAction from "./cell-action";

import type {
  AgeGroup,
  ClientsOnFoods,
  Gender,
  PriceType,
  ShirtSize,
  SuitGroup,
  YearWork,
} from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { BadgeX, Check } from "lucide-react";
import {
  AGE_GROUPS_LITERALS,
  GENDER_LITERALS,
  SHIRT_SIZE_LITERALS,
  SUIT_GROUPS_LITERALS,
} from "../clients.constants";

export type ClientColumn = {
  ageGroup: AgeGroup;
  allergiesComments: string | null;
  comments: string | null;
  email: string | null;
  firstName: string;
  foods: ClientsOnFoods[];
  gender: Gender;
  id: string;
  isNew: boolean;
  lastName: string | null;
  phone: string | null;
  priceType: PriceType;
  quotaModifier: number;
  quotaPaid: number;
  shirtSize: ShirtSize | null;
  suitGroup: SuitGroup;
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
    accessorKey: "suitGroup",
    header: "Grupo de traje",
    cell: ({ row }) => SUIT_GROUPS_LITERALS[row.original.suitGroup],
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
    accessorKey: "quotaModifier",
    header: "Modificador de cuota",
    cell: ({ row }) => formatCurrency(row.original.quotaModifier),
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
          yearWork: row.original.yearWork,
          foodQuantities: row.original.foods.map((f) => f.quantity),
          quotaModifier: row.original.quotaModifier,
        })
      ),
  },
  {
    accessorKey: "quotaPaid",
    header: "Pagado cuota",
    cell: ({ row }) => (
      <span
        className={cn(
          "font-bold",
          calculateQuote({
            ageGroup: row.original.ageGroup,
            isNew: row.original.isNew,
            priceType: row.original.priceType,
            yearWork: row.original.yearWork,
            foodQuantities: row.original.foods.map((f) => f.quantity),
            quotaModifier: row.original.quotaModifier,
          }) === row.original.quotaPaid
            ? "text-green-600"
            : "text-red-600"
        )}
      >
        {formatCurrency(row.original.quotaPaid)}
      </span>
    ),
  },
  {
    accessorKey: "comments",
    header: "Comentarios",
  },
  {
    accessorKey: "allergiesComments",
    header: "Alergias",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
