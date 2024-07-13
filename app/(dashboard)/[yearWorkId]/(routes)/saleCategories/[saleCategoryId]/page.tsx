import prismadb from "@/lib/prismadb";
import SaleCategoryForm from "./components/sale-category-form";

interface Props {
  readonly params: {
    saleCategoryId: string;
    yearWorkId: string;
  };
}

export default async function SaleCategoryPage({
  params: { saleCategoryId, yearWorkId },
}: Props) {
  const saleCategories = await prismadb.saleCategory.findUnique({
    where: {
      id: saleCategoryId,
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
        <SaleCategoryForm initialData={saleCategories} />
      </div>
    </div>
  );
}
