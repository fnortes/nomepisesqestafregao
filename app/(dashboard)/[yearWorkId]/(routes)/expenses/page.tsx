import prismadb from "@/lib/prismadb";
import ExpensesClient from "./components/expenses-client";

import type { ExpenseColumn } from "./components/columns";

interface Props {
  readonly params: {
    yearWorkId: string;
  };
}

export default async function ExpensesPage({ params: { yearWorkId } }: Props) {
  const expenses = await prismadb.expense.findMany({
    include: { yearWork: true, expenseCategory: true },
    where: { yearWorkId },
    orderBy: { createdAt: "desc" },
  });

  const years = await prismadb.yearWork.findMany({
    where: {
      id: {
        not: yearWorkId,
      },
    },
  });

  const formattedExpenses: ExpenseColumn[] = expenses.map(
    ({
      comments,
      description,
      estimatedUnits,
      expenseCategory,
      id,
      paid,
      previousYearWorkUnits,
      title,
      total,
      unitPrice,
      units,
      yearWork,
    }) => ({
      category: expenseCategory,
      comments,
      description,
      estimatedUnits,
      id,
      paid,
      previousYearWorkUnits,
      title,
      total,
      unitPrice,
      units,
      yearWork,
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ExpensesClient expenses={formattedExpenses} years={years} />
      </div>
    </div>
  );
}
