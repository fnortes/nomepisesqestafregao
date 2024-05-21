import { GeneralExpense } from "../common.types";
import {
  calculateTotalExpensesCurrentPaid,
  calculateTotalExpensesToPaid,
  getDrinksExpenses,
} from "../common.utils";

export const calculateDrinksExpensesData = (
  allExpenses: GeneralExpense[],
  totalAdultClients: number,
  totalAdultAndChildClients: number
) => {
  // Se calcula el total del coste de la bebida, estimado a pagar y el pagado actual.
  const expenses = getDrinksExpenses(allExpenses);
  const totalToPaid = calculateTotalExpensesToPaid(expenses);
  const totalCurrentPaid = calculateTotalExpensesCurrentPaid(expenses);
  // Se calcula el precio por adulto necesario para pagar el pedido de la bebida.
  const totalByAdult = totalToPaid / totalAdultClients;
  // Se calcula el precio por adulto y niño necesario para pagar el pedido de la bebida.
  const totalByAdultAndChild = totalToPaid / totalAdultAndChildClients;

  return {
    totalByAdult,
    totalByAdultAndChild,
    totalCurrentPaid,
    totalToPaid,
    expenses,
  };
};
