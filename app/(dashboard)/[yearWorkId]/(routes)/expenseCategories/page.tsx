import { format } from "date-fns";

import { DATE_TIME_FORMAT } from "@/constants/date";
import prismadb from "@/lib/prismadb";
import ExpenseCategoriesClient from "./components/expense-categories-client";

import type { ExpenseCategoryColumn } from "./components/columns";

export default async function ExpenseCategoriesPage() {
  const expenses = await prismadb.expenseCategory.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formattedExpenseCategories: ExpenseCategoryColumn[] = expenses.map(
    ({
      comments,
      createdAt,
      family,
      id,
      name,
      previousYearWorkUnitsConsumed,
      updatedAt,
    }) => ({
      comments,
      createdAt: format(createdAt, DATE_TIME_FORMAT),
      family,
      id,
      name,
      previousYearWorkUnitsConsumed,
      updatedAt: format(updatedAt, DATE_TIME_FORMAT),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ExpenseCategoriesClient expenses={formattedExpenseCategories} />
      </div>
    </div>
  );
}
