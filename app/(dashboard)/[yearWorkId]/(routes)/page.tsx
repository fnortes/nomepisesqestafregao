import prismadb from "@/lib/prismadb";
import {
  countClientsAdult,
  countClientsAllWithQuote,
  getCommissionHelpPercentageFromAllCosts,
  getDinnerPercentageFromAll,
} from "./components/common.utils";
import DashboardAppetizers from "./components/dashboard-appetizers/dashboard-appetizers";
import { calculateAppetizersExpensesData } from "./components/dashboard-appetizers/dashboard-appetizers.utils";
import DashboardChairs from "./components/dashboard-chairs/dashboard-chairs";
import { calculateChairsExpensesData } from "./components/dashboard-chairs/dashboard-chairs.utils";
import DashboardClients from "./components/dashboard-clients/dashboard-clients";
import DashboardDrinks from "./components/dashboard-drinks/dashboard-drinks";
import { calculateDrinksExpensesData } from "./components/dashboard-drinks/dashboard-drinks.utils";
import DashboardExtra from "./components/dashboard-extra/dashboard-extra";
import { calculateVariousExpensesData } from "./components/dashboard-extra/dashboard-extra.utils";
import DashboardFoods from "./components/dashboard-foods/dashboard-foods";
import { calculateFoodsExpensesData } from "./components/dashboard-foods/dashboard-foods.utils";
import DashboardPlastic from "./components/dashboard-plastic/dashboard-plastic";
import { calculatePlasticExpensesData } from "./components/dashboard-plastic/dashboard-plastic.utils";
import DashboardQuotes from "./components/dashboard-quotes/dashboard-quotes";
import DashboardResume from "./components/dashboard-resume/dashboard-resume";
import DashboardShirts from "./components/dashboard-shirts/dashboard-shirts";
import DashboardSuits from "./components/dashboard-suits/dashboard-suits";
import { calculateSuitsExpensesData } from "./components/dashboard-suits/dashboard-suits.utils";

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

  const suits = await prismadb.suit.findMany({
    where: {
      yearWorkId,
    },
    orderBy: {
      ageGroup: "asc",
    },
  });

  const priceTypes = await prismadb.priceType.findMany({
    where: {
      yearWorkId,
    },
    orderBy: {
      adultPrice: "desc",
    },
  });

  const sales = await prismadb.sale.findMany({
    include: { yearWork: true, saleCategory: true },
    where: { yearWorkId },
    orderBy: { date: "asc" },
  });

  if (!yearWork) {
    return null;
  }

  // Se calcula el total de comparsistas adultos y niños, usado para varios cálculos de precios medios.
  const totalAdultClients = countClientsAdult(clients);
  const totalAdultAndChildClients = countClientsAllWithQuote(clients);

  const variousExpensesData = calculateVariousExpensesData(
    expenses,
    totalAdultClients,
    totalAdultAndChildClients
  );

  const plasticExpensesData = calculatePlasticExpensesData(
    expenses,
    totalAdultClients,
    totalAdultAndChildClients
  );

  const chairsExpensesData = calculateChairsExpensesData(
    expenses,
    totalAdultClients,
    totalAdultAndChildClients
  );

  const foodsExpensesData = calculateFoodsExpensesData(foods, clients);

  const appetizersExpensesData = calculateAppetizersExpensesData(
    expenses,
    totalAdultClients,
    totalAdultAndChildClients
  );

  const suitsExpensesData = calculateSuitsExpensesData(suits, clients);

  const drinksExpensesData = calculateDrinksExpensesData(
    expenses,
    totalAdultClients,
    totalAdultAndChildClients
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DashboardResume
          clients={clients}
          yearWork={yearWork}
          totalVariousExpensesToPaid={variousExpensesData.totalToPaid}
          totalPlasticExpensesToPaid={plasticExpensesData.totalToPaid}
          totalChairsExpensesToPaid={chairsExpensesData.totalToPaid}
          totalAppetizersExpensesToPaid={appetizersExpensesData.totalToPaid}
          totalDrinksExpensesToPaid={drinksExpensesData.totalToPaid}
          totalVariousExpensesCurrentPaid={variousExpensesData.totalCurrentPaid}
          totalPlasticExpensesCurrentPaid={plasticExpensesData.totalCurrentPaid}
          totalChairsExpensesCurrentPaid={chairsExpensesData.totalCurrentPaid}
          totalAppetizersExpensesCurrentPaid={
            appetizersExpensesData.totalCurrentPaid
          }
          totalDrinksExpensesCurrentPaid={drinksExpensesData.totalCurrentPaid}
          totalSuitsToPaid={suitsExpensesData.totalToPaid}
          totalSuitsCurrentPaid={suitsExpensesData.totalCurrentPaid}
          totalFoodsToPaid={foodsExpensesData.totalToPaid}
          totalFoodsCurrentPaid={foodsExpensesData.totalCurrentPaid}
          totalSalesBenefits={sales
            .map((s) => s.benefitAmount)
            .reduce((a, b) => a + b, 0)}
        />
        <DashboardClients clients={clients} />
        <DashboardQuotes
          mediumCostAdultSuit={suitsExpensesData.mediumCostAdult}
          mediumCostBabySuit={suitsExpensesData.mediumCostBaby}
          mediumCostChildSuit={suitsExpensesData.mediumCostChild}
          mediumCostTeenSuit={suitsExpensesData.mediumCostTeen}
          priceTypes={priceTypes}
          totalVariousExpensesByAdultAndChild={
            variousExpensesData.totalByAdultAndChild
          }
          totalPlasticExpensesByAdultAndChild={
            plasticExpensesData.totalByAdultAndChild
          }
          totalChairsExpensesByAdultAndChild={
            chairsExpensesData.totalByAdultAndChild
          }
          totalAppetizersExpensesByAdultAndChild={
            appetizersExpensesData.totalByAdultAndChild
          }
          totalDrinksExpensesByAdult={drinksExpensesData.totalByAdult}
          foodCosts={{
            withoutDrink: foodsExpensesData.costByClient,
            withDrink: foodsExpensesData.costByClientWithExtra,
            onlyDinnerPercentage: getDinnerPercentageFromAll(foods),
          }}
          commissionHelpPercentage={getCommissionHelpPercentageFromAllCosts(
            variousExpensesData.totalToPaid +
              plasticExpensesData.totalToPaid +
              chairsExpensesData.totalToPaid +
              appetizersExpensesData.totalToPaid +
              drinksExpensesData.totalToPaid +
              suitsExpensesData.totalToPaid +
              foodsExpensesData.totalToPaid,
            yearWork.commissionHelp
          )}
        />
        <DashboardShirts clients={clients} />
        <DashboardExtra
          expenses={variousExpensesData.expenses}
          totalCost={variousExpensesData.totalToPaid}
          totalVariousExpensesByAdult={variousExpensesData.totalByAdult}
          totalVariousExpensesByAdultAndChild={
            variousExpensesData.totalByAdultAndChild
          }
        />
        <DashboardPlastic
          expenses={plasticExpensesData.expenses}
          totalCost={plasticExpensesData.totalToPaid}
          totalPlasticExpensesByAdult={plasticExpensesData.totalByAdult}
          totalPlasticExpensesByAdultAndChild={
            plasticExpensesData.totalByAdultAndChild
          }
        />
        <DashboardChairs
          expenses={chairsExpensesData.expenses}
          totalCost={chairsExpensesData.totalToPaid}
          totalChairsExpensesByAdult={chairsExpensesData.totalByAdult}
          totalChairsExpensesByAdultAndChild={
            chairsExpensesData.totalByAdultAndChild
          }
        />
        <DashboardFoods
          allFoodsCostByClient={foodsExpensesData.costByClient}
          allFoodsCostByClientWithExtra={
            foodsExpensesData.costByClientWithExtra
          }
          clients={clients}
          dashboardData={foodsExpensesData.dashboardData}
          mediumPriceByClientAndFood={foodsExpensesData.mediumPriceByClient}
          totalFoodsToPaid={foodsExpensesData.totalToPaid}
        />
        <DashboardAppetizers
          expenses={appetizersExpensesData.expenses}
          totalCost={appetizersExpensesData.totalToPaid}
          totalAppetizersExpensesByAdult={appetizersExpensesData.totalByAdult}
          totalAppetizersExpensesByAdultAndChild={
            appetizersExpensesData.totalByAdultAndChild
          }
        />
        <DashboardSuits
          clients={clients}
          dashboardData={suitsExpensesData.dashboardData}
          mediumCostAdultSuit={suitsExpensesData.mediumCostAdult}
          mediumCostBabySuit={suitsExpensesData.mediumCostBaby}
          mediumCostChildSuit={suitsExpensesData.mediumCostChild}
          mediumCostTeenSuit={suitsExpensesData.mediumCostTeen}
          totalSuitsToPaid={suitsExpensesData.totalToPaid}
        />
        <DashboardDrinks
          expenses={drinksExpensesData.expenses}
          totalCost={drinksExpensesData.totalToPaid}
          totalDrinksExpensesByAdult={drinksExpensesData.totalByAdult}
          totalDrinksExpensesByAdultAndChild={
            drinksExpensesData.totalByAdultAndChild
          }
        />
      </div>
    </div>
  );
}
