import * as z from "zod";

export const formSchema = z
  .object({
    year: z.string().length(4),
    newClientPrice: z.number().min(0).max(99),
    previousAdults: z.number().int().min(1).max(99),
    previousChilds: z.number().int().min(1).max(99),
    firstPartyDay: z.date(),
    lastPartyDay: z.date(),
    previousFirstPartyDay: z.date(),
    previousLastPartyDay: z.date(),
    unitFoodPrice: z.number().min(0).max(99),
    previousYearWorkAmount: z.number().min(0).max(9999),
    awardsReward: z.number().min(0).max(999),
    commissionHelp: z.number().min(0).max(999),
  })
  .refine(({ firstPartyDay, lastPartyDay }) => firstPartyDay < lastPartyDay, {
    message: "La fecha de inicio debe ser menor que la de final.",
    path: ["firstPartyDay"],
  })
  .refine(
    ({ previousFirstPartyDay, previousLastPartyDay }) =>
      previousFirstPartyDay < previousLastPartyDay,
    {
      message: "La fecha de inicio debe ser menor que la de final.",
      path: ["previousFirstPartyDay"],
    }
  )
  .refine(
    ({ firstPartyDay, previousLastPartyDay }) =>
      firstPartyDay > previousLastPartyDay,
    {
      message:
        "La fecha de comienzo de fiestas debe ser mayor a la de final del año pasado.",
      path: ["firstPartyDay"],
    }
  );
