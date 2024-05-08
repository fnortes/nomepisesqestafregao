import { Input } from "../ui/input";

import type { ComponentProps } from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export type InputProps = ComponentProps<typeof Input>;

export interface CommonFieldProps<T extends FieldValues> {
  readonly className?: string;
  readonly description?: string;
  readonly form: UseFormReturn<T>;
  readonly label: string;
  readonly loading: boolean;
  readonly name: FieldPath<T>;
}

export interface CommonFormFieldDataItem {
  label?: string;
  value: string;
}
export type CommonFormFieldData = CommonFormFieldDataItem[];
