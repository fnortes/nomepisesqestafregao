import * as z from "zod";

import { formSchema } from "./clients-search-form.constants";

export type ClientSearchFormValues = z.infer<typeof formSchema>;
