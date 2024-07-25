import * as z from "zod";

export const formSchema = z.object({
  adultPrice: z.number().min(0).max(999),
  babyPrice: z.number().min(0).max(999),
  childHalfPortionPrice: z.number().min(0).max(999),
  childPrice: z.number().min(0).max(999),
  dinners: z.boolean().default(false),
  drinkTickets: z.boolean().default(false),
  meals: z.boolean().default(false),
  name: z.string().min(1).max(50),
  paradeSuit: z.boolean().default(false),
  paradeWater: z.boolean().default(false),
  teenHalfPortionPrice: z.number().min(0).max(999),
  teenPrice: z.number().min(0).max(999),
});
