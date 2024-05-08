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
      type: DashboardType.MAN,
      withFoods: 0,
      withSuits: 0,
      withWater: 0,
      withBar: 0,
      resume: 0,
    },
    {
      type: DashboardType.WOMAN,
      withFoods: 0,
      withSuits: 0,
      withWater: 0,
      withBar: 0,
      resume: 0,
    },
    {
      type: DashboardType.CHILDREN_WITH_QUOTA,
      withFoods: 0,
      withSuits: 0,
      withWater: 0,
      withBar: 0,
      resume: 0,
    },
    {
      type: DashboardType.GIRLS_WITH_QUOTA,
      withFoods: 0,
      withSuits: 0,
      withWater: 0,
      withBar: 0,
      resume: 0,
    },
    {
      type: DashboardType.CHILDREN_WITHOUT_QUOTA,
      withFoods: 0,
      withSuits: 0,
      withWater: 0,
      withBar: 0,
      resume: 0,
    },
    {
      type: DashboardType.GIRLS_WITHOUT_QUOTA,
      withFoods: 0,
      withSuits: 0,
      withWater: 0,
      withBar: 0,
      resume: 0,
    },
  ];

  const updateDashboardItem = (client: CustomClient, type: string) => {
    const item = dashboardData.find((d) => d.type === type);

    if (item) {
      item.withFoods = client.priceType.meals
        ? item.withFoods + 1
        : item.withFoods;
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
