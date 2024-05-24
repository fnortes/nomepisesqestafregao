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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getClientName } from "../common.utils";

interface Props {
  readonly clients: GeneralClient[];
}

export default function DashboardClients({ clients }: Props) {
  const dashboardData: DashboardColumn[] = [
    {
      resume: 0,
      type: DashboardType.MAN,
      withBarList: [],
      withDinnersList: [],
      withLaunchesList: [],
      withSuitsList: [],
      withWaterList: [],
    },
    {
      resume: 0,
      type: DashboardType.WOMAN,
      withBarList: [],
      withDinnersList: [],
      withLaunchesList: [],
      withSuitsList: [],
      withWaterList: [],
    },
    {
      resume: 0,
      type: DashboardType.CHILDREN_WITH_QUOTA,
      withBarList: [],
      withDinnersList: [],
      withLaunchesList: [],
      withSuitsList: [],
      withWaterList: [],
    },
    {
      resume: 0,
      type: DashboardType.GIRLS_WITH_QUOTA,
      withBarList: [],
      withDinnersList: [],
      withLaunchesList: [],
      withSuitsList: [],
      withWaterList: [],
    },
    {
      resume: 0,
      type: DashboardType.CHILDREN_HALF_PORTION_WITH_QUOTA,
      withBarList: [],
      withDinnersList: [],
      withLaunchesList: [],
      withSuitsList: [],
      withWaterList: [],
    },
    {
      resume: 0,
      type: DashboardType.GIRLS_HALF_PORTION_WITH_QUOTA,
      withBarList: [],
      withDinnersList: [],
      withLaunchesList: [],
      withSuitsList: [],
      withWaterList: [],
    },
    {
      resume: 0,
      type: DashboardType.CHILDREN_WITHOUT_QUOTA,
      withBarList: [],
      withDinnersList: [],
      withLaunchesList: [],
      withSuitsList: [],
      withWaterList: [],
    },
    {
      resume: 0,
      type: DashboardType.GIRLS_WITHOUT_QUOTA,
      withBarList: [],
      withDinnersList: [],
      withLaunchesList: [],
      withSuitsList: [],
      withWaterList: [],
    },
    {
      resume: 0,
      type: DashboardType.ALL,
      withBarList: [],
      withDinnersList: [],
      withLaunchesList: [],
      withSuitsList: [],
      withWaterList: [],
    },
  ];

  const updateDashboardItem = (client: CustomClient, type: string) => {
    const item = dashboardData.find((d) => d.type === type);

    if (item) {
      const clientName = getClientName(client);

      if (client.priceType.meals) {
        item.withLaunchesList.push(clientName);
      }

      if (client.priceType.dinners) {
        item.withDinnersList.push(clientName);
      }

      if (client.priceType.paradeSuit) {
        item.withSuitsList.push(clientName);
      }

      if (client.priceType.paradeWater) {
        item.withWaterList.push(clientName);
      }

      if (client.barGroups.length > 0) {
        item.withBarList.push(clientName);
      }

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
      totals.resume += d.resume;
      totals.withBarList = totals.withBarList.concat(d.withBarList);
      totals.withLaunchesList = totals.withLaunchesList.concat(
        d.withLaunchesList
      );
      totals.withDinnersList = totals.withDinnersList.concat(d.withDinnersList);
      totals.withSuitsList = totals.withSuitsList.concat(d.withSuitsList);
      totals.withWaterList = totals.withWaterList.concat(d.withWaterList);
    });

  return (
    <Collapsible>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen de todos los comparsistas categorizados para el año de trabajo seleccionado"
          title={`Desglose comparsistas (${clients.length})`}
        />
        <CollapsibleTrigger>
          <Button size="icon" variant="outline">
            <ChevronsUpDown className="w-4 h-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <Separator />
        <DataTable
          columns={columns}
          data={dashboardData}
          searchConfig={{
            searchFields: [],
          }}
          id="dashboardClients"
          printableConfig={{
            pdf: true,
            orientation: "l",
          }}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
