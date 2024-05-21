import { GeneralExpense } from "../common.types";
import {
  calculateTotalExpensesCurrentPaid,
  calculateTotalExpensesToPaid,
  getVariousExpenses,
} from "../common.utils";

export const calculateVariousExpensesData = (
  allExpenses: GeneralExpense[],
  totalAdultClients: number,
  totalAdultAndChildClients: number
) => {
  // Se calcula el total de gastos extra, estimado a pagar y el pagado actual.
  const expenses = getVariousExpenses(allExpenses);
  const totalToPaid = calculateTotalExpensesToPaid(expenses);
  const totalCurrentPaid = calculateTotalExpensesCurrentPaid(expenses);
  // Se calcula el precio por adulto necesario para pagar los gastos extra.
  const totalByAdult = totalToPaid / totalAdultClients;
  // Se calcula el precio por adulto y niño necesario para pagar los gastos extra.
  const totalByAdultAndChild = totalToPaid / totalAdultAndChildClients;

  return {
    totalByAdult,
    totalByAdultAndChild,
    totalCurrentPaid,
    totalToPaid,
    expenses,
  };
};
