import { AgeGroup, Gender, ShirtSize } from "@prisma/client";

export const SHIRT_SIZE_LITERALS = {
  [ShirtSize.M_6]: "6 Meses",
  [ShirtSize.A_2]: "2 años",
  [ShirtSize.A_3_4]: "3-4 años",
  [ShirtSize.A_6]: "6 años",
  [ShirtSize.A_8]: "8 años",
  [ShirtSize.A_12]: "12 años",
  [ShirtSize.A_16]: "16 años",
  [ShirtSize.S]: "S",
  [ShirtSize.M]: "M",
  [ShirtSize.L]: "L",
  [ShirtSize.XL]: "XL",
  [ShirtSize.XXL]: "XXL",
  [ShirtSize.XXXL]: "3XL",
};

export const AGE_GROUPS_LITERALS = {
  [AgeGroup.ADULT]: "Adulto",
  [AgeGroup.CHILD]: "Niño con cuota",
  [AgeGroup.BABY]: "Bebé sin cuota",
};

export const GENDER_LITERALS = {
  [Gender.MAN]: "Hombre",
  [Gender.WOMAN]: "Mujer",
};
