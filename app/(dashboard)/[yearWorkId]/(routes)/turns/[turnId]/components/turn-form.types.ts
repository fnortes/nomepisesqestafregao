import * as z from "zod";

import { formSchema } from "./turn-form.constants";

import type { Client, Turn } from "@prisma/client";

export type TurnFormValues = z.infer<typeof formSchema>;

export type CustomTurn = Turn & {
  barGroup: {
    clients: {
      client: Client;
    }[];
  };
};
