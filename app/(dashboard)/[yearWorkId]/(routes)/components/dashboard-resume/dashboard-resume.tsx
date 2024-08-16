"use client";

import Heading from "@/components/heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { YearWork } from "@prisma/client";
import { Calculator, CopyMinus, Wallet } from "lucide-react";
import { GeneralClient } from "../common.types";
import {
  calculateTotalClientsCurrentPaid,
  calculateTotalClientsToPaid,
} from "../common.utils";

interface Props {
  readonly clients: GeneralClient[];
  readonly totalAppetizersExpensesCurrentPaid: number;
  readonly totalAppetizersExpensesToPaid: number;
  readonly totalChairsExpensesCurrentPaid: number;
  readonly totalChairsExpensesToPaid: number;
  readonly totalDrinksExpensesCurrentPaid: number;
  readonly totalDrinksExpensesToPaid: number;
  readonly totalFoodsCurrentPaid: number;
  readonly totalFoodsToPaid: number;
  readonly totalPlasticExpensesCurrentPaid: number;
  readonly totalPlasticExpensesToPaid: number;
  readonly totalSalesBenefits: number;
  readonly totalSuitsCurrentPaid: number;
  readonly totalSuitsToPaid: number;
  readonly totalVariousExpensesCurrentPaid: number;
  readonly totalVariousExpensesToPaid: number;
  readonly yearWork: YearWork;
}

export default function DashboardResume({
  clients,
  totalAppetizersExpensesCurrentPaid,
  totalAppetizersExpensesToPaid,
  totalChairsExpensesCurrentPaid,
  totalChairsExpensesToPaid,
  totalDrinksExpensesCurrentPaid,
  totalDrinksExpensesToPaid,
  totalFoodsToPaid,
  totalPlasticExpensesCurrentPaid,
  totalPlasticExpensesToPaid,
  totalSalesBenefits,
  totalSuitsCurrentPaid,
  totalSuitsToPaid,
  totalVariousExpensesCurrentPaid,
  totalVariousExpensesToPaid,
  yearWork,
  totalFoodsCurrentPaid,
}: Props) {
  const totalClientsToPaid = calculateTotalClientsToPaid(clients, yearWork);
  const totalClientsCurrentPaid = calculateTotalClientsCurrentPaid(clients);

  const costsToPaid =
    totalAppetizersExpensesToPaid +
    totalChairsExpensesToPaid +
    totalDrinksExpensesToPaid +
    totalPlasticExpensesToPaid +
    totalVariousExpensesToPaid +
    totalFoodsToPaid +
    totalSuitsToPaid;

  const totalToPaid =
    totalClientsToPaid -
    costsToPaid +
    yearWork.previousYearWorkAmount +
    yearWork.commissionHelp +
    yearWork.awardsReward +
    totalSalesBenefits;

  const costsCurrentPaid =
    totalAppetizersExpensesCurrentPaid +
    totalChairsExpensesCurrentPaid +
    totalDrinksExpensesCurrentPaid +
    totalPlasticExpensesCurrentPaid +
    totalSuitsCurrentPaid +
    totalVariousExpensesCurrentPaid +
    totalFoodsCurrentPaid;

  const totalCurrentPaidWithPreviousYearWorkAmount =
    totalClientsCurrentPaid -
    costsCurrentPaid +
    yearWork.previousYearWorkAmount;

  const totalCurrentPaidWithSales =
    totalCurrentPaidWithPreviousYearWorkAmount + totalSalesBenefits;

  const totalCurrentPaidWithAwardsReward =
    totalCurrentPaidWithSales + yearWork.awardsReward;

  const totalCurrentPaidWithCommissionHelp =
    totalCurrentPaidWithAwardsReward + yearWork.commissionHelp;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen de gastos e ingresos auto-calculados para el año de trabajo seleccionado"
          title="Desglose ingresos y gastos"
        />
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertTitle className="text-green-500">
            {formatCurrency(totalClientsToPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad total de dinero estimada para ser ingresada por los
            comparsistas, que es la suma de la cuota que le pertenece pagar a
            cada uno (según su tipo de cuota), más el dinero extra que se estima
            debe pagar por comidas sueltas.
          </AlertDescription>
        </Alert>
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertTitle className="text-green-500">
            {formatCurrency(totalClientsCurrentPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad total real de dinero pagada hasta la fecha por los
            comparsista.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            {formatCurrency(costsToPaid)} (Varios:{" "}
            {formatCurrency(totalVariousExpensesToPaid)}, Plástico:{" "}
            {formatCurrency(totalPlasticExpensesToPaid)}, Sillas y mesas:{" "}
            {formatCurrency(totalChairsExpensesToPaid)}, Comidas:{" "}
            {formatCurrency(totalFoodsToPaid)}, Aperitivos y postres:{" "}
            {formatCurrency(totalAppetizersExpensesToPaid)}, Trajes:{" "}
            {formatCurrency(totalSuitsToPaid)}, Bebida:{" "}
            {formatCurrency(totalDrinksExpensesToPaid)})
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad total estimada de todos los gastos de la comparsa.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            {formatCurrency(costsCurrentPaid)} (Varios:{" "}
            {formatCurrency(totalVariousExpensesCurrentPaid)}, Plástico:{" "}
            {formatCurrency(totalPlasticExpensesCurrentPaid)}, Sillas y mesas:{" "}
            {formatCurrency(totalChairsExpensesCurrentPaid)}, Comidas:{" "}
            {formatCurrency(totalFoodsCurrentPaid)}, Aperitivos y postres:{" "}
            {formatCurrency(totalAppetizersExpensesCurrentPaid)}, Trajes:{" "}
            {formatCurrency(totalSuitsCurrentPaid)}, Bebida:{" "}
            {formatCurrency(totalDrinksExpensesCurrentPaid)})
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad total real pagada hasta la fecha de todos los gastos de la
            comparsa.
          </AlertDescription>
        </Alert>
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertTitle className="text-green-500">
            {formatCurrency(yearWork.previousYearWorkAmount)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad total de dinero sobrante o disponible del año anterior al
            actual.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-gray-700">
            {formatCurrency(totalCurrentPaidWithPreviousYearWorkAmount)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total real calculado teniendo en cuenta el dinero sobrante del año
            anterior.
          </AlertDescription>
        </Alert>
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertTitle className="text-green-500">
            {formatCurrency(totalSalesBenefits)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad de dinero que hemos obtenido de beneficio de todas las
            ventas realizadas.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-gray-700">
            {formatCurrency(totalCurrentPaidWithSales)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total real calculado a partir del total actual anterior más las
            ventas realizadas.
          </AlertDescription>
        </Alert>
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertTitle className="text-green-500">
            {formatCurrency(yearWork.awardsReward)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad de dinero que hemos recibido por parte de los premios
            ganados.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-gray-700">
            {formatCurrency(totalCurrentPaidWithAwardsReward)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total real calculado a partir del total actual anterior más la
            cantidad de premios recibidos.
          </AlertDescription>
        </Alert>
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertTitle className="text-green-500">
            {formatCurrency(yearWork.commissionHelp)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad de dinero que nos dará de subvención la comisión de
            fiestas.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-gray-700">
            {formatCurrency(totalCurrentPaidWithCommissionHelp)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total real calculado a partir del total actual anterior más la ayuda
            de la comisión.
          </AlertDescription>
        </Alert>
        <Separator className="col-span-2" />
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-gray-700">
            {formatCurrency(totalToPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total estimado calculado.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
