"use client";

import CellAction from "./cell-action";

import type { AgeGroup, Gender, ShirtSize } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

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
  priceTypeId: string;
  quotaPaid: number;
  shirtSize: ShirtSize | null;
  updatedAt: string;
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
  },
  {
    accessorKey: "ageGroup",
    header: "Grupo de edad",
  },
  {
    accessorKey: "isNew",
    header: "¿Es nuevo?",
  },
  {
    accessorKey: "priceTypeId",
    header: "Tipo cuota",
  },
  {
    accessorKey: "shirtSize",
    header: "Talla camiseta",
  },
  {
    accessorKey: "quotaPaid",
    header: "Pagado cuota",
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
