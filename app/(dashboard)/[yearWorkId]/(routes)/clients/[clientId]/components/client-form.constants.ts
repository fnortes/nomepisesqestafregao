import * as z from "zod";

import { AgeGroup, Gender, ShirtSize, SuitGroup } from "@prisma/client";

import type { CommonFormFieldData } from "@/components/form/form.types";
import {
  AGE_GROUPS_LITERALS,
  GENDER_LITERALS,
  SHIRT_SIZE_LITERALS,
  SUIT_GROUPS_LITERALS,
} from "../../clients.constants";

export const formSchema = z.object({
  ageGroup: z.nativeEnum(AgeGroup),
  allergiesComments: z.string().optional().nullable(),
  barGroups: z.array(z.string()),
  comments: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  firstName: z.string().min(1).max(50),
  foods: z.array(
    z.object({
      attend: z.boolean().default(false),
      foodId: z.string(),
      quantity: z.number().min(0).max(99),
    })
  ),
  gender: z.nativeEnum(Gender),
  isNew: z.boolean().default(false),
  lastName: z.string().max(50).optional().nullable(),
  phone: z.string().length(9).optional().nullable(),
  priceTypeId: z.string(),
  quotaModifier: z.number().min(-999).max(999),
  quotaPaid: z.number().min(0).max(999),
  shirtSize: z.nativeEnum(ShirtSize).optional().nullable(),
  suitGroup: z.nativeEnum(SuitGroup),
});

export const shirtSizeOptionsData: CommonFormFieldData = [
  { value: ShirtSize.M_6, label: SHIRT_SIZE_LITERALS[ShirtSize.M_6] },
  { value: ShirtSize.A_2, label: SHIRT_SIZE_LITERALS[ShirtSize.A_2] },
  { value: ShirtSize.A_3_4, label: SHIRT_SIZE_LITERALS[ShirtSize.A_3_4] },
  { value: ShirtSize.A_6, label: SHIRT_SIZE_LITERALS[ShirtSize.A_6] },
  { value: ShirtSize.A_8, label: SHIRT_SIZE_LITERALS[ShirtSize.A_8] },
  { value: ShirtSize.A_9, label: SHIRT_SIZE_LITERALS[ShirtSize.A_9] },
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
  { value: AgeGroup.TEEN, label: AGE_GROUPS_LITERALS[AgeGroup.TEEN] },
  {
    value: AgeGroup.TEEN_HALF_PORTION,
    label: AGE_GROUPS_LITERALS[AgeGroup.TEEN_HALF_PORTION],
  },
  { value: AgeGroup.CHILD, label: AGE_GROUPS_LITERALS[AgeGroup.CHILD] },
  {
    value: AgeGroup.CHILD_HALF_PORTION,
    label: AGE_GROUPS_LITERALS[AgeGroup.CHILD_HALF_PORTION],
  },
  { value: AgeGroup.BABY, label: AGE_GROUPS_LITERALS[AgeGroup.BABY] },
];

export const suitGroupData = [
  { value: SuitGroup.GROUP_1, label: SUIT_GROUPS_LITERALS[SuitGroup.GROUP_1] },
  { value: SuitGroup.GROUP_2, label: SUIT_GROUPS_LITERALS[SuitGroup.GROUP_2] },
  {
    value: SuitGroup.GROUP_3,
    label: SUIT_GROUPS_LITERALS[SuitGroup.GROUP_3],
  },
];

export const genderOptionsData: CommonFormFieldData = [
  { value: Gender.MAN, label: GENDER_LITERALS[Gender.MAN] },
  { value: Gender.WOMAN, label: GENDER_LITERALS[Gender.WOMAN] },
];
