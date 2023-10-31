import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import type { ReactNode } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import type { CommonFieldProps } from "./form.types";

interface Props<T extends FieldValues>
  extends Omit<CommonFieldProps<T>, "loading"> {
  input: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
}

export default function FormFieldBase<T extends FieldValues>({
  form,
  input,
  label,
  name,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{input(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
