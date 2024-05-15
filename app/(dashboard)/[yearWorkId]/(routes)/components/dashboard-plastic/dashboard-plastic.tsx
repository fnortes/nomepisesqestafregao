"use client";

import Heading from "@/components/heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { AgeGroup } from "@prisma/client";
import { Calculator } from "lucide-react";
import { GeneralClient, GeneralExpense } from "../common.types";
import { DashboardPlasticColumn, columns } from "./columns";

interface Props {
  readonly expenses: GeneralExpense[];
  readonly clients: GeneralClient[];
}

export default function DashboardPlastic({ expenses, clients }: Props) {
  const dashboardData: DashboardPlasticColumn[] = expenses.map(
    ({
      comments,
      description,
      expenseCategory,
      estimatedUnits,
      paid,
      previousYearWorkUnits,
      title,
      total,
      unitPrice,
      units,
    }) => {
      return {
        comments,
        description,
        category: expenseCategory,
        estimatedUnits,
        paid,
        previousYearWorkUnits,
        title,
        total,
        unitPrice,
        units,
      };
    }
  );

  const totalPlasticCost = dashboardData
    .map((d) => d.total)
    .reduce((a, b) => a + b, 0);

  const costByAdult =
    totalPlasticCost /
    clients.filter((c) => c.ageGroup === AgeGroup.ADULT).length;

  const costByAdultAndChild =
    totalPlasticCost /
    clients.filter(
      (c) => c.ageGroup === AgeGroup.ADULT || c.ageGroup === AgeGroup.CHILD
    ).length;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen del pedido de plástico"
          title={`Desglose del pedido de plástico (${expenses.length})`}
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
            {formatCurrency(totalPlasticCost)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total a pagar del pedido de plástico.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-green-700">
            {formatCurrency(costByAdult)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Coste por persona (contando sólo a adultos).
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-green-700">
            {formatCurrency(costByAdultAndChild)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Coste por persona (contando sólo a adultos y niños con cuota).
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}