"use client";

import Heading from "@/components/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { AgeGroup, Expense, Food } from "@prisma/client";
import { GeneralClient, GeneralExpense } from "../common.types";
import { DashboardPlasticColumn, columns } from "./columns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calculator } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Props {
  readonly expenses: GeneralExpense[];
}

export default function DashboardChairs({ expenses }: Props) {
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

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen del pedido de mesas y sillas"
          title={`Desglose del alquiler de mesas y sillas (${expenses.length})`}
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
          Total a pagar del alquiler de mesas y sillas.
        </AlertDescription>
      </Alert>
    </>
  );
}
