import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1).max(50),
  adultPrice: z.number().min(0).max(999),
  childPrice: z.number().min(0).max(999),
  babyPrice: z.number().min(0).max(999),
  meals: z.boolean().default(false),
  dinners: z.boolean().default(false),
  paradeSuit: z.boolean().default(false),
  paradeWater: z.boolean().default(false),
  drinkTickets: z.boolean().default(false),
});
