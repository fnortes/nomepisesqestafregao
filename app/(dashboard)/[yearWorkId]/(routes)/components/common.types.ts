import {
  Client,
  ClientsOnBarGroups,
  ClientsOnFoods,
  Expense,
  ExpenseCategory,
  PriceType,
  YearWork,
} from "@prisma/client";

export type GeneralClient = Client & {
  priceType: PriceType;
  barGroups: ClientsOnBarGroups[];
  foods: ClientsOnFoods[];
};

export type GeneralExpense = Expense & {
  expenseCategory: ExpenseCategory;
  yearWork: YearWork;
};
