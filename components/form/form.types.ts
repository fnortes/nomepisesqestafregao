import { Input } from "../ui/input";

import type { ComponentProps } from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export type InputProps = ComponentProps<typeof Input>;

export interface CommonFieldProps<T extends FieldValues> {
  readonly form: UseFormReturn<T>;
  readonly label: string;
  readonly loading: boolean;
  readonly name: FieldPath<T>;
}
