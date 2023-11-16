import * as z from "zod";

import { formSchema } from "./client-form.constants";

import type { Client } from "@prisma/client";

export type ClientFormValues = z.infer<typeof formSchema>;

export type CustomClient = Client & {
  barGroups: {
    barGroupId: string;
    clientId: string;
    startDate: Date;
    endDate: Date;
  }[];
};
