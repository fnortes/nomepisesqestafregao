import { format } from "date-fns";

import { DATE_FORMAT } from "@/constants/date";
import prismadb from "@/lib/prismadb";
import FoodsClient from "./components/foods-client";

import type { FoodColumn } from "./components/columns";

interface Props {
  readonly params: {
    yearWorkId: string;
  };
}

export default async function FoodsPage({ params: { yearWorkId } }: Props) {
  const foods = await prismadb.food.findMany({
    where: { yearWorkId },
    orderBy: { date: "asc" },
  });

  const formattedFoods: FoodColumn[] = foods.map(
    ({ comments, description, date, id, paid, price, title }) => ({
      comments: comments ?? "",
      date: format(date, DATE_FORMAT),
      description: description ?? "",
      id,
      paid,
      price,
      title,
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FoodsClient foods={formattedFoods} />
      </div>
    </div>
  );
}
