"use client";

import Heading from "@/components/heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Calculator } from "lucide-react";
import { GeneralExpense } from "../common.types";
import { DashboardAppetizersColumn, columns } from "./columns";

interface Props {
  readonly expenses: GeneralExpense[];
  readonly totalAppetizersExpensesByAdult: number;
  readonly totalAppetizersExpensesByAdultAndChild: number;
  readonly totalCost: number;
}

export default function DashboardAppetizers({
  expenses,
  totalAppetizersExpensesByAdult,
  totalCost,
  totalAppetizersExpensesByAdultAndChild,
}: Props) {
  const dashboardData: DashboardAppetizersColumn[] = expenses.map(
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
          description="Ver el resumen del pedido de aperitivos y postres"
          title={`Desglose del pedido de aperitivos y postres (${expenses.length})`}
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
            {formatCurrency(totalAppetizersExpensesByAdult)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Coste por persona (contando sólo a adultos).
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-green-700">
            {formatCurrency(totalAppetizersExpensesByAdultAndChild)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Coste por persona (contando sólo a adultos y niños con cuota).
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
