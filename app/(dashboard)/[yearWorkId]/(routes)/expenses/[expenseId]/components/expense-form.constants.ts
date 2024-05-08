import * as z from "zod";

export const formSchema = z.object({
  expenseCategoryId: z.string(),
  title: z.string().max(50),
  comments: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  previousYearWorkUnits: z.number().min(0).max(9999),
  estimatedUnits: z.number().min(0).max(999),
  units: z.number().min(0).max(999),
  unitPrice: z.number().min(0).max(999),
  total: z.number().min(0).max(9999),
  paid: z.number().min(0).max(9999),
});
