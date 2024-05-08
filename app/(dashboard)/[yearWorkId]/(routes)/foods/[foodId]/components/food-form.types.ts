import * as z from "zod";

import { formSchema } from "./food-form.constants";

export type FoodFormValues = z.infer<typeof formSchema>;
