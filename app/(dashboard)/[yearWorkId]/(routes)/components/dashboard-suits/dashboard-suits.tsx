"use client";

import Heading from "@/components/heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { AgeGroup, Suit } from "@prisma/client";
import { Calculator } from "lucide-react";
import { GeneralClient } from "../common.types";
import { countClientsBySuit } from "../common.utils";
import { DashboardSuitsColumn, columns } from "./columns";

interface Props {
  readonly clients: GeneralClient[];
  readonly suits: Suit[];
}

export default function DashboardSuits({ clients, suits }: Props) {
  const dashboardData: DashboardSuitsColumn[] = suits.map((suit) => {
    const { ageGroup, gender, price } = suit;
    const totalClients = countClientsBySuit(clients, suit);

    return {
      ageGroup,
      gender,
      price,
      totalClients,
      totalPrice: totalClients * price,
    };
  });

  const allSuitsTotalCost = dashboardData
    .map((d) => d.totalPrice)
    .reduce((a, b) => a + b, 0);

  const adultSuits = dashboardData.filter((d) => d.ageGroup === AgeGroup.ADULT);
  const mediumCostAdultSuit =
    adultSuits.map((s) => s.totalPrice).reduce((a, b) => a + b, 0) /
    adultSuits.map((s) => s.totalClients).reduce((a, b) => a + b, 0);

  const childSuits = dashboardData.filter(
    (d) =>
      d.ageGroup === AgeGroup.CHILD ||
      d.ageGroup === AgeGroup.CHILD_HALF_PORTION
  );
  const mediumCostChildSuit =
    childSuits.map((s) => s.totalPrice).reduce((a, b) => a + b, 0) /
    childSuits.map((s) => s.totalClients).reduce((a, b) => a + b, 0);

  const babySuits = dashboardData.filter((d) => d.ageGroup === AgeGroup.BABY);
  const mediumCostBabySuit =
    babySuits.map((s) => s.totalPrice).reduce((a, b) => a + b, 0) /
    babySuits.map((s) => s.totalClients).reduce((a, b) => a + b, 0);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen del pedido de los trajes del desfile de disfraces"
          title={`Desglose del pedido de los trajes para ${
            clients.filter((c) => c.priceType.paradeSuit).length
          } comparsistas`}
        />
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={dashboardData}
        pageSize={999}
        searchConfig={{
          searchFields: [],
        }}
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            {formatCurrency(allSuitsTotalCost)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total a pagar del pedido de trajes.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-green-700">
            {formatCurrency(mediumCostAdultSuit)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Coste medio de traje para adultos.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-green-700">
            {formatCurrency(mediumCostChildSuit)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Coste medio de traje para niños.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-green-700">
            {formatCurrency(mediumCostBabySuit)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Coste medio de traje para bebés.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
