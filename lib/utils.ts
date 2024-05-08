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

interface CalculateQuoteParams extends Pick<Client, "ageGroup" | "isNew"> {
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
}: CalculateQuoteParams): number => {
  let newCalculatedQuote = 0;

  const pricesMapping: { [key in AgeGroup]: number } = {
    [AgeGroup.ADULT]: priceType.adultPrice,
    [AgeGroup.CHILD]: priceType.childPrice,
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
          .reduce((a, b) => a + b)
      : 0;

  return newCalculatedQuote + foodPriceTotal;
};
