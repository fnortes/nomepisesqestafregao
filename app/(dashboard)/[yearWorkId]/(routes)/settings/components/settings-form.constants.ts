import * as z from "zod";

export const formSchema = z.object({
  awardsReward: z.number().min(0).max(999),
  cash: z.number().min(0).max(999),
  commissionHelp: z.number().min(0).max(999),
  firstPartyDay: z.date(),
  lastPartyDay: z.date(),
  newClientPrice: z.number().min(0).max(99),
  previousAdults: z.number().int().min(1).max(99),
  previousChilds: z.number().int().min(0).max(99),
  previousTeens: z.number().int().min(0).max(99),
  previousYearWorkAmount: z.number().min(0).max(9999),
  unitFoodPrice: z.number().min(0).max(99),
  year: z.string().length(4),
});
