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
}

export default function DashboardSuits({ expenses }: Props) {
  const dashboardData: DashboardSuitsColumn[] = expenses.map(
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
      <Alert>
        <Calculator className="h-4 w-4" />
        <AlertTitle className="text-red-700">
          {formatCurrency(
            dashboardData.map((d) => d.total).reduce((a, b) => a + b)
          )}
        </AlertTitle>
        <AlertDescription className="text-sm text-muted-foreground">
          Total a pagar del pedido de aperitivos y postres.
        </AlertDescription>
      </Alert>
    </>
  );
}
