"use client";

import Heading from "@/components/heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { AgeGroup, PriceType } from "@prisma/client";
import { Wallet } from "lucide-react";
import { AGE_GROUPS_LITERALS } from "../../clients/clients.constants";

interface Props {
  readonly priceTypes: PriceType[];
}

export default function DashboardQuotes({ priceTypes }: Props) {
  const extraCosts = 24.58;
  const drinkCost = 55.01;
  const adultSuitCost = 115.83;
  const appetizersCost = 1.11;
  const foodCosts = {
    all: {
      withoutDrink: 51.8,
      withDrink: 69.8,
    },
    onlyDinner: {
      withoutDrink: 34.53,
      withDrink: 46.53,
    },
  };
  const chairsCost = 4.53;
  const plasticCost = 2.91;

  const totalCosts =
    extraCosts +
    drinkCost +
    adultSuitCost +
    appetizersCost +
    foodCosts.all.withoutDrink +
    chairsCost +
    plasticCost;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Cálculo de cuotas estimadas según la previsión de gastos y los comparsistas actuales"
          title="Estimación de cuotas"
        />
      </div>
      <Separator />

      {priceTypes.map((priceType) => (
        <div
          key={priceType.id}
          className="grid grid-cols-1 gap-8 sm:grid-cols-4"
        >
          <div className="col-span-4">
            <h3 className="text-xl font-bold tracking-tight">
              {priceType.name}
            </h3>
          </div>
          {priceType.adultPrice > 0 && (
            <Alert>
              <Wallet className="h-4 w-4" />
              <AlertTitle className="text-gray-500">{`${
                AGE_GROUPS_LITERALS[AgeGroup.ADULT]
              }: ${formatCurrency(totalCosts)}`}</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground">
                <ul>
                  <li>Gastos Extra: {formatCurrency(extraCosts)}</li>
                  <li>Bebida: {formatCurrency(drinkCost)}</li>
                  <li>Traje: {formatCurrency(adultSuitCost)}</li>
                  <li>Aperitivos: {formatCurrency(appetizersCost)}</li>
                  <li>
                    Comidas y Cenas:{" "}
                    {formatCurrency(foodCosts.all.withoutDrink)}
                  </li>
                  <li>Alquiler mesas y sillas: {formatCurrency(chairsCost)}</li>
                  <li>Plástico: {formatCurrency(plasticCost)}</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
          {priceType.childPrice > 0 && (
            <Alert>
              <Wallet className="h-4 w-4" />
              <AlertTitle className="text-gray-500">{`${
                AGE_GROUPS_LITERALS[AgeGroup.CHILD]
              }: ${formatCurrency(totalCosts)}`}</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground">
                <ul>
                  <li>Gastos Extra: {formatCurrency(extraCosts)}</li>
                  <li>Bebida: {formatCurrency(drinkCost)}</li>
                  <li>Traje: {formatCurrency(adultSuitCost)}</li>
                  <li>Aperitivos: {formatCurrency(appetizersCost)}</li>
                  <li>
                    Comidas y Cenas:{" "}
                    {formatCurrency(foodCosts.all.withoutDrink)}
                  </li>
                  <li>Alquiler mesas y sillas: {formatCurrency(chairsCost)}</li>
                  <li>Plástico: {formatCurrency(plasticCost)}</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
          {priceType.childHalfPortionPrice > 0 && (
            <Alert>
              <Wallet className="h-4 w-4" />
              <AlertTitle className="text-gray-500">{`${
                AGE_GROUPS_LITERALS[AgeGroup.CHILD_HALF_PORTION]
              }: ${formatCurrency(totalCosts)}`}</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground">
                <ul>
                  <li>Gastos Extra: {formatCurrency(extraCosts)}</li>
                  <li>Bebida: {formatCurrency(drinkCost)}</li>
                  <li>Traje: {formatCurrency(adultSuitCost)}</li>
                  <li>Aperitivos: {formatCurrency(appetizersCost)}</li>
                  <li>
                    Comidas y Cenas:{" "}
                    {formatCurrency(foodCosts.all.withoutDrink)}
                  </li>
                  <li>Alquiler mesas y sillas: {formatCurrency(chairsCost)}</li>
                  <li>Plástico: {formatCurrency(plasticCost)}</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
          {priceType.babyPrice > 0 && (
            <Alert>
              <Wallet className="h-4 w-4" />
              <AlertTitle className="text-gray-500">{`${
                AGE_GROUPS_LITERALS[AgeGroup.BABY]
              }: ${formatCurrency(totalCosts)}`}</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground">
                <ul>
                  <li>Gastos Extra: {formatCurrency(extraCosts)}</li>
                  <li>Bebida: {formatCurrency(drinkCost)}</li>
                  <li>Traje: {formatCurrency(adultSuitCost)}</li>
                  <li>Aperitivos: {formatCurrency(appetizersCost)}</li>
                  <li>
                    Comidas y Cenas:{" "}
                    {formatCurrency(foodCosts.all.withoutDrink)}
                  </li>
                  <li>Alquiler mesas y sillas: {formatCurrency(chairsCost)}</li>
                  <li>Plástico: {formatCurrency(plasticCost)}</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      ))}
    </>
  );
}
