import * as z from "zod";

import { formSchema } from "./sale-form.constants";

export type SaleFormValues = z.infer<typeof formSchema>;
