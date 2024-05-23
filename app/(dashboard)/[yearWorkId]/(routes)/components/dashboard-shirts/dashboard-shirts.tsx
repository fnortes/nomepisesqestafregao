"use client";

import Heading from "@/components/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { GeneralClient } from "../common.types";
import { DashboardShirtsColumn, columns } from "./columns";
import {
  DashboardType,
  clientMapperToDashboard,
} from "../dashboard-clients/dashboard-clients.constants";
import { AgeGroup } from "@prisma/client";

interface Props {
  readonly clients: GeneralClient[];
}

export default function DashboardShirts({ clients }: Props) {
  const dashboardData: DashboardShirtsColumn[] = [
    {
      type: DashboardType.MAN,
      M_6: [],
      A_2: [],
      A_3_4: [],
      A_6: [],
      A_8: [],
      A_12: [],
      A_16: [],
      S: [],
      M: [],
      L: [],
      XL: [],
      XXL: [],
      XXXL: [],
      resume: 0,
    },
    {
      type: DashboardType.WOMAN,
      M_6: [],
      A_2: [],
      A_3_4: [],
      A_6: [],
      A_8: [],
      A_12: [],
      A_16: [],
      S: [],
      M: [],
      L: [],
      XL: [],
      XXL: [],
      XXXL: [],
      resume: 0,
    },
    {
      type: DashboardType.CHILDREN_WITH_QUOTA,
      M_6: [],
      A_2: [],
      A_3_4: [],
      A_6: [],
      A_8: [],
      A_12: [],
      A_16: [],
      S: [],
      M: [],
      L: [],
      XL: [],
      XXL: [],
      XXXL: [],
      resume: 0,
    },
    {
      type: DashboardType.GIRLS_WITH_QUOTA,
      M_6: [],
      A_2: [],
      A_3_4: [],
      A_6: [],
      A_8: [],
      A_12: [],
      A_16: [],
      S: [],
      M: [],
      L: [],
      XL: [],
      XXL: [],
      XXXL: [],
      resume: 0,
    },
    {
      type: DashboardType.CHILDREN_HALF_PORTION_WITH_QUOTA,
      M_6: [],
      A_2: [],
      A_3_4: [],
      A_6: [],
      A_8: [],
      A_12: [],
      A_16: [],
      S: [],
      M: [],
      L: [],
      XL: [],
      XXL: [],
      XXXL: [],
      resume: 0,
    },
    {
      type: DashboardType.GIRLS_HALF_PORTION_WITH_QUOTA,
      M_6: [],
      A_2: [],
      A_3_4: [],
      A_6: [],
      A_8: [],
      A_12: [],
      A_16: [],
      S: [],
      M: [],
      L: [],
      XL: [],
      XXL: [],
      XXXL: [],
      resume: 0,
    },
    {
      type: DashboardType.CHILDREN_WITHOUT_QUOTA,
      M_6: [],
      A_2: [],
      A_3_4: [],
      A_6: [],
      A_8: [],
      A_12: [],
      A_16: [],
      S: [],
      M: [],
      L: [],
      XL: [],
      XXL: [],
      XXXL: [],
      resume: 0,
    },
    {
      type: DashboardType.GIRLS_WITHOUT_QUOTA,
      M_6: [],
      A_2: [],
      A_3_4: [],
      A_6: [],
      A_8: [],
      A_12: [],
      A_16: [],
      S: [],
      M: [],
      L: [],
      XL: [],
      XXL: [],
      XXXL: [],
      resume: 0,
    },
    {
      type: DashboardType.ALL,
      M_6: [],
      A_2: [],
      A_3_4: [],
      A_6: [],
      A_8: [],
      A_12: [],
      A_16: [],
      S: [],
      M: [],
      L: [],
      XL: [],
      XXL: [],
      XXXL: [],
      resume: 0,
    },
  ];

  const updateDashboardItem = (client: GeneralClient, type: string) => {
    const item = dashboardData.find((d) => d.type === type);

    if (item && client.shirtSize) {
      const clientName = `${client.firstName} ${client.lastName}`;
      item[client.shirtSize].push(clientName);
      item.resume++;
    }
  };

  clients
    .filter(
      (client) =>
        client.priceType.paradeWater || client.ageGroup === AgeGroup.BABY
    )
    .forEach((client) => {
      updateDashboardItem(
        client,
        clientMapperToDashboard[client.ageGroup][client.gender]
      );
    });

  const totals = dashboardData.find((d) => d.type === DashboardType.ALL)!;
  dashboardData
    .filter((d) => d.type !== DashboardType.ALL)
    .forEach((d) => {
      totals.A_12 = totals.A_12.concat(d.A_12);
      totals.A_16 = totals.A_16.concat(d.A_16);
      totals.A_2 = totals.A_2.concat(d.A_2);
      totals.A_3_4 = totals.A_3_4.concat(d.A_3_4);
      totals.A_6 = totals.A_6.concat(d.A_6);
      totals.A_8 = totals.A_8.concat(d.A_8);
      totals.L = totals.L.concat(d.L);
      totals.M = totals.M.concat(d.M);
      totals.M_6 = totals.M_6.concat(d.M_6);
      totals.S = totals.S.concat(d.S);
      totals.XL = totals.XL.concat(d.XL);
      totals.XXL = totals.XXL.concat(d.XXL);
      totals.XXXL = totals.XXXL.concat(d.XXXL);
      totals.resume += d.resume;
    });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen de camisetas de todas la comparsa para el año de trabajo seleccionado"
          title={`Desglose camisetas (${dashboardData
            .map((d) => d.resume)
            .reduce((a, b) => a + b, 0)})`}
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
