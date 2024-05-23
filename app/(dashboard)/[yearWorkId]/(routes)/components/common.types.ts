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

export type FoodCosts = {
  withoutDrink: number;
  withDrink: number;
  onlyDinnerPercentage: number;
};

export type FoodClientCount = {
  total: number;
  clients: string[];
};

export type ClientUnitsFood = {
  units: number;
  name: string;
};
