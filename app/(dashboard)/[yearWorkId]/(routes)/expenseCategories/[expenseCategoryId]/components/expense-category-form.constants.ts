import { ExpenseFamily } from "@prisma/client";
import * as z from "zod";
import { EXPENSE_FAMILY_LITERALS } from "../../components/expenseCategories.constants";

export const formSchema = z.object({
  family: z.nativeEnum(ExpenseFamily),
  name: z.string().max(50),
  previousYearWorkUnitsConsumed: z.number().min(0).max(999),
  comments: z.string().optional().nullable(),
});

export const familiesData = [
  {
    value: ExpenseFamily.DRINK,
    label: EXPENSE_FAMILY_LITERALS[ExpenseFamily.DRINK],
  },
  {
    value: ExpenseFamily.SHIRTS,
    label: EXPENSE_FAMILY_LITERALS[ExpenseFamily.SHIRTS],
  },
  {
    value: ExpenseFamily.FOODS,
    label: EXPENSE_FAMILY_LITERALS[ExpenseFamily.FOODS],
  },
  {
    value: ExpenseFamily.DECORATION,
    label: EXPENSE_FAMILY_LITERALS[ExpenseFamily.DECORATION],
  },
  {
    value: ExpenseFamily.EXTRA_EXPENSES,
    label: EXPENSE_FAMILY_LITERALS[ExpenseFamily.EXTRA_EXPENSES],
  },
  {
    value: ExpenseFamily.TOOLS,
    label: EXPENSE_FAMILY_LITERALS[ExpenseFamily.TOOLS],
  },
  {
    value: ExpenseFamily.ICE_CUBES,
    label: EXPENSE_FAMILY_LITERALS[ExpenseFamily.ICE_CUBES],
  },
  {
    value: ExpenseFamily.TABLES_AND_CHAIRS,
    label: EXPENSE_FAMILY_LITERALS[ExpenseFamily.TABLES_AND_CHAIRS],
  },
  {
    value: ExpenseFamily.MUSIC,
    label: EXPENSE_FAMILY_LITERALS[ExpenseFamily.MUSIC],
  },
  {
    value: ExpenseFamily.FLOWER_OFFERING,
    label: EXPENSE_FAMILY_LITERALS[ExpenseFamily.FLOWER_OFFERING],
  },
  {
    value: ExpenseFamily.PLASTIC,
    label: EXPENSE_FAMILY_LITERALS[ExpenseFamily.PLASTIC],
  },
  {
    value: ExpenseFamily.SUITS,
    label: EXPENSE_FAMILY_LITERALS[ExpenseFamily.SUITS],
  },
  {
    value: ExpenseFamily.VEHICLES,
    label: EXPENSE_FAMILY_LITERALS[ExpenseFamily.VEHICLES],
  },
];
