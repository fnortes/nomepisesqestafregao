import prismadb from "@/lib/prismadb";
import SaleForm from "./components/sale-form";
import MoneyCounterForm from "./components/money-counter-form";

interface Props {
  readonly params: {
    saleId: string;
    yearWorkId: string;
  };
}

export default async function SalePage({
  params: { saleId, yearWorkId },
}: Props) {
  const sale = await prismadb.sale.findUnique({
    where: {
      id: saleId,
    },
    include: { saleCategory: true },
  });

  const categories = await prismadb.saleCategory.findMany({
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
        <SaleForm
          initialData={sale}
          categories={categories}
          yearWork={yearWork}
        />
        <MoneyCounterForm />
      </div>
    </div>
  );
}
