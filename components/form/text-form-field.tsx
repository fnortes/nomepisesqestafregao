import { Input } from "@/components/ui/input";
import FormFieldBase from "./form-field-base";

import type {
  CommonFieldProps,
  InputProps,
} from "@/components/form/form.types";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> extends CommonFieldProps<T> {
  readonly input: InputProps;
}

export default function TextFormField<T extends FieldValues>({
  form,
  input,
  label,
  loading,
  name,
}: Props<T>) {
  const renderInput = (field: ControllerRenderProps<T, Path<T>>) => {
    return (
      <Input
        disabled={loading}
        name={field.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        placeholder={input.placeholder}
        ref={field.ref}
        value={field.value as InputProps["value"]}
      />
    );
  };

  return (
    <FormFieldBase form={form} name={name} label={label} input={renderInput} />
  );
}
