import * as z from "zod";

import { AgeGroup, Gender, ShirtSize } from "@prisma/client";

import type { CommonFormFieldData } from "@/components/form/form.types";
import {
  AGE_GROUPS_LITERALS,
  GENDER_LITERALS,
  SHIRT_SIZE_LITERALS,
} from "../../clients.constants";

export const formSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().max(50).optional().nullable(),
  phone: z.string().length(9).optional().nullable(),
  email: z.string().email().optional().nullable(),
  gender: z.nativeEnum(Gender),
  ageGroup: z.nativeEnum(AgeGroup),
  isNew: z.boolean().default(false),
  barGroups: z.array(z.string()),
  foods: z.array(
    z.object({
      attend: z.boolean().default(false),
      foodId: z.string(),
      quantity: z.number().min(0).max(99),
    })
  ),
  priceTypeId: z.string(),
  shirtSize: z.nativeEnum(ShirtSize).optional().nullable(),
  quotaPaid: z.number().min(0).max(999),
  comments: z.string().optional().nullable(),
});

export const shirtSizeOptionsData: CommonFormFieldData = [
  { value: ShirtSize.M_6, label: SHIRT_SIZE_LITERALS[ShirtSize.M_6] },
  { value: ShirtSize.A_2, label: SHIRT_SIZE_LITERALS[ShirtSize.A_2] },
  { value: ShirtSize.A_3_4, label: SHIRT_SIZE_LITERALS[ShirtSize.A_3_4] },
  { value: ShirtSize.A_6, label: SHIRT_SIZE_LITERALS[ShirtSize.A_6] },
  { value: ShirtSize.A_8, label: SHIRT_SIZE_LITERALS[ShirtSize.A_8] },
  { value: ShirtSize.A_12, label: SHIRT_SIZE_LITERALS[ShirtSize.A_12] },
  { value: ShirtSize.A_16, label: SHIRT_SIZE_LITERALS[ShirtSize.A_16] },
  { value: ShirtSize.S, label: SHIRT_SIZE_LITERALS[ShirtSize.S] },
  { value: ShirtSize.M, label: SHIRT_SIZE_LITERALS[ShirtSize.M] },
  { value: ShirtSize.L, label: SHIRT_SIZE_LITERALS[ShirtSize.L] },
  { value: ShirtSize.XL, label: SHIRT_SIZE_LITERALS[ShirtSize.XL] },
  { value: ShirtSize.XXL, label: SHIRT_SIZE_LITERALS[ShirtSize.XXL] },
  { value: ShirtSize.XXXL, label: SHIRT_SIZE_LITERALS[ShirtSize.XXXL] },
];

export const ageGroupData = [
  { value: AgeGroup.ADULT, label: AGE_GROUPS_LITERALS[AgeGroup.ADULT] },
  { value: AgeGroup.CHILD, label: AGE_GROUPS_LITERALS[AgeGroup.CHILD] },
  {
    value: AgeGroup.CHILD_HALF_PORTION,
    label: AGE_GROUPS_LITERALS[AgeGroup.CHILD_HALF_PORTION],
  },
  { value: AgeGroup.BABY, label: AGE_GROUPS_LITERALS[AgeGroup.BABY] },
];

export const genderOptionsData: CommonFormFieldData = [
  { value: Gender.MAN, label: GENDER_LITERALS[Gender.MAN] },
  { value: Gender.WOMAN, label: GENDER_LITERALS[Gender.WOMAN] },
];
