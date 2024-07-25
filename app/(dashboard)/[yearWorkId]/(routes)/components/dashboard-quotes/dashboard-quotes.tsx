"use client";

import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { AgeGroup, PriceType } from "@prisma/client";
import QuoteItem from "./quote-item";
import { FoodCosts } from "../common.types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

interface Props {
  readonly commissionHelpPercentage: number;
  readonly foodCosts: FoodCosts;
  readonly mediumCostAdultSuit: number;
  readonly mediumCostBabySuit: number;
  readonly mediumCostChildSuit: number;
  readonly mediumCostTeenSuit: number;
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
  mediumCostTeenSuit,
  priceTypes,
  totalAppetizersExpensesByAdultAndChild,
  totalChairsExpensesByAdultAndChild,
  totalDrinksExpensesByAdult,
  totalPlasticExpensesByAdultAndChild,
  totalVariousExpensesByAdultAndChild,
}: Props) {
  return (
    <Collapsible>
      <div className="flex items-center justify-between">
        <Heading
          description="Cálculo de cuotas estimadas según la previsión de gastos y los comparsistas actuales"
          title="Estimación de cuotas"
        />
        <CollapsibleTrigger>
          <Button size="icon" variant="outline">
            <ChevronsUpDown className="w-4 h-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <Separator />
        {priceTypes.map((priceType) => {
          const [drinkCost, baseFoodCost] = priceType.drinkTickets
            ? [totalDrinksExpensesByAdult, foodCosts.withoutDrink]
            : [0, foodCosts.withDrink];

          const [launchCostAdult, launchCostChildAndBaby] = priceType.meals
            ? [
                baseFoodCost * (1 - foodCosts.onlyDinnerPercentage),
                foodCosts.withoutDrink * (1 - foodCosts.onlyDinnerPercentage),
              ]
            : [0, 0];
          const [dinnerCostAdult, dinnerCostChildAndBaby] = priceType.dinners
            ? [
                baseFoodCost * foodCosts.onlyDinnerPercentage,
                foodCosts.withoutDrink * foodCosts.onlyDinnerPercentage,
              ]
            : [0, 0];

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
                  launchAndDinnerCost={launchCostAdult + dinnerCostAdult}
                  plasticCost={totalPlasticExpensesByAdultAndChild}
                  suitCost={priceType.paradeSuit ? mediumCostAdultSuit : 0}
                />
              )}
              {priceType.teenPrice > 0 && (
                <QuoteItem
                  ageGroup={AgeGroup.TEEN}
                  appetizersCost={totalAppetizersExpensesByAdultAndChild}
                  chairsCost={totalChairsExpensesByAdultAndChild}
                  commissionHelpPercentage={commissionHelpPercentage}
                  drinkCost={0}
                  extraCosts={totalVariousExpensesByAdultAndChild}
                  launchAndDinnerCost={
                    launchCostChildAndBaby + dinnerCostChildAndBaby
                  }
                  plasticCost={totalPlasticExpensesByAdultAndChild}
                  suitCost={priceType.paradeSuit ? mediumCostTeenSuit : 0}
                />
              )}
              {priceType.teenHalfPortionPrice > 0 && (
                <QuoteItem
                  ageGroup={AgeGroup.TEEN_HALF_PORTION}
                  appetizersCost={totalAppetizersExpensesByAdultAndChild}
                  chairsCost={totalChairsExpensesByAdultAndChild}
                  commissionHelpPercentage={commissionHelpPercentage}
                  drinkCost={0}
                  extraCosts={totalVariousExpensesByAdultAndChild}
                  launchAndDinnerCost={
                    (launchCostChildAndBaby + dinnerCostChildAndBaby) * 0.5
                  }
                  plasticCost={totalPlasticExpensesByAdultAndChild}
                  suitCost={priceType.paradeSuit ? mediumCostTeenSuit : 0}
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
                  launchAndDinnerCost={
                    launchCostChildAndBaby + dinnerCostChildAndBaby
                  }
                  plasticCost={totalPlasticExpensesByAdultAndChild}
                  suitCost={priceType.paradeSuit ? mediumCostChildSuit : 0}
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
                  launchAndDinnerCost={
                    (launchCostChildAndBaby + dinnerCostChildAndBaby) * 0.5
                  }
                  plasticCost={totalPlasticExpensesByAdultAndChild}
                  suitCost={priceType.paradeSuit ? mediumCostChildSuit : 0}
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
                  launchAndDinnerCost={
                    (launchCostChildAndBaby + dinnerCostChildAndBaby) * 0.5
                  }
                  plasticCost={0}
                  suitCost={priceType.paradeSuit ? mediumCostBabySuit : 0}
                />
              )}
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
