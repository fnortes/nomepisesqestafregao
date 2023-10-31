import { Input } from "../ui/input";

import type { ComponentProps } from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export type InputProps = ComponentProps<typeof Input>;

export interface CommonFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  loading: boolean;
  name: FieldPath<T>;
}
