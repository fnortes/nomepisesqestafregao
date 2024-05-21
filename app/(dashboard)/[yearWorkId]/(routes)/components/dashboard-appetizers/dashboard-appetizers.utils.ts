import { GeneralExpense } from "../common.types";
import {
  calculateTotalExpensesCurrentPaid,
  calculateTotalExpensesToPaid,
  getAppetizersExpenses,
} from "../common.utils";

export const calculateAppetizersExpensesData = (
  allExpenses: GeneralExpense[],
  totalAdultClients: number,
  totalAdultAndChildClients: number
) => {
  // Se calcula el total del coste de los aperitivos y postres, estimado a pagar y el pagado actual.
  const expenses = getAppetizersExpenses(allExpenses);
  const totalToPaid = calculateTotalExpensesToPaid(expenses);
  const totalCurrentPaid = calculateTotalExpensesCurrentPaid(expenses);
  // Se calcula el precio por adulto necesario para pagar los aperitivos y postres.
  const totalByAdult = totalToPaid / totalAdultClients;
  // Se calcula el precio por adulto y niño necesario para pagar los aperitivos y postres.
  const totalByAdultAndChild = totalToPaid / totalAdultAndChildClients;

  return {
    expenses,
    totalByAdult,
    totalByAdultAndChild,
    totalCurrentPaid,
    totalToPaid,
  };
};
