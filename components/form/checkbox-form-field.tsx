import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import type { CommonFieldProps } from "@/components/form/form.types";
import type { CheckboxProps, CheckedState } from "@radix-ui/react-checkbox";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> extends CommonFieldProps<T> {
  readonly description?: string;
  readonly onCheck?: (
    field: ControllerRenderProps<T, Path<T>>
  ) => CheckboxProps["checked"];
  readonly onCheckedChange?: (
    field: ControllerRenderProps<T, Path<T>>,
    checked: CheckedState
  ) => void;
}

export default function CheckboxFormField<T extends FieldValues>({
  description,
  form,
  label,
  loading,
  name,
  onCheck,
  onCheckedChange,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={onCheck ? onCheck(field) : field.value}
              disabled={loading}
              onCheckedChange={(checked) =>
                onCheckedChange
                  ? onCheckedChange(field, checked)
                  : field.onChange
              }
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
