import { AgeGroup, Gender, ShirtSize, SuitGroup } from "@prisma/client";

export const SHIRT_SIZE_LITERALS = {
  [ShirtSize.M_6]: "6 Meses",
  [ShirtSize.A_2]: "1-2 años",
  [ShirtSize.A_3_4]: "3-4 años",
  [ShirtSize.A_6]: "5-6 años",
  [ShirtSize.A_8]: "7-8 años",
  [ShirtSize.A_9]: "9-10 años",
  [ShirtSize.A_12]: "11-12 años",
  [ShirtSize.A_16]: "16 años",
  [ShirtSize.S]: "S",
  [ShirtSize.M]: "M",
  [ShirtSize.L]: "L",
  [ShirtSize.XL]: "XL",
  [ShirtSize.XXL]: "2XL",
  [ShirtSize.XXXL]: "3XL",
};

export const AGE_GROUPS_LITERALS = {
  [AgeGroup.ADULT]: "Adulto",
  [AgeGroup.TEEN]: "Adolescente",
  [AgeGroup.TEEN_HALF_PORTION]: "Adolescente 50% ración",
  [AgeGroup.CHILD]: "Niño",
  [AgeGroup.CHILD_HALF_PORTION]: "Niño 50% ración",
  [AgeGroup.BABY]: "Bebé",
};

export const GENDER_LITERALS = {
  [Gender.MAN]: "Hombre",
  [Gender.WOMAN]: "Mujer",
};

export const SUIT_GROUPS_LITERALS = {
  [SuitGroup.GROUP_1]: "Grupo 1",
  [SuitGroup.GROUP_2]: "Grupo 2",
  [SuitGroup.GROUP_3]: "Grupo 3",
};
