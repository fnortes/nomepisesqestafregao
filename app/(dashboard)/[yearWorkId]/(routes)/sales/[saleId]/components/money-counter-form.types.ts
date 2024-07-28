import * as z from "zod";

import { formSchema } from "./money-counter-form.constants";

export type MoneyCounterFormValues = z.infer<typeof formSchema>;
