import * as z from "zod";

import { formSchema } from "./suit-form.constants";

export type SuitFormValues = z.infer<typeof formSchema>;
