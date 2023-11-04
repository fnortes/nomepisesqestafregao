import * as z from "zod";

import { formSchema } from "./price-type-form.constants";

export type PriceTypeFormValues = z.infer<typeof formSchema>;
