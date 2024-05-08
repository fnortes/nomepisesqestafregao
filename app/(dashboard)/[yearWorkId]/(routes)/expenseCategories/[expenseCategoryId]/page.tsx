import prismadb from "@/lib/prismadb";
import ExpenseCategoryForm from "./components/expense-category-form";

interface Props {
  readonly params: {
    expenseCategoryId: string;
    yearWorkId: string;
  };
}

export default async function ExpenseCategoryPage({
  params: { expenseCategoryId, yearWorkId },
}: Props) {
  const expense = await prismadb.expenseCategory.findUnique({
    where: {
      id: expenseCategoryId,
    },
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
        <ExpenseCategoryForm initialData={expense} />
      </div>
    </div>
  );
}
