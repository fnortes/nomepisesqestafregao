import * as z from "zod";

export const formSchema = z.object({
  ageGroups: z.array(z.string()),
  firstName: z.string().max(50),
  priceTypeIds: z.array(z.string()),
});
