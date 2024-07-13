import { format } from "date-fns";

import { DATE_TIME_FORMAT } from "@/constants/date";
import prismadb from "@/lib/prismadb";
import SaleCategoriesClient from "./components/sale-categories-client";

import type { SaleCategoryColumn } from "./components/columns";

export default async function SaleCategoriesPage() {
  const saleCategories = await prismadb.saleCategory.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formattedSaleCategories: SaleCategoryColumn[] = saleCategories.map(
    ({ comments, createdAt, id, name, updatedAt }) => ({
      comments,
      createdAt: format(createdAt, DATE_TIME_FORMAT),
      id,
      name,
      updatedAt: format(updatedAt, DATE_TIME_FORMAT),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SaleCategoriesClient saleCategories={formattedSaleCategories} />
      </div>
    </div>
  );
}
