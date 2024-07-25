import * as z from "zod";

export const formSchema = z.object({
  benefitAmount: z.number().min(0).max(9999),
  comments: z.string().optional().nullable(),
  date: z.date(),
  finallyAmount: z.number().min(0).max(9999),
  initialAmount: z.number().min(0).max(9999),
  saleCategoryId: z.string(),
  title: z.string().max(50),
});
