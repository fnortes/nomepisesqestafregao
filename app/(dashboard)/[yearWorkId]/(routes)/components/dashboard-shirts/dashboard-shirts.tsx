"use client";

import Heading from "@/components/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { GeneralClient } from "../common.types";
import { DashboardShirtsColumn, columns } from "./columns";
import {
  DashboardType,
  clientMapperToDashboard,
} from "./dashboard-shirts.constants";

interface Props {
  readonly clients: GeneralClient[];
}

export default function DashboardShirts({ clients }: Props) {
  const dashboardData: DashboardShirtsColumn[] = [
    {
      type: DashboardType.MAN,
      M_6: 0,
      A_2: 0,
      A_3_4: 0,
      A_6: 0,
      A_8: 0,
      A_12: 0,
      A_16: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
      XXXL: 0,
      resume: 0,
    },
    {
      type: DashboardType.WOMAN,
      M_6: 0,
      A_2: 0,
      A_3_4: 0,
      A_6: 0,
      A_8: 0,
      A_12: 0,
      A_16: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
      XXXL: 0,
      resume: 0,
    },
    {
      type: DashboardType.CHILDREN_WITH_QUOTA,
      M_6: 0,
      A_2: 0,
      A_3_4: 0,
      A_6: 0,
      A_8: 0,
      A_12: 0,
      A_16: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
      XXXL: 0,
      resume: 0,
    },
    {
      type: DashboardType.GIRLS_WITH_QUOTA,
      M_6: 0,
      A_2: 0,
      A_3_4: 0,
      A_6: 0,
      A_8: 0,
      A_12: 0,
      A_16: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
      XXXL: 0,
      resume: 0,
    },
    {
      type: DashboardType.CHILDREN_WITHOUT_QUOTA,
      M_6: 0,
      A_2: 0,
      A_3_4: 0,
      A_6: 0,
      A_8: 0,
      A_12: 0,
      A_16: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
      XXXL: 0,
      resume: 0,
    },
    {
      type: DashboardType.GIRLS_WITHOUT_QUOTA,
      M_6: 0,
      A_2: 0,
      A_3_4: 0,
      A_6: 0,
      A_8: 0,
      A_12: 0,
      A_16: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
      XXXL: 0,
      resume: 0,
    },
  ];

  const updateDashboardItem = (client: GeneralClient, type: string) => {
    const item = dashboardData.find((d) => d.type === type);

    if (item && client.shirtSize) {
      item[client.shirtSize]++;
      item.resume++;
    }
  };

  clients
    .filter((client) => client.priceType.paradeWater)
    .forEach((client) => {
      updateDashboardItem(
        client,
        clientMapperToDashboard[client.ageGroup][client.gender]
      );
    });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen de camisetas de todas la comparsa para el año de trabajo seleccionado"
          title={`Desglose camisetas (${dashboardData
            .map((d) => d.resume)
            .reduce((a, b) => a + b)})`}
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
