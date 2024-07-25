import prismadb from "@/lib/prismadb";
import SuitsClient from "./components/suits-client";

import type { SuitColumn } from "./components/columns";

interface Props {
  readonly params: {
    yearWorkId: string;
  };
}

export default async function SuitsPage({ params: { yearWorkId } }: Props) {
  const suits = await prismadb.suit.findMany({
    where: { yearWorkId },
    orderBy: { createdAt: "asc" },
  });

  const formattedSuits: SuitColumn[] = suits.map(
    ({
      ageGroup,
      comments,
      gender,
      id,
      paid,
      suitGroup,
      total,
      unitPrice,
      units,
    }) => ({
      ageGroup,
      comments: comments ?? "",
      gender,
      id,
      paid,
      suitGroup,
      total,
      unitPrice,
      units,
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SuitsClient suits={formattedSuits} />
      </div>
    </div>
  );
}
