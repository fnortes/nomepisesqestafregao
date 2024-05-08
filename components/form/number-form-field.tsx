import { Euro } from "lucide-react";

import { Input } from "@/components/ui/input";
import FormFieldBase from "./form-field-base";

import type {
  CommonFieldProps,
  InputProps,
} from "@/components/form/form.types";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> extends CommonFieldProps<T> {
  input: InputProps;
  showCurrency?: boolean;
}

export default function NumberFormField<T extends FieldValues>({
  description,
  form,
  input,
  label,
  loading,
  name,
  showCurrency = false,
}: Readonly<Props<T>>) {
  const [currencyFormControlContainerClassName, currencyInputClassName] =
    showCurrency ? ["relative", "pr-6"] : ["", ""];

  const renderInput = (field: ControllerRenderProps<T, Path<T>>) => {
    return (
      <div className={currencyFormControlContainerClassName}>
        <Input
          className={currencyInputClassName}
          disabled={loading || input.disabled}
          name={field.name}
          onBlur={field.onBlur}
          onChange={(e) => {
            const newValue = e.target.value;
            field.onChange(newValue !== "" ? +newValue : null);
          }}
          placeholder={input.placeholder}
          ref={field.ref}
          type="number"
          value={field.value as InputProps["value"]}
        />
        {showCurrency && <Euro className="w-4 h-4 absolute top-3 right-1" />}
      </div>
    );
  };

  return (
    <FormFieldBase
      form={form}
      name={name}
      label={label}
      input={renderInput}
      description={description}
    />
  );
}
