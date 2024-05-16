import prismadb from "@/lib/prismadb";
import PriceTypesClient from "./components/price-types-client";

import type { PriceTypeColumn } from "./components/columns";

interface Props {
  readonly params: {
    yearWorkId: string;
  };
}

export default async function PriceTypesPage({
  params: { yearWorkId },
}: Props) {
  const priceTypes = await prismadb.priceType.findMany({
    where: { yearWorkId },
    orderBy: { createdAt: "desc" },
  });

  const formattedPriceTypes: PriceTypeColumn[] = priceTypes.map(
    ({
      adultPrice,
      babyPrice,
      childHalfPortionPrice,
      childPrice,
      dinners,
      drinkTickets,
      id,
      meals,
      name,
      paradeSuit,
      paradeWater,
    }) => ({
      adultPrice,
      babyPrice,
      childHalfPortionPrice,
      childPrice,
      dinners,
      drinkTickets,
      id,
      meals,
      name,
      paradeSuit,
      paradeWater,
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PriceTypesClient priceTypes={formattedPriceTypes} />
      </div>
    </div>
  );
}
