import * as z from "zod";

import { formSchema } from "./sale-category-form.constants";

export type SaleCategoryFormValues = z.infer<typeof formSchema>;
