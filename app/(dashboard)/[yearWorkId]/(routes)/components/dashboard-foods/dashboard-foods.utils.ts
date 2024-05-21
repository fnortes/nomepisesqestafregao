import { AgeGroup, Food } from "@prisma/client";
import {
  EXTRA_DRINK_COST_BY_CLIENT_AND_FOOD,
  EXTRA_PLASTIC_COST_BY_CLIENT_AND_FOOD,
} from "../common.constants";
import { GeneralClient } from "../common.types";
import {
  calculateTotalFoodsCurrentPaid,
  calculateTotalFoodsToPaid,
  countClientsByFoodAndAgeGroup,
} from "../common.utils";
import { DashboardFoodsColumn } from "./columns";

const foodToDashboardDataMapper = (food: Food, clients: GeneralClient[]) => {
  const totalAdult = countClientsByFoodAndAgeGroup(
    clients,
    food.id,
    AgeGroup.ADULT
  );
  const totalChild = countClientsByFoodAndAgeGroup(
    clients,
    food.id,
    AgeGroup.CHILD
  );
  const totalChildHalfPortion = countClientsByFoodAndAgeGroup(
    clients,
    food.id,
    AgeGroup.CHILD_HALF_PORTION
  );
  const totalBaby = countClientsByFoodAndAgeGroup(
    clients,
    food.id,
    AgeGroup.BABY
  );
  const total = totalAdult + totalChild + totalChildHalfPortion + totalBaby;

  return {
    date: food.date,
    price: food.price,
    title: food.title,
    total,
    totalAdult,
    totalBaby,
    totalChild,
    totalChildHalfPortion,
    totalPrice: total * food.price,
  };
};

export const calculateFoodsExpensesData = (
  allFoods: Food[],
  clients: GeneralClient[]
) => {
  // Se calcula el total del coste de las comidas y cenas, estimado a pagar y el pagado actual.
  const totalToPaid = calculateTotalFoodsToPaid(allFoods, clients);
  const totalCurrentPaid = calculateTotalFoodsCurrentPaid(allFoods);
  // Se obtiene el listado de las comidas según los comparsistas y por grupo de edad.
  const dashboardData: DashboardFoodsColumn[] = allFoods.map((food) =>
    foodToDashboardDataMapper(food, clients)
  );
  // Se calcula el coste de todas las comidas y cenas, para un comparsista, con menú completo
  const costByClient = dashboardData
    .map((d) => d.price)
    .reduce((a, b) => a + b, 0);
  // Se calcula el coste de todas las comidas y cenas, para un comparsista, con menú completo + extra de bebida y plástico.
  const costByClientWithExtra = dashboardData
    .map((d) => d.price)
    .reduce(
      (a, b) =>
        a +
        EXTRA_DRINK_COST_BY_CLIENT_AND_FOOD +
        EXTRA_PLASTIC_COST_BY_CLIENT_AND_FOOD +
        b,
      0
    );
  // Se calcula el coste medio de una comida (con extras incluidos), para usarlo como precio de comida suelta.
  const mediumPriceByClient = costByClientWithExtra / dashboardData.length;

  return {
    costByClient,
    costByClientWithExtra,
    dashboardData,
    mediumPriceByClient,
    totalCurrentPaid,
    totalToPaid,
  };
};
