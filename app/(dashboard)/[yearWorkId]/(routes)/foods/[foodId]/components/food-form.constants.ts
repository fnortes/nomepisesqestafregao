import * as z from "zod";

export const formSchema = z.object({
  comments: z.string().optional().nullable(),
  date: z.date(),
  description: z.string().optional().nullable(),
  price: z.number().min(0).max(99),
  paid: z.number().min(0).max(999),
  title: z.string().max(50),
});
