import prismadb from "@/lib/prismadb";
import SalesClient from "./components/sales-client";

import { DATE_FORMAT } from "@/constants/date";
import { format } from "date-fns";
import type { SaleColumn } from "./components/columns";

interface Props {
  readonly params: {
    yearWorkId: string;
  };
}

export default async function SalesPage({ params: { yearWorkId } }: Props) {
  const sales = await prismadb.sale.findMany({
    include: { yearWork: true, saleCategory: true },
    where: { yearWorkId },
    orderBy: { createdAt: "desc" },
  });

  const formattedSales: SaleColumn[] = sales.map(
    ({
      benefitAmount,
      comments,
      date,
      finallyAmount,
      id,
      initialAmount,
      saleCategory,
      title,
      yearWork,
    }) => ({
      benefitAmount,
      comments,
      date: format(date, DATE_FORMAT),
      finallyAmount,
      id,
      initialAmount,
      category: saleCategory,
      title,
      yearWork,
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SalesClient sales={formattedSales} />
      </div>
    </div>
  );
}
