import { AgeGroup, Suit } from "@prisma/client";
import { GeneralClient } from "../common.types";
import {
  calculateTotalSuitsCurrentPaid,
  calculateTotalSuitsToPaid,
  getClientsBySuit,
} from "../common.utils";
import { DashboardSuitsColumn } from "./columns";

const suitToDashboardDataMapper = (
  suit: Suit,
  clients: GeneralClient[]
): DashboardSuitsColumn => {
  const { ageGroup, gender, price } = suit;
  const clientsBySuit = getClientsBySuit(clients, suit);

  return {
    ageGroup,
    gender,
    price,
    clients: clientsBySuit.map((c) => `${c.firstName} ${c.lastName}`),
    totalPrice: clientsBySuit.length * price,
  };
};

export const calculateSuitsExpensesData = (
  suits: Suit[],
  clients: GeneralClient[]
) => {
  // Se calcula el total del coste de los trajes, estimado a pagar y el pagado actual.
  const totalToPaid = calculateTotalSuitsToPaid(suits, clients);
  const totalCurrentPaid = calculateTotalSuitsCurrentPaid(suits);
  // Se obtiene el listado de los trajes con los precios totales según los comparsistas.
  const dashboardData: DashboardSuitsColumn[] = suits.map((suit) =>
    suitToDashboardDataMapper(suit, clients)
  );
  // Se calcula el precio medio de todos los trajes para adulto, en base al número de comparsistas.
  const adultSuits = dashboardData.filter((d) => d.ageGroup === AgeGroup.ADULT);
  const mediumCostAdult =
    adultSuits.map((s) => s.totalPrice).reduce((a, b) => a + b, 0) /
    adultSuits.map((s) => s.clients.length).reduce((a, b) => a + b, 0);
  // Se calcula el precio medio de todos los trajes para niños, en base al número de comparsistas.
  const childSuits = dashboardData.filter(
    (d) =>
      d.ageGroup === AgeGroup.CHILD ||
      d.ageGroup === AgeGroup.CHILD_HALF_PORTION
  );
  const mediumCostChild =
    childSuits.map((s) => s.totalPrice).reduce((a, b) => a + b, 0) /
    childSuits.map((s) => s.clients.length).reduce((a, b) => a + b, 0);
  // Se calcula el precio medio de todos los trajes para bebés, en base al número de comparsistas.
  const babySuits = dashboardData.filter((d) => d.ageGroup === AgeGroup.BABY);
  const mediumCostBaby =
    babySuits.map((s) => s.totalPrice).reduce((a, b) => a + b, 0) /
    babySuits.map((s) => s.clients.length).reduce((a, b) => a + b, 0);

  return {
    dashboardData,
    mediumCostAdult,
    mediumCostBaby,
    mediumCostChild,
    totalCurrentPaid,
    totalToPaid,
  };
};
