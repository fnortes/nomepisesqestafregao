"use client";

import Heading from "@/components/heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { calculateQuote, formatCurrency } from "@/lib/utils";
import { Expense, YearWork } from "@prisma/client";
import { Calculator, CopyMinus, Wallet } from "lucide-react";
import { GeneralClient } from "../common.types";

interface Props {
  readonly clients: GeneralClient[];
  readonly expenses: Expense[];
  readonly yearWork: YearWork;
  readonly foods: Food[];
}

export default function DashboardResume({
  clients,
  expenses,
  yearWork,
  foods,
}: Props) {
  const totalClientsToPaid =
    clients.length > 0
      ? clients
          .map((client) =>
            calculateQuote({
              ageGroup: client.ageGroup,
              isNew: client.isNew,
              priceType: client.priceType,
              yearWork,
              foodQuantities: client.foods.map((f) => f.quantity),
            })
          )
          .reduce((a, b) => a + b)
      : 0;

  const totalExpenses =
    expenses.length > 0
      ? expenses.map((expense) => expense.total).reduce((a, b) => a + b)
      : 0;

  const countClients = (clients: GeneralClient[], foodId: string) =>
    clients
      .filter(
        (client) => client.foods.filter((f) => f.foodId === foodId).length > 0
      )
      .map((client) => {
        const clientFood = client.foods.find((f) => f.foodId === foodId);

        if (clientFood) {
          return clientFood.quantity + (clientFood.attend ? 1 : 0);
        }

        return 0;
      })
      .reduce((a, b) => a + b);

  const totalFoods = foods
    .map((food) => {
      const total = countClients(clients, food.id);
      return total * food.price;
    })
    .reduce((a, b) => a + b);

  const total =
    totalClientsToPaid -
    (totalExpenses + totalFoods) +
    yearWork.previousYearWorkAmount +
    yearWork.commissionHelp +
    yearWork.awardsReward;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen de gastos e ingresos autocalculados para el año de trabajo seleccionado"
          title="Desglose ingresos y gastos"
        />
      </div>
      <Separator />
      <Alert>
        <Wallet className="h-4 w-4" />
        <AlertTitle className="text-green-500">
          {formatCurrency(totalClientsToPaid)}
        </AlertTitle>
        <AlertDescription className="text-sm text-muted-foreground">
          Cantidad total de dinero ingresado por los comparsistas, que es la
          suma de la cuota que le pertenece pagar a cada uno según su modalidad
          de precio para salir en la comparsa, más el dinero extra que haya
          tenido que pagar por comidas sueltas.
        </AlertDescription>
      </Alert>
      <Alert>
        <CopyMinus className="h-4 w-4" />
        <AlertTitle className="text-red-700">
          {formatCurrency(totalExpenses + totalFoods)}
        </AlertTitle>
        <AlertDescription className="text-sm text-muted-foreground">
          Cantidad total de todos los gastos de la comparsa, para el año de
          trabajo seleccionado.
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
          {formatCurrency(total)}
        </AlertTitle>
        <AlertDescription className="text-sm text-muted-foreground">
          Total calculado.
        </AlertDescription>
      </Alert>
    </>
  );
}
