"use client";

import Heading from "@/components/heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Calculator, ChevronsUpDown } from "lucide-react";
import {
  EXTRA_DRINK_COST_BY_CLIENT_AND_FOOD,
  EXTRA_PLASTIC_COST_BY_CLIENT_AND_FOOD,
} from "../common.constants";
import { GeneralClient } from "../common.types";
import { DashboardFoodsColumn, columns } from "./columns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface Props {
  readonly allFoodsCostByClient: number;
  readonly allFoodsCostByClientWithExtra: number;
  readonly clients: GeneralClient[];
  readonly dashboardData: DashboardFoodsColumn[];
  readonly mediumPriceByClientAndFood: number;
  readonly totalFoodsToPaid: number;
}

export default function DashboardFoods({
  allFoodsCostByClient,
  allFoodsCostByClientWithExtra,
  clients,
  dashboardData,
  mediumPriceByClientAndFood,
  totalFoodsToPaid,
}: Props) {
  return (
    <Collapsible>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen de todas las comidas, con la agenda de quienes vienen a cada una de ellas"
          title={`Comidas para ${clients.length} comparsistas`}
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
          id="dashboardFoods"
          pageSize={999}
          printableConfig={{
            pdf: true,
            orientation: "l",
          }}
          searchConfig={{ searchFields: [] }}
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <Alert>
            <Calculator className="h-4 w-4" />
            <AlertTitle className="text-red-700">
              {formatCurrency(totalFoodsToPaid)}
            </AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground">
              Total a pagar por las comidas.
            </AlertDescription>
          </Alert>
          <Alert>
            <Calculator className="h-4 w-4" />
            <AlertTitle className="text-green-700">
              {formatCurrency(allFoodsCostByClient)} (50% Ración{" "}
              {formatCurrency(allFoodsCostByClient * 0.5)})
            </AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground">
              Coste de todas las comidas por persona (Sólo precio menú).
            </AlertDescription>
          </Alert>
          <Alert>
            <Calculator className="h-4 w-4" />
            <AlertTitle className="text-green-700">
              {formatCurrency(allFoodsCostByClientWithExtra)} (50% Ración{" "}
              {formatCurrency(allFoodsCostByClientWithExtra * 0.5)})
            </AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground">
              Coste de todas las comidas por persona (incluyendo extra de bebida{" "}
              {formatCurrency(EXTRA_DRINK_COST_BY_CLIENT_AND_FOOD)} y extra de
              plástico {formatCurrency(EXTRA_PLASTIC_COST_BY_CLIENT_AND_FOOD)}).
            </AlertDescription>
          </Alert>
          <Alert>
            <Calculator className="h-4 w-4" />
            <AlertTitle className="text-green-700">
              {formatCurrency(mediumPriceByClientAndFood)}
            </AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground">
              Precio medio por persona y comida (teniendo en cuenta los extras).
            </AlertDescription>
          </Alert>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
