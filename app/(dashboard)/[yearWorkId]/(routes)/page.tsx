import prismadb from "@/lib/prismadb";
import { ExpenseFamily } from "@prisma/client";
import DashboardChairs from "./components/dashboard-chairs/dashboard-chairs";
import DashboardClients from "./components/dashboard-clients/dashboard-clients";
import DashboardFoods from "./components/dashboard-foods/dashboard-foods";
import DashboardPlastic from "./components/dashboard-plastic/dashboard-plastic";
import DashboardResume from "./components/dashboard-resume/dashboard-resume";
import DashboardShirts from "./components/dashboard-shirts/dashboard-shirts";
import DashboardAppetizers from "./components/dashboard-appetizers/dashboard-appetizers";
import DashboardSuits from "./components/dashboard-suits/dashboard-suits";
import DashboardDrinks from "./components/dashboard-drinks/dashboard-drinks";

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

  const otherExpenseFamilies = [
    ExpenseFamily.DECORATION,
    ExpenseFamily.EXTRA_EXPENSES,
    ExpenseFamily.FLOWER_OFFERING,
    ExpenseFamily.ICE_CUBES,
    ExpenseFamily.MUSIC,
    ExpenseFamily.TOOLS,
    ExpenseFamily.VEHICLES,
  ];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DashboardResume
          clients={clients}
          expenses={expenses}
          yearWork={yearWork}
          foods={foods}
        />
        <DashboardClients clients={clients} />
        <DashboardShirts clients={clients} />
        <DashboardPlastic
          expenses={expenses.filter(
            (e) => e.expenseCategory.family === ExpenseFamily.PLASTIC
          )}
          clients={clients}
        />
        <DashboardChairs
          expenses={expenses.filter(
            (e) => e.expenseCategory.family === ExpenseFamily.TABLES_AND_CHAIRS
          )}
          clients={clients}
        />
        <DashboardFoods clients={clients} foods={foods} />
        <DashboardAppetizers
          expenses={expenses.filter(
            (e) =>
              e.expenseCategory.family === ExpenseFamily.FOODS &&
              e.expenseCategory.name === "Aperitivos y postres"
          )}
          clients={clients}
        />
        <DashboardSuits
          expenses={expenses.filter(
            (e) => e.expenseCategory.family === ExpenseFamily.SUITS
          )}
        />
        <DashboardDrinks
          expenses={expenses.filter(
            (e) => e.expenseCategory.family === ExpenseFamily.DRINK
          )}
          clients={clients}
        />
        <DashboardDrinks
          expenses={expenses.filter(
            (e) =>
              otherExpenseFamilies.findIndex(
                (o) => o === e.expenseCategory.family
              ) !== -1
          )}
          clients={clients}
        />
      </div>
    </div>
  );
}
