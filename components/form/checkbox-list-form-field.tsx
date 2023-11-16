import CheckboxFormField from "./checkbox-form-field";

import type {
  CommonFieldProps,
  CommonFormFieldData,
} from "@/components/form/form.types";
import type { CheckedState } from "@radix-ui/react-checkbox";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues>
  extends Omit<CommonFieldProps<T>, "label"> {
  readonly data: CommonFormFieldData;
}

export default function CheckboxListFormField<T extends FieldValues>({
  data,
  form,
  loading,
  name,
}: Props<T>) {
  const handleCheckedChange = (
    field: ControllerRenderProps<T, Path<T>>,
    checked: CheckedState,
    value: string
  ) =>
    checked
      ? field.onChange([...field.value, value])
      : field.onChange(field.value?.filter((val: string) => val !== value));

  return (
    <>
      {data.map(({ value, label }) => (
        <CheckboxFormField
          key={value}
          form={form}
          label={label ?? value}
          loading={loading}
          name={name}
          onCheck={(field) => field.value?.includes(value)}
          onCheckedChange={(field, checked) =>
            handleCheckedChange(field, checked, value)
          }
        />
      ))}
    </>
  );
}
