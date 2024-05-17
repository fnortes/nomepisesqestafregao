"use client";

import Heading from "@/components/heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Calculator } from "lucide-react";
import { GeneralExpense } from "../common.types";
import { DashboardSuitsColumn, columns } from "./columns";

interface Props {
  readonly expenses: GeneralExpense[];
  readonly totalCost: number;
}

export default function DashboardSuits({ expenses, totalCost }: Props) {
  let suitAdultClientPrice = 0;
  let suitAdultClientUnits = 0;
  let suitChildClientPrice = 0;
  let suitChildClientUnits = 0;
  let suitBabyClientPrice = 0;
  let suitBabyClientUnits = 0;

  const dashboardData: DashboardSuitsColumn[] = expenses.map(
    ({ comments, description, paid, title, total, unitPrice, units }) => {
      switch (title.substring(0, 5)) {
        case "Bebés":
          suitBabyClientPrice += total;
          suitBabyClientUnits += units;
          break;
        case "Niñas":
        case "Niños":
          suitChildClientPrice += total;
          suitChildClientUnits += units;
          break;
        case "Chico":
        case "Chica":
          suitAdultClientPrice += total;
          suitAdultClientUnits += units;
          break;
      }

      return {
        comments,
        description,
        paid,
        title,
        total,
        unitPrice,
        units,
      };
    }
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen del pedido de los trajes del desfile de disfraces"
          title={`Desglose del pedido de los trajes (${expenses.length})`}
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
            {formatCurrency(totalCost)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total a pagar del pedido de aperitivos y postres.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-green-700">
            {formatCurrency(suitAdultClientPrice / suitAdultClientUnits)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Coste medio de traje para adultos.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-green-700">
            {formatCurrency(suitChildClientPrice / suitChildClientUnits)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Coste medio de traje para niños.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-green-700">
            {formatCurrency(suitBabyClientPrice / suitBabyClientUnits)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Coste medio de traje para bebés.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
