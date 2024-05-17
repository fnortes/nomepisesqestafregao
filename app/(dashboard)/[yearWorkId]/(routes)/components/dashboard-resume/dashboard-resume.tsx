"use client";

import Heading from "@/components/heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Expense, Food, YearWork } from "@prisma/client";
import { Calculator, CopyMinus, Wallet } from "lucide-react";
import { GeneralClient } from "../common.types";
import {
  calculateTotalClientsCurrentPaid,
  calculateTotalClientsToPaid,
  calculateTotalExpensesCurrentPaid,
  calculateTotalExpensesToPaid,
  calculateTotalFoodsCurrentPaid,
  calculateTotalFoodsToPaid,
} from "../common.utils";

interface Props {
  readonly clients: GeneralClient[];
  readonly expenses: Expense[];
  readonly foods: Food[];
  readonly totalAppetizersExpensesToPaid: number;
  readonly totalChairsExpensesToPaid: number;
  readonly totalDrinksExpensesToPaid: number;
  readonly totalPlasticExpensesToPaid: number;
  readonly totalSuitsExpensesToPaid: number;
  readonly totalVariousExpensesToPaid: number;
  readonly totalAppetizersExpensesCurrentPaid: number;
  readonly totalChairsExpensesCurrentPaid: number;
  readonly totalDrinksExpensesCurrentPaid: number;
  readonly totalPlasticExpensesCurrentPaid: number;
  readonly totalSuitsExpensesCurrentPaid: number;
  readonly totalVariousExpensesCurrentPaid: number;
  readonly yearWork: YearWork;
}

export default function DashboardResume({
  clients,
  expenses,
  foods,
  totalAppetizersExpensesToPaid,
  totalChairsExpensesToPaid,
  totalDrinksExpensesToPaid,
  totalPlasticExpensesToPaid,
  totalSuitsExpensesToPaid,
  totalVariousExpensesToPaid,
  totalAppetizersExpensesCurrentPaid,
  totalChairsExpensesCurrentPaid,
  totalDrinksExpensesCurrentPaid,
  totalPlasticExpensesCurrentPaid,
  totalSuitsExpensesCurrentPaid,
  totalVariousExpensesCurrentPaid,
  yearWork,
}: Props) {
  const totalClientsToPaid = calculateTotalClientsToPaid(clients, yearWork);
  const totalClientsCurrentPaid = calculateTotalClientsCurrentPaid(clients);
  const totalExpensesToPaid = calculateTotalExpensesToPaid(expenses);
  const totalExpensesCurrentPaid = calculateTotalExpensesCurrentPaid(expenses);
  const totalFoodsToPaid = calculateTotalFoodsToPaid(foods, clients);
  const totalFoodsCurrentPaid = calculateTotalFoodsCurrentPaid(foods);

  const totalToPaid =
    totalClientsToPaid -
    (totalExpensesToPaid + totalFoodsToPaid) +
    yearWork.previousYearWorkAmount +
    yearWork.commissionHelp +
    yearWork.awardsReward;

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
            {formatCurrency(totalExpensesToPaid + totalFoodsToPaid)} (Varios:{" "}
            {formatCurrency(totalVariousExpensesToPaid)}, Plástico:{" "}
            {formatCurrency(totalPlasticExpensesToPaid)}, Sillas y mesas:{" "}
            {formatCurrency(totalChairsExpensesToPaid)}, Comidas:{" "}
            {formatCurrency(totalFoodsToPaid)}, Aperitivos y postres:{" "}
            {formatCurrency(totalAppetizersExpensesToPaid)}, Trajes:{" "}
            {formatCurrency(totalSuitsExpensesToPaid)}, Bebida:{" "}
            {formatCurrency(totalDrinksExpensesToPaid)})
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad total estimada de todos los gastos de la comparsa.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            {formatCurrency(totalExpensesCurrentPaid + totalFoodsCurrentPaid)}{" "}
            (Varios: {formatCurrency(totalVariousExpensesCurrentPaid)},
            Plástico: {formatCurrency(totalPlasticExpensesCurrentPaid)}, Sillas
            y mesas: {formatCurrency(totalChairsExpensesCurrentPaid)}, Comidas:{" "}
            {formatCurrency(totalFoodsCurrentPaid)}, Aperitivos y postres:{" "}
            {formatCurrency(totalAppetizersExpensesCurrentPaid)}, Trajes:{" "}
            {formatCurrency(totalSuitsExpensesCurrentPaid)}, Bebida:{" "}
            {formatCurrency(totalDrinksExpensesCurrentPaid)})
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad total real pagada hasta la fecha de todos los gastos de la
            comparsa.
          </AlertDescription>
        </Alert>
      </div>
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
        <Wallet className="h-4 w-4" />
        <AlertTitle className="text-green-500">
          {formatCurrency(yearWork.commissionHelp)}
        </AlertTitle>
        <AlertDescription className="text-sm text-muted-foreground">
          Cantidad de dinero que nos da de subvención la comisión de fiestas
          para el año de trabajo seleccionado.
        </AlertDescription>
      </Alert>
      <Alert>
        <Wallet className="h-4 w-4" />
        <AlertTitle className="text-green-500">
          {formatCurrency(yearWork.awardsReward)}
        </AlertTitle>
        <AlertDescription className="text-sm text-muted-foreground">
          Cantidad de dinero que hemos recibido por parte de los premios ganados
          en el año de trabajo seleccionado.
        </AlertDescription>
      </Alert>
      <Separator />
      <Alert>
        <Calculator className="h-4 w-4" />
        <AlertTitle className="text-gray-700">
          {formatCurrency(totalToPaid)}
        </AlertTitle>
        <AlertDescription className="text-sm text-muted-foreground">
          Total calculado.
        </AlertDescription>
      </Alert>
    </>
  );
}
