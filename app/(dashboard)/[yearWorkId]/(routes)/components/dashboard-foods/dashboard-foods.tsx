"use client";

import Heading from "@/components/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { AgeGroup, Food } from "@prisma/client";
import { GeneralClient } from "../common.types";
import { DashboardFoodsColumn, columns } from "./columns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calculator } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Props {
  readonly clients: GeneralClient[];
  readonly foods: Food[];
}

export default function DashboardFoods({ clients, foods }: Props) {
  const countClients = (
    clients: GeneralClient[],
    ageGroup: AgeGroup,
    foodId: string
  ) => {
    const count = clients
      .filter(
        (client) =>
          client.ageGroup === ageGroup &&
          client.foods.filter((f) => f.foodId === foodId).length > 0
      )
      .map((client) => {
        const clientFood = client.foods.find((f) => f.foodId === foodId);

        if (clientFood) {
          return clientFood.quantity + (clientFood.attend ? 1 : 0);
        }

        return 0;
      });

    return count.length > 0 ? count.reduce((a, b) => a + b, 0) : 0;
  };

  const dashboardData: DashboardFoodsColumn[] = foods.map((food) => {
    const totalAdult = countClients(clients, AgeGroup.ADULT, food.id);
    const totalChild = countClients(clients, AgeGroup.CHILD, food.id);
    const totalBaby = countClients(clients, AgeGroup.BABY, food.id);
    const total = totalAdult + totalChild + totalBaby;

    return {
      title: food.title,
      date: food.date,
      price: food.price,
      totalAdult,
      totalChild,
      totalBaby,
      total,
      totalPrice: total * food.price,
    };
  });

  // Se calcula un coste estimado extra (sobre el precio del menú) de 2€ para bebida y 1€ para plástico
  const extraDrinkCostByClientAndFood = 2;
  const extraPlasticCostByClientAndFood = 1;

  const allFoodsTotalCost = dashboardData
    .map((d) => d.totalPrice)
    .reduce((a, b) => a + b, 0);

  const allFoodsCostByClient = dashboardData
    .map((d) => d.price)
    .reduce((a, b) => a + b, 0);

  const mediumPriceByClientAndFood =
    allFoodsCostByClient / dashboardData.length;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Ver el resumen de todas las comidas, con la agenda de quienes vienen a cada una de ellas"
          title={`Desglose comidas para ${clients.length} comparsistas`}
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
            {formatCurrency(allFoodsTotalCost)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Total a pagar por las comidas.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-green-700">
            {formatCurrency(mediumPriceByClientAndFood)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Precio medio por persona y comida.
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-green-700">
            {formatCurrency(allFoodsCostByClient)}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Coste de todas las comidas por persona (Sólo precio menú).
          </AlertDescription>
        </Alert>
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle className="text-green-700">
            {formatCurrency(
              dashboardData.map((d) => d.price).reduce((a, b) => a + b, 0)
            )}
          </AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            Coste de todas las comidas por persona (incluyendo extra de bebida{" "}
            {formatCurrency(extraDrinkCostByClientAndFood)} y extra de plástico{" "}
            {formatCurrency(extraPlasticCostByClientAndFood)}).
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
