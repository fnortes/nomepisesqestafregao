import { AgeGroup, Gender } from "@prisma/client";
import * as z from "zod";

export const formSchema = z.object({
  comments: z.string().optional().nullable(),
  price: z.number().min(0).max(999),
  paid: z.number().min(0).max(9999),
  gender: z.nativeEnum(Gender),
  ageGroup: z.nativeEnum(AgeGroup),
});
