import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { CommonFieldProps } from "@/components/form/form.types";
import type { FieldValues } from "react-hook-form";
import { DateTimePicker } from "./date-time-picker";

interface Props<T extends FieldValues> extends CommonFieldProps<T> {
  readonly description: string;
}

export default function DateTimeFormField<T extends FieldValues>({
  description,
  form,
  label,
  loading,
  name,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DateTimePicker
              granularity="second"
              jsDate={field.value}
              onJsDateChange={field.onChange}
              isDisabled={loading}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
