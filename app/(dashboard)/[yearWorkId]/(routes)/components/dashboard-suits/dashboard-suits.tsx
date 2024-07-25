"use client";

import Heading from "@/components/heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Calculator, ChevronsUpDown } from "lucide-react";
import { GeneralClient } from "../common.types";
import { DashboardSuitsColumn, columns } from "./columns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface Props {
  readonly clients: GeneralClient[];
  readonly dashboardData: DashboardSuitsColumn[];
  readonly mediumCostAdultSuit: number;
  readonly mediumCostBabySuit: number;
  readonly mediumCostChildSuit: number;
  readonly mediumCostTeenSuit: number;
  readonly totalSuitsToPaid: number;
}

export default function DashboardSuits({
  clients,
  dashboardData,
  mediumCostAdultSuit,
  mediumCostBabySuit,
  mediumCostChildSuit,
  mediumCostTeenSuit,
  totalSuitsToPaid,
}: Props) {
  return (
    <Collapsible>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen del pedido de los trajes del desfile de disfraces"
          title={`Desglose del pedido de los trajes para ${
            clients.filter((c) => c.priceType.paradeSuit).length
          } comparsistas`}
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
          id="dashboardSuits"
          printableConfig={{
            pdf: true,
            orientation: "l",
          }}
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <Alert>
            <Calculator className="h-4 w-4" />
            <AlertTitle className="text-red-700">
              {formatCurrency(totalSuitsToPaid)}
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
              {formatCurrency(mediumCostTeenSuit)}
            </AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground">
              Coste medio de traje para adolescentes.
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
      </CollapsibleContent>
    </Collapsible>
  );
}
