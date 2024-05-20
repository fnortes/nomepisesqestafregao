import { calculateQuote } from "@/lib/utils";
import {
  AgeGroup,
  Expense,
  ExpenseFamily,
  Food,
  Suit,
  YearWork,
} from "@prisma/client";
import {
  ADULT_AGE_GROUPS,
  ADULT_AND_CHILD_WITH_QUOTE_AGE_GROUPS,
  OTHER_EXPENSE_FAMILIES,
} from "./common.constants";
import { GeneralClient, GeneralExpense } from "./common.types";

export const countClientsByFood = (
  clients: GeneralClient[],
  foodId: string
): number =>
  clients
    .filter(
      (client) => client.foods.filter((f) => f.foodId === foodId).length > 0
    )
    .map((client) => {
      const clientFood = client.foods.find((f) => f.foodId === foodId);

      if (clientFood) {
        const foodPercentage =
          client.ageGroup === AgeGroup.CHILD_HALF_PORTION ||
          client.ageGroup === AgeGroup.BABY
            ? 0.5
            : 1;
        return clientFood.quantity + (clientFood.attend ? foodPercentage : 0);
      }

      return 0;
    })
    .reduce((a, b) => a + b, 0);

export const countClientsBySuit = (
  clients: GeneralClient[],
  suit: Suit
): number =>
  clients.filter(
    (client) =>
      client.priceType.paradeSuit &&
      client.ageGroup === suit.ageGroup &&
      client.gender === suit.gender
  ).length;

export const countAdultClients = (clients: GeneralClient[]): number =>
  clients.filter((c) => ADULT_AGE_GROUPS.indexOf(c.ageGroup) !== -1).length;

export const countAdultAndChildClients = (clients: GeneralClient[]): number =>
  clients.filter(
    (c) => ADULT_AND_CHILD_WITH_QUOTE_AGE_GROUPS.indexOf(c.ageGroup) !== -1
  ).length;

export const calculateTotalClientsToPaid = (
  clients: GeneralClient[],
  yearWork: YearWork
): number =>
  clients
    .map((client) =>
      calculateQuote({
        ageGroup: client.ageGroup,
        isNew: client.isNew,
        priceType: client.priceType,
        yearWork,
        foodQuantities: client.foods.map((f) => f.quantity),
      })
    )
    .reduce((a, b) => a + b, 0);

export const calculateTotalClientsCurrentPaid = (
  clients: GeneralClient[]
): number =>
  clients.map((client) => client.quotaPaid).reduce((a, b) => a + b, 0);

export const calculateTotalExpensesToPaid = (expenses: Expense[]): number =>
  expenses.map((expense) => expense.total).reduce((a, b) => a + b, 0);

export const calculateTotalExpensesCurrentPaid = (
  expenses: Expense[]
): number => expenses.map((expense) => expense.paid).reduce((a, b) => a + b, 0);

export const calculateTotalFoodsToPaid = (
  foods: Food[],
  clients: GeneralClient[]
): number =>
  foods
    .map((food) => {
      const total = countClientsByFood(clients, food.id);
      return total * food.price;
    })
    .reduce((a, b) => a + b, 0);

export const calculateTotalFoodsCurrentPaid = (foods: Food[]): number =>
  foods.map((food) => food.paid).reduce((a, b) => a + b, 0);

export const calculateTotalSuitsToPaid = (
  suits: Suit[],
  clients: GeneralClient[]
): number =>
  suits
    .map((suit) => {
      const total = countClientsBySuit(clients, suit);
      return total * suit.price;
    })
    .reduce((a, b) => a + b, 0);

export const calculateTotalSuitsCurrentPaid = (suits: Suit[]): number =>
  suits.map((suit) => suit.paid).reduce((a, b) => a + b, 0);

const getExpensesByFilter = (
  expenses: GeneralExpense[],
  filter: (expense: GeneralExpense) => boolean
): GeneralExpense[] => expenses.filter(filter);

const variousExpensesFilter = (expense: GeneralExpense) =>
  OTHER_EXPENSE_FAMILIES.findIndex(
    (o) => o === expense.expenseCategory.family
  ) !== -1;

export const getVariousExpenses = (
  expenses: GeneralExpense[]
): GeneralExpense[] => getExpensesByFilter(expenses, variousExpensesFilter);

const plasticExpensesFilter = (expense: GeneralExpense) =>
  expense.expenseCategory.family === ExpenseFamily.PLASTIC;

export const getPlasticExpenses = (
  expenses: GeneralExpense[]
): GeneralExpense[] => getExpensesByFilter(expenses, plasticExpensesFilter);

const chairsExpensesFilter = (expense: GeneralExpense) =>
  expense.expenseCategory.family === ExpenseFamily.TABLES_AND_CHAIRS;

export const getChairsExpenses = (
  expenses: GeneralExpense[]
): GeneralExpense[] => getExpensesByFilter(expenses, chairsExpensesFilter);

const appetizersExpensesFilter = (expense: GeneralExpense) =>
  expense.expenseCategory.family === ExpenseFamily.FOODS &&
  expense.expenseCategory.name === "Aperitivos y postres";

export const getAppetizersExpenses = (
  expenses: GeneralExpense[]
): GeneralExpense[] => getExpensesByFilter(expenses, appetizersExpensesFilter);

const suitsExpensesFilter = (expense: GeneralExpense) =>
  expense.expenseCategory.family === ExpenseFamily.SUITS;

export const getSuitsExpenses = (
  expenses: GeneralExpense[]
): GeneralExpense[] => getExpensesByFilter(expenses, suitsExpensesFilter);

const drinksExpensesFilter = (expense: GeneralExpense) =>
  expense.expenseCategory.family === ExpenseFamily.DRINK;

export const getDrinksExpenses = (
  expenses: GeneralExpense[]
): GeneralExpense[] => getExpensesByFilter(expenses, drinksExpensesFilter);
