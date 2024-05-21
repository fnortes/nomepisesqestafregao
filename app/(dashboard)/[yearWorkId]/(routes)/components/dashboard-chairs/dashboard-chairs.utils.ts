import { GeneralExpense } from "../common.types";
import {
  calculateTotalExpensesCurrentPaid,
  calculateTotalExpensesToPaid,
  getChairsExpenses,
} from "../common.utils";

export const calculateChairsExpensesData = (
  allExpenses: GeneralExpense[],
  totalAdultClients: number,
  totalAdultAndChildClients: number
) => {
  // Se calcula el total del coste del alquiler de mesas y sillas, estimado a pagar y el pagado actual.
  const expenses = getChairsExpenses(allExpenses);
  const totalToPaid = calculateTotalExpensesToPaid(expenses);
  const totalCurrentPaid = calculateTotalExpensesCurrentPaid(expenses);
  // Se calcula el precio por adulto necesario para pagar el alquiler de mesas y sillas.
  const totalByAdult = totalToPaid / totalAdultClients;
  // Se calcula el precio por adulto y niño necesario para pagar el alquiler de mesas y sillas.
  const totalByAdultAndChild = totalToPaid / totalAdultAndChildClients;

  return {
    totalByAdult,
    totalByAdultAndChild,
    totalCurrentPaid,
    totalToPaid,
    expenses,
  };
};
