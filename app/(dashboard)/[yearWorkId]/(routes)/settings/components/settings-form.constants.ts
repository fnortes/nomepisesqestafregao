import * as z from "zod";

export const formSchema = z.object({
  year: z.string().length(4),
  newClientPrice: z.number().min(0).max(99),
  previousAdults: z.number().int().min(1).max(99),
  previousChilds: z.number().int().min(0).max(99),
  firstPartyDay: z.date(),
  lastPartyDay: z.date(),
  unitFoodPrice: z.number().min(0).max(99),
  previousYearWorkAmount: z.number().min(0).max(9999),
  awardsReward: z.number().min(0).max(999),
  commissionHelp: z.number().min(0).max(999),
});
