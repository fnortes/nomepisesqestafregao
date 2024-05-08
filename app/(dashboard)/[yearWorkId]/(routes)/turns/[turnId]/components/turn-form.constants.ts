import * as z from "zod";

export const formSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  barGroupId: z.string(),
});
