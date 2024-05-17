import { AgeGroup, ExpenseFamily } from "@prisma/client";

export const OTHER_EXPENSE_FAMILIES = [
  ExpenseFamily.DECORATION,
  ExpenseFamily.EXTRA_EXPENSES,
  ExpenseFamily.FLOWER_OFFERING,
  ExpenseFamily.ICE_CUBES,
  ExpenseFamily.MUSIC,
  ExpenseFamily.TOOLS,
  ExpenseFamily.VEHICLES,
];

export const ADULT_AGE_GROUPS: string[] = [AgeGroup.ADULT];
export const ADULT_AND_CHILD_WITH_QUOTE_AGE_GROUPS: string[] = [
  ...ADULT_AGE_GROUPS,
  AgeGroup.CHILD,
  AgeGroup.CHILD_HALF_PORTION,
];
