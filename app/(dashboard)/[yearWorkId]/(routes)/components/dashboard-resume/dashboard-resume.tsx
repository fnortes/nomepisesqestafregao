"use client";

import Heading from "@/components/heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Sale, YearWork } from "@prisma/client";
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
  readonly sales: Sale[];
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
  sales,
  totalSuitsCurrentPaid,
  totalSuitsToPaid,
  totalVariousExpensesCurrentPaid,
  totalVariousExpensesToPaid,
  yearWork,
  totalFoodsCurrentPaid,
}: Props) {
  const totalClientsCurrentPaid = calculateTotalClientsCurrentPaid(clients);

  const costsCurrentPaid =
    totalAppetizersExpensesCurrentPaid +
    totalChairsExpensesCurrentPaid +
    totalDrinksExpensesCurrentPaid +
    totalPlasticExpensesCurrentPaid +
    totalSuitsCurrentPaid +
    totalVariousExpensesCurrentPaid +
    totalFoodsCurrentPaid;

  const totalClientsToPaid = calculateTotalClientsToPaid(clients, yearWork);
  const totalSalesBenefits = sales
    .map((s) => s.benefitAmount)
    .reduce((a, b) => a + b, 0);

  const costsToPaid =
    totalAppetizersExpensesToPaid +
    totalChairsExpensesToPaid +
    totalDrinksExpensesToPaid +
    totalPlasticExpensesToPaid +
    totalVariousExpensesToPaid +
    totalFoodsToPaid +
    totalSuitsToPaid;

  const currentCommissionHelp = yearWork.commissionHelpPaid
    ? yearWork.commissionHelp
    : 0;
  const currentAwardsReward = yearWork.awardsRewardPaid
    ? yearWork.awardsReward
    : 0;

  const totalCurrentReceipt =
    currentCommissionHelp +
    totalSalesBenefits +
    currentAwardsReward +
    yearWork.previousYearWorkAmount +
    totalClientsCurrentPaid;

  const totalEstimatedToReceipt =
    yearWork.awardsReward +
    totalSalesBenefits +
    yearWork.commissionHelp +
    yearWork.previousYearWorkAmount +
    totalClientsToPaid;

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
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Real</h3>
          <p className="text-sm text-muted-foreground">
            Cálculos obtenidos a base a la actualidad (Gastos ya pagados e
            ingresos ya cobrados).
          </p>
          <Separator />
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Estimado</h3>
          <p className="text-sm text-muted-foreground">
            Cálculos obtenidos a base a una estimación (Gastos e ingresos a
            futuro).
          </p>
          <Separator />
        </div>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Varios: {formatCurrency(totalVariousExpensesCurrentPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos varios pagados actualmente.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Varios: {formatCurrency(totalVariousExpensesToPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos varios estimados a pagar.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Plástico: {formatCurrency(totalPlasticExpensesCurrentPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos en plástico pagados actualmente.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Plástico: {formatCurrency(totalPlasticExpensesToPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos en plástico estimados a pagar.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Alquiler de mesas y sillas:{" "}
            {formatCurrency(totalChairsExpensesCurrentPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos en alquiler de mesas y sillas pagados actualmente.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Alquiler de mesas y sillas:{" "}
            {formatCurrency(totalChairsExpensesToPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos en alquiler de mesas y sillas estimados a pagar.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Comidas: {formatCurrency(totalFoodsCurrentPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos en comidas pagados actualmente.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Comidas: {formatCurrency(totalChairsExpensesToPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos en comidas estimados a pagar.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Aperitivos y postres:{" "}
            {formatCurrency(totalAppetizersExpensesCurrentPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos en aperitivos y postres pagados actualmente.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Aperitivos y postres:{" "}
            {formatCurrency(totalAppetizersExpensesToPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos en aperitivos y postres estimados a pagar.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Trajes: {formatCurrency(totalSuitsCurrentPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos en trajes pagados actualmente.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Trajes: {formatCurrency(totalSuitsToPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos en trajes estimados a pagar.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Bebida: {formatCurrency(totalDrinksExpensesCurrentPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos en bebida pagados actualmente.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700">
            Bebida: {formatCurrency(totalDrinksExpensesToPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos en bebida estimados a pagar.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700 text-lg">
            TOTAL GASTOS: {formatCurrency(costsCurrentPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos pagados actualmente.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-red-700 text-lg">
            TOTAL GASTOS: {formatCurrency(costsToPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de gastos estimados a pagar.
          </AlertDescription>
        </Alert>
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertTitle className="text-green-500">
            {formatCurrency(totalClientsCurrentPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad total real de dinero pagado hasta la fecha por los
            comparsista.
          </AlertDescription>
        </Alert>
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
            {formatCurrency(currentCommissionHelp)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad de dinero que se ha recibido de subvención de la comisión
            de fiestas.
          </AlertDescription>
        </Alert>
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertTitle className="text-green-500">
            {formatCurrency(yearWork.commissionHelp)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad de dinero que se estima recibir como subvención la comisión
            de fiestas.
          </AlertDescription>
        </Alert>
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertTitle className="text-green-500">
            {formatCurrency(totalSalesBenefits)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad de dinero que se ha obtenido obtenido de beneficio de todas
            las ventas realizadas.
          </AlertDescription>
        </Alert>
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertTitle className="text-green-500">
            {formatCurrency(totalSalesBenefits)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad de dinero que se ha obtenido obtenido de beneficio de todas
            las ventas realizadas.
          </AlertDescription>
        </Alert>
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertTitle className="text-green-500">
            {formatCurrency(currentAwardsReward)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad de dinero que hemos recibido por parte de los premios
            ganados.
          </AlertDescription>
        </Alert>
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertTitle className="text-green-500">
            {formatCurrency(yearWork.awardsReward)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Cantidad de dinero que se estima recibir por premios ganados.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-green-500 text-lg">
            TOTAL INGRESOS: {formatCurrency(totalCurrentReceipt)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de ingresos cobrados actualmente.
          </AlertDescription>
        </Alert>
        <Alert>
          <CopyMinus className="h-4 w-4" />
          <AlertTitle className="text-green-500 text-lg">
            TOTAL INGRESOS: {formatCurrency(totalEstimatedToReceipt)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total de ingresos estimados a cobrar.
          </AlertDescription>
        </Alert>
        <Separator className="col-span-2" />
        <Separator className="col-span-2" />
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-gray-700">
            {formatCurrency(totalCurrentReceipt - costsCurrentPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total real calculado.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-gray-700">
            {formatCurrency(totalEstimatedToReceipt - costsToPaid)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total estimado calculado.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
