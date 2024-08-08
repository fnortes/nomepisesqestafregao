"use client";

import Heading from "@/components/heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Calculator, ChevronsUpDown } from "lucide-react";
import { GeneralExpense } from "../common.types";
import { DashboardPlasticColumn, columns } from "./columns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface Props {
  readonly expenses: GeneralExpense[];
  readonly totalCost: number;
  readonly totalPlasticExpensesByAdult: number;
  readonly totalPlasticExpensesByAdultAndChild: number;
}

export default function DashboardPlastic({
  expenses,
  totalCost,
  totalPlasticExpensesByAdult,
  totalPlasticExpensesByAdultAndChild,
}: Props) {
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
    <Collapsible>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen del pedido de plástico"
          title={`Plástico (${expenses.length})`}
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
          pageSize={999}
          searchConfig={{
            searchFields: [],
          }}
          id="dashboardPlastic"
          printableConfig={{ pdf: true, orientation: "l" }}
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <Alert>
            <Calculator className="h-4 w-4" />
            <AlertTitle className="text-red-700">
              {formatCurrency(totalCost)}
            </AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground">
              Total a pagar del pedido de plástico.
            </AlertDescription>
          </Alert>
          <Alert>
            <Calculator className="h-4 w-4" />
            <AlertTitle className="text-green-700">
              {formatCurrency(totalPlasticExpensesByAdult)}
            </AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground">
              Coste por persona (contando sólo a adultos).
            </AlertDescription>
          </Alert>
          <Alert>
            <Calculator className="h-4 w-4" />
            <AlertTitle className="text-green-700">
              {formatCurrency(totalPlasticExpensesByAdultAndChild)}
            </AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground">
              Coste por persona (contando sólo a adultos y niños con cuota).
            </AlertDescription>
          </Alert>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
