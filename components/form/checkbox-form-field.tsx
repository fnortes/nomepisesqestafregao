import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";

import type { CommonFieldProps } from "@/components/form/form.types";
import type { FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> extends CommonFieldProps<T> {
  readonly description?: string;
}

export default function CheckboxFormField<T extends FieldValues>({
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
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              disabled={loading}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
}
