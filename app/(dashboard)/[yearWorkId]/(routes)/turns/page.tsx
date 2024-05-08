import { format } from "date-fns";

import { DATE_TIME_FORMAT } from "@/constants/date";
import prismadb from "@/lib/prismadb";
import TurnsClient from "./components/turns-client";

import type { TurnColumn } from "./components/columns";

interface Props {
  readonly params: {
    yearWorkId: string;
  };
}

export default async function TurnsPage({ params: { yearWorkId } }: Props) {
  const turns = await prismadb.turn.findMany({
    include: {
      barGroup: {
        include: {
          turns: true,
          clients: {
            include: {
              client: true,
            },
          },
        },
      },
    },
    where: { barGroup: { yearWorkId } },
    orderBy: { startDate: "asc" },
  });

  const formattedTurns: TurnColumn[] = turns.map(
    ({ id, createdAt, updatedAt, startDate, endDate, barGroup }) => ({
      id,
      createdAt: format(createdAt, DATE_TIME_FORMAT),
      updatedAt: format(updatedAt, DATE_TIME_FORMAT),
      startDate: format(startDate, DATE_TIME_FORMAT),
      endDate: format(endDate, DATE_TIME_FORMAT),
      barGroup,
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TurnsClient turns={formattedTurns} />
      </div>
    </div>
  );
}
