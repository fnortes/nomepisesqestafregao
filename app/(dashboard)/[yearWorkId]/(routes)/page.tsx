import prismadb from "@/lib/prismadb";
import {
  calculateTotalExpensesCurrentPaid,
  calculateTotalExpensesToPaid,
  getAppetizersExpenses,
  getChairsExpenses,
  getDrinksExpenses,
  getPlasticExpenses,
  getSuitsExpenses,
  getVariousExpenses,
} from "./components/common.utils";
import DashboardAppetizers from "./components/dashboard-appetizers/dashboard-appetizers";
import DashboardChairs from "./components/dashboard-chairs/dashboard-chairs";
import DashboardClients from "./components/dashboard-clients/dashboard-clients";
import DashboardDrinks from "./components/dashboard-drinks/dashboard-drinks";
import DashboardExtra from "./components/dashboard-extra/dashboard-extra";
import DashboardFoods from "./components/dashboard-foods/dashboard-foods";
import DashboardPlastic from "./components/dashboard-plastic/dashboard-plastic";
import DashboardResume from "./components/dashboard-resume/dashboard-resume";
import DashboardShirts from "./components/dashboard-shirts/dashboard-shirts";
import DashboardSuits from "./components/dashboard-suits/dashboard-suits";

interface Props {
  readonly params: { yearWorkId: string };
}

export default async function DashboardPage({ params: { yearWorkId } }: Props) {
  const clients = await prismadb.client.findMany({
    include: {
      foods: { orderBy: { food: { date: "asc" } }, include: {} },
      priceType: true,
      barGroups: true,
    },
    where: { yearWorkId },
    orderBy: { createdAt: "desc" },
  });

  const expenses = await prismadb.expense.findMany({
    include: { yearWork: true, expenseCategory: true },
    where: { yearWorkId },
    orderBy: { createdAt: "desc" },
  });

  const yearWork = await prismadb.yearWork.findFirst({
    where: { id: yearWorkId },
  });

  const foods = await prismadb.food.findMany({
    where: {
      yearWorkId,
    },
    orderBy: {
      date: "asc",
    },
  });

  if (!yearWork) {
    return null;
  }

  const variousExpenses = getVariousExpenses(expenses);
  const totalVariousExpensesToPaid =
    calculateTotalExpensesToPaid(variousExpenses);
  const totalVariousExpensesCurrentPaid =
    calculateTotalExpensesCurrentPaid(variousExpenses);

  const plasticExpenses = getPlasticExpenses(expenses);
  const totalPlasticExpensesToPaid =
    calculateTotalExpensesToPaid(plasticExpenses);
  const totalPlasticExpensesCurrentPaid =
    calculateTotalExpensesCurrentPaid(plasticExpenses);

  const chairsExpenses = getChairsExpenses(expenses);
  const totalChairsExpensesToPaid =
    calculateTotalExpensesToPaid(chairsExpenses);
  const totalChairsExpensesCurrentPaid =
    calculateTotalExpensesCurrentPaid(chairsExpenses);

  const appetizersExpenses = getAppetizersExpenses(expenses);
  const totalAppetizersExpensesToPaid =
    calculateTotalExpensesToPaid(appetizersExpenses);
  const totalAppetizersExpensesCurrentPaid =
    calculateTotalExpensesCurrentPaid(appetizersExpenses);

  const suitsExpenses = getSuitsExpenses(expenses);
  const totalSuitsExpensesToPaid = calculateTotalExpensesToPaid(suitsExpenses);
  const totalSuitsExpensesCurrentPaid =
    calculateTotalExpensesCurrentPaid(suitsExpenses);

  const drinksExpenses = getDrinksExpenses(expenses);
  const totalDrinksExpensesToPaid =
    calculateTotalExpensesToPaid(drinksExpenses);
  const totalDrinksExpensesCurrentPaid =
    calculateTotalExpensesCurrentPaid(drinksExpenses);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DashboardResume
          clients={clients}
          expenses={expenses}
          yearWork={yearWork}
          foods={foods}
          totalVariousExpensesToPaid={totalVariousExpensesToPaid}
          totalPlasticExpensesToPaid={totalPlasticExpensesToPaid}
          totalChairsExpensesToPaid={totalChairsExpensesToPaid}
          totalAppetizersExpensesToPaid={totalAppetizersExpensesToPaid}
          totalSuitsExpensesToPaid={totalSuitsExpensesToPaid}
          totalDrinksExpensesToPaid={totalDrinksExpensesToPaid}
          totalVariousExpensesCurrentPaid={totalVariousExpensesCurrentPaid}
          totalPlasticExpensesCurrentPaid={totalPlasticExpensesCurrentPaid}
          totalChairsExpensesCurrentPaid={totalChairsExpensesCurrentPaid}
          totalAppetizersExpensesCurrentPaid={
            totalAppetizersExpensesCurrentPaid
          }
          totalSuitsExpensesCurrentPaid={totalSuitsExpensesCurrentPaid}
          totalDrinksExpensesCurrentPaid={totalDrinksExpensesCurrentPaid}
        />
        <DashboardClients clients={clients} />
        <DashboardShirts clients={clients} />
        <DashboardExtra
          expenses={variousExpenses}
          totalCost={totalVariousExpensesToPaid}
          clients={clients}
        />
        <DashboardPlastic
          expenses={plasticExpenses}
          totalCost={totalPlasticExpensesToPaid}
          clients={clients}
        />
        <DashboardChairs
          expenses={chairsExpenses}
          totalCost={totalChairsExpensesToPaid}
          clients={clients}
        />
        <DashboardFoods clients={clients} foods={foods} />
        <DashboardAppetizers
          expenses={appetizersExpenses}
          totalCost={totalAppetizersExpensesToPaid}
          clients={clients}
        />
        <DashboardSuits
          expenses={suitsExpenses}
          totalCost={totalSuitsExpensesToPaid}
        />
        <DashboardDrinks
          clients={clients}
          expenses={drinksExpenses}
          totalCost={totalDrinksExpensesToPaid}
        />
      </div>
    </div>
  );
}
