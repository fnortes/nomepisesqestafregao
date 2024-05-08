import * as z from "zod";

import { formSchema } from "./client-form.constants";

import type {
  Client,
  ClientsOnBarGroups,
  ClientsOnFoods,
  PriceType,
} from "@prisma/client";

export type ClientFormValues = z.infer<typeof formSchema>;

export type CustomClient = Client & {
  barGroups: ClientsOnBarGroups[];
  foods: ClientsOnFoods[];
  priceType: PriceType;
};
