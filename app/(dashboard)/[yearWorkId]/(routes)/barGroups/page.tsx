import { format } from "date-fns";

import { DATE_TIME_FORMAT } from "@/constants/date";
import prismadb from "@/lib/prismadb";
import BarGroupsClient from "./components/bar-groups-client";

import type { BarGroupColumn } from "./components/columns";

interface Props {
  readonly params: {
    yearWorkId: string;
  };
}

export default async function BarGroupsPage({ params: { yearWorkId } }: Props) {
  const barGroups = await prismadb.barGroup.findMany({
    where: { yearWorkId },
    include: {
      clients: {
        include: { client: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedBarGroups: BarGroupColumn[] = barGroups.map(
    ({ clients, id, name, createdAt, updatedAt }) => ({
      id,
      name,
      clients,
      createdAt: format(createdAt, DATE_TIME_FORMAT),
      updatedAt: format(updatedAt, DATE_TIME_FORMAT),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BarGroupsClient barGroups={formattedBarGroups} />
      </div>
    </div>
  );
}
