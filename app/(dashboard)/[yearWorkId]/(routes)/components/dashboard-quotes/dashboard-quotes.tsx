"use client";

import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { AgeGroup, PriceType } from "@prisma/client";
import QuoteItem from "./quote-item";
import { FoodCosts } from "../common.types";

interface Props {
  readonly commissionHelpPercentage: number;
  readonly foodCosts: FoodCosts;
  readonly mediumCostAdultSuit: number;
  readonly mediumCostBabySuit: number;
  readonly mediumCostChildSuit: number;
  readonly priceTypes: PriceType[];
  readonly totalAppetizersExpensesByAdultAndChild: number;
  readonly totalChairsExpensesByAdultAndChild: number;
  readonly totalDrinksExpensesByAdult: number;
  readonly totalPlasticExpensesByAdultAndChild: number;
  readonly totalVariousExpensesByAdultAndChild: number;
}

export default function DashboardQuotes({
  commissionHelpPercentage,
  foodCosts,
  mediumCostAdultSuit,
  mediumCostBabySuit,
  mediumCostChildSuit,
  priceTypes,
  totalAppetizersExpensesByAdultAndChild,
  totalChairsExpensesByAdultAndChild,
  totalDrinksExpensesByAdult,
  totalPlasticExpensesByAdultAndChild,
  totalVariousExpensesByAdultAndChild,
}: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Cálculo de cuotas estimadas según la previsión de gastos y los comparsistas actuales"
          title="Estimación de cuotas"
        />
      </div>
      <Separator />

      {priceTypes.map((priceType) => {
        const drinkCost = priceType.drinkTickets
          ? totalDrinksExpensesByAdult
          : 0;
        const launchCost = priceType.meals
          ? foodCosts.withoutDrink * (1 - foodCosts.onlyDinnerPercentage)
          : 0;
        const dinnerCost = priceType.dinners
          ? foodCosts.withoutDrink * foodCosts.onlyDinnerPercentage
          : 0;
        const launchAndDinnerCost = launchCost + dinnerCost;

        return (
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
              <QuoteItem
                ageGroup={AgeGroup.ADULT}
                appetizersCost={totalAppetizersExpensesByAdultAndChild}
                chairsCost={totalChairsExpensesByAdultAndChild}
                commissionHelpPercentage={commissionHelpPercentage}
                drinkCost={drinkCost}
                extraCosts={totalVariousExpensesByAdultAndChild}
                launchAndDinnerCost={launchAndDinnerCost}
                plasticCost={totalPlasticExpensesByAdultAndChild}
                suitCost={mediumCostAdultSuit}
              />
            )}
            {priceType.childPrice > 0 && (
              <QuoteItem
                ageGroup={AgeGroup.CHILD}
                appetizersCost={totalAppetizersExpensesByAdultAndChild}
                chairsCost={totalChairsExpensesByAdultAndChild}
                commissionHelpPercentage={commissionHelpPercentage}
                drinkCost={0}
                extraCosts={totalVariousExpensesByAdultAndChild}
                launchAndDinnerCost={launchAndDinnerCost}
                plasticCost={totalPlasticExpensesByAdultAndChild}
                suitCost={mediumCostChildSuit}
              />
            )}
            {priceType.childHalfPortionPrice > 0 && (
              <QuoteItem
                ageGroup={AgeGroup.CHILD_HALF_PORTION}
                appetizersCost={totalAppetizersExpensesByAdultAndChild}
                chairsCost={totalChairsExpensesByAdultAndChild}
                commissionHelpPercentage={commissionHelpPercentage}
                drinkCost={0}
                extraCosts={totalVariousExpensesByAdultAndChild}
                launchAndDinnerCost={launchAndDinnerCost * 0.5}
                plasticCost={totalPlasticExpensesByAdultAndChild}
                suitCost={mediumCostChildSuit}
              />
            )}
            {priceType.babyPrice > 0 && (
              <QuoteItem
                ageGroup={AgeGroup.BABY}
                appetizersCost={0}
                chairsCost={0}
                commissionHelpPercentage={commissionHelpPercentage}
                drinkCost={0}
                extraCosts={0}
                launchAndDinnerCost={launchAndDinnerCost * 0.5}
                plasticCost={0}
                suitCost={mediumCostBabySuit}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
