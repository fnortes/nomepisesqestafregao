import * as z from "zod";

export const formSchema = z.object({
  name: z.string().max(50),
  comments: z.string().optional().nullable(),
});
