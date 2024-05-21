import { GeneralExpense } from "../common.types";
import {
  calculateTotalExpensesCurrentPaid,
  calculateTotalExpensesToPaid,
  getPlasticExpenses,
} from "../common.utils";

export const calculatePlasticExpensesData = (
  allExpenses: GeneralExpense[],
  totalAdultClients: number,
  totalAdultAndChildClients: number
) => {
  // Se calcula el total del coste del plástico, estimado a pagar y el pagado actual.
  const expenses = getPlasticExpenses(allExpenses);
  const totalToPaid = calculateTotalExpensesToPaid(expenses);
  const totalCurrentPaid = calculateTotalExpensesCurrentPaid(expenses);
  // Se calcula el precio por adulto necesario para pagar el pedido del plástico.
  const totalByAdult = totalToPaid / totalAdultClients;
  // Se calcula el precio por adulto y niño necesario para pagar el pedido del plástico.
  const totalByAdultAndChild = totalToPaid / totalAdultAndChildClients;

  return {
    totalByAdult,
    totalByAdultAndChild,
    totalCurrentPaid,
    totalToPaid,
    expenses,
  };
};
