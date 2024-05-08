import prismadb from "@/lib/prismadb";
import ExpenseForm from "./components/expense-form";

interface Props {
  readonly params: {
    expenseId: string;
    yearWorkId: string;
  };
}

export default async function ExpensePage({
  params: { expenseId, yearWorkId },
}: Props) {
  const expense = await prismadb.expense.findUnique({
    where: {
      id: expenseId,
    },
    include: { expenseCategory: true },
  });

  const categories = await prismadb.expenseCategory.findMany({
    orderBy: { name: "asc" },
  });

  const yearWork = await prismadb.yearWork.findFirst({
    where: { id: yearWorkId },
  });

  if (!yearWork) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ExpenseForm
          initialData={expense}
          categories={categories}
          yearWork={yearWork}
        />
      </div>
    </div>
  );
}
