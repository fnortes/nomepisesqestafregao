import { AgeGroup, Client, PriceType, YearWork } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value);

interface CalculateQuoteParams
  extends Pick<Client, "ageGroup" | "isNew" | "quotaModifier"> {
  priceType: PriceType;
  yearWork: YearWork;
  foodQuantities: number[];
}

export const calculateQuote = ({
  ageGroup,
  isNew,
  priceType,
  yearWork,
  foodQuantities,
  quotaModifier,
}: CalculateQuoteParams): number => {
  let newCalculatedQuote = 0;

  const pricesMapping: { [key in AgeGroup]: number } = {
    [AgeGroup.ADULT]: priceType.adultPrice,
    [AgeGroup.TEEN]: priceType.teenPrice,
    [AgeGroup.TEEN_HALF_PORTION]: priceType.teenHalfPortionPrice,
    [AgeGroup.CHILD]: priceType.childPrice,
    [AgeGroup.CHILD_HALF_PORTION]: priceType.childHalfPortionPrice,
    [AgeGroup.BABY]: priceType.babyPrice,
  };

  newCalculatedQuote = pricesMapping[ageGroup];

  if (ageGroup === AgeGroup.ADULT && isNew) {
    newCalculatedQuote += yearWork.newClientPrice;
  }

  const foodPriceTotal =
    foodQuantities.length > 0
      ? foodQuantities
          .map((quantity) => {
            return quantity * yearWork.unitFoodPrice;
          })
          .reduce((a, b) => a + b, 0)
      : 0;

  return newCalculatedQuote + foodPriceTotal + quotaModifier;
};
