import * as z from "zod";

import { formSchema } from "./bar-group-form.constants";

export type BarGroupFormValues = z.infer<typeof formSchema>;
