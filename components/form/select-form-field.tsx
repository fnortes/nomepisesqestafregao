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

import type {
  CommonFieldProps,
  CommonFormFieldData,
} from "@/components/form/form.types";
import type { FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> extends CommonFieldProps<T> {
  readonly data: CommonFormFieldData;
  readonly description?: string;
  readonly placeholder?: string;
}

export default function SelectFormField<T extends FieldValues>({
  data,
  description,
  form,
  label,
  loading,
  name,
  placeholder,
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
                <SelectValue placeholder={placeholder} />
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
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
