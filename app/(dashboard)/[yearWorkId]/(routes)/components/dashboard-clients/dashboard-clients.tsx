"use client";

import Heading from "@/components/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { CustomClient } from "../../clients/[clientId]/components/client-form.types";
import { GeneralClient } from "../common.types";
import { DashboardColumn, columns } from "./columns";
import {
  DashboardType,
  clientMapperToDashboard,
} from "./dashboard-clients.constants";

interface Props {
  readonly clients: GeneralClient[];
}

export default function DashboardClients({ clients }: Props) {
  const dashboardData: DashboardColumn[] = [
    {
      resume: 0,
      type: DashboardType.MAN,
      withBar: 0,
      withDinners: 0,
      withLaunches: 0,
      withSuits: 0,
      withWater: 0,
    },
    {
      resume: 0,
      type: DashboardType.WOMAN,
      withBar: 0,
      withDinners: 0,
      withLaunches: 0,
      withSuits: 0,
      withWater: 0,
    },
    {
      resume: 0,
      type: DashboardType.CHILDREN_WITH_QUOTA,
      withBar: 0,
      withDinners: 0,
      withLaunches: 0,
      withSuits: 0,
      withWater: 0,
    },
    {
      resume: 0,
      type: DashboardType.GIRLS_WITH_QUOTA,
      withBar: 0,
      withDinners: 0,
      withLaunches: 0,
      withSuits: 0,
      withWater: 0,
    },
    {
      resume: 0,
      type: DashboardType.CHILDREN_HALF_PORTION_WITH_QUOTA,
      withBar: 0,
      withDinners: 0,
      withLaunches: 0,
      withSuits: 0,
      withWater: 0,
    },
    {
      resume: 0,
      type: DashboardType.GIRLS_HALF_PORTION_WITH_QUOTA,
      withBar: 0,
      withDinners: 0,
      withLaunches: 0,
      withSuits: 0,
      withWater: 0,
    },
    {
      resume: 0,
      type: DashboardType.CHILDREN_WITHOUT_QUOTA,
      withBar: 0,
      withDinners: 0,
      withLaunches: 0,
      withSuits: 0,
      withWater: 0,
    },
    {
      resume: 0,
      type: DashboardType.GIRLS_WITHOUT_QUOTA,
      withBar: 0,
      withDinners: 0,
      withLaunches: 0,
      withSuits: 0,
      withWater: 0,
    },
    {
      resume: 0,
      type: DashboardType.ALL,
      withBar: 0,
      withDinners: 0,
      withLaunches: 0,
      withSuits: 0,
      withWater: 0,
    },
  ];

  const updateDashboardItem = (client: CustomClient, type: string) => {
    const item = dashboardData.find((d) => d.type === type);

    if (item) {
      item.withLaunches = client.priceType.meals
        ? item.withLaunches + 1
        : item.withLaunches;
      item.withDinners = client.priceType.dinners
        ? item.withDinners + 1
        : item.withDinners;
      item.withSuits = client.priceType.paradeSuit
        ? item.withSuits + 1
        : item.withSuits;
      item.withWater = client.priceType.paradeWater
        ? item.withWater + 1
        : item.withWater;
      item.withBar =
        client.barGroups.length > 0 ? item.withBar + 1 : item.withBar;
      item.resume++;
    }
  };

  clients.forEach((client) => {
    updateDashboardItem(
      client,
      clientMapperToDashboard[client.ageGroup][client.gender]
    );
  });

  const totals = dashboardData.find((d) => d.type === DashboardType.ALL)!;
  dashboardData
    .filter((d) => d.type !== DashboardType.ALL)
    .forEach((d) => {
      totals.withBar += d.withBar;
      totals.resume += d.resume;
      totals.withLaunches += d.withLaunches;
      totals.withDinners += d.withDinners;
      totals.withSuits += d.withSuits;
      totals.withWater += d.withWater;
    });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen de todos los comparsistas categorizados para el año de trabajo seleccionado"
          title={`Desglose comparsistas (${clients.length})`}
        />
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={dashboardData}
        searchConfig={{
          searchFields: [],
        }}
      />
    </>
  );
}
