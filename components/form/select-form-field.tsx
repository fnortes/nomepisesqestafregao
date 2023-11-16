import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import type { CommonFieldProps } from "@/components/form/form.types";
import type { FieldValues } from "react-hook-form";

export interface SelectFormFieldDataItem {
  label?: string;
  value: string;
}
export type SelectFormFieldData = SelectFormFieldDataItem[];

interface Props<T extends FieldValues> extends CommonFieldProps<T> {
  readonly data: SelectFormFieldData;
  readonly description: string;
}

export default function SelectFormField<T extends FieldValues>({
  data,
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
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={loading}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label ?? value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
