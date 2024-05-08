import * as z from "zod";

import { formSchema } from "./expense-category-form.constants";

export type ExpenseCategoryFormValues = z.infer<typeof formSchema>;
