import * as z from "zod";

import { formSchema } from "./settings-form.constants";

export type SettingsFormValues = z.infer<typeof formSchema>;
