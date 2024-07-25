import { AgeGroup, Gender, SuitGroup } from "@prisma/client";
import * as z from "zod";

export const formSchema = z.object({
  ageGroup: z.nativeEnum(AgeGroup),
  comments: z.string().optional().nullable(),
  gender: z.nativeEnum(Gender),
  paid: z.number().min(0).max(9999),
  suitGroup: z.nativeEnum(SuitGroup),
  total: z.number().min(0).max(9999),
  unitPrice: z.number().min(0).max(999),
  units: z.number().min(0).max(999),
});
