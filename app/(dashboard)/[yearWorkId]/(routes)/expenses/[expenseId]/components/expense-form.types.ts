import * as z from "zod";

import { formSchema } from "./expense-form.constants";

export type ExpenseFormValues = z.infer<typeof formSchema>;
