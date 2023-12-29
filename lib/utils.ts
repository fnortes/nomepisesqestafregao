import { AgeGroup, Client, PriceType, YearWork } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
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
  newClientPrice: YearWork["newClientPrice"];
}

export const calculateQuote = ({
  ageGroup,
  isNew,
  priceType,
  newClientPrice,
}: CalculateQuoteParams): number => {
  let newCalculatedQuote = 0;

  const pricesMapping: { [key in AgeGroup]: number } = {
    [AgeGroup.ADULT]: priceType.adultPrice,
    [AgeGroup.CHILD]: priceType.childPrice,
    [AgeGroup.BABY]: priceType.babyPrice,
  };

  newCalculatedQuote = pricesMapping[ageGroup];

  if (ageGroup === AgeGroup.ADULT && isNew) {
    newCalculatedQuote += newClientPrice;
  }

  return newCalculatedQuote;
};
