import * as z from "zod";

import { AgeGroup, Gender, ShirtSize } from "@prisma/client";

import type { CommonFormFieldData } from "@/components/form/form.types";

export const formSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().max(50).optional().nullable(),
  phone: z.string().length(9).optional().nullable(),
  email: z.string().email().optional().nullable(),
  gender: z.nativeEnum(Gender),
  ageGroup: z.nativeEnum(AgeGroup),
  isNew: z.boolean().default(false),
  barGroups: z.array(z.string()),
  priceTypeId: z.string(),
  shirtSize: z.nativeEnum(ShirtSize).optional().nullable(),
  quotaPaid: z.number().min(0).max(999),
  comments: z.string().optional().nullable(),
});

export const shirtSizeOptionsData: CommonFormFieldData = [
  { value: ShirtSize.M_6, label: "6 Meses" },
  { value: ShirtSize.A_2, label: "2 años" },
  { value: ShirtSize.A_3_4, label: "3-4 años" },
  { value: ShirtSize.A_6, label: "6 años" },
  { value: ShirtSize.A_8, label: "8 años" },
  { value: ShirtSize.A_12, label: "12 años" },
  { value: ShirtSize.A_16, label: "16 años" },
  { value: ShirtSize.S, label: "S" },
  { value: ShirtSize.M, label: "M" },
  { value: ShirtSize.L, label: "L" },
  { value: ShirtSize.XL, label: "XL" },
  { value: ShirtSize.XXL, label: "XXL" },
  { value: ShirtSize.XXXL, label: "3XL" },
];

export const ageGroupData = [
  { value: AgeGroup.ADULT, label: "Adulto" },
  { value: AgeGroup.CHILD, label: "Niño con cuota" },
  { value: AgeGroup.BABY, label: "bebé sin cuota" },
];

export const genderOptionsData: CommonFormFieldData = [
  { value: Gender.MAN, label: "Hombre" },
  { value: Gender.WOMAN, label: "Mujer" },
];
