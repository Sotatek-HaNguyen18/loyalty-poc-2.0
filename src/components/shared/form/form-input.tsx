import { Controller, useFormContext } from "react-hook-form";

import { Input } from "antd";

import { FormFieldWrapper } from "./form-field-wrapper";

type FormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  hint?: string;
};

export const FormInput = ({
  name,
  label,
  placeholder,
  disabled,
  required,
  hint,
}: FormInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormFieldWrapper
          error={error}
          hint={hint}
          label={label}
          required={required}
        >
          <Input
            {...field}
            className="w-full! text-text! text-xs!"
            disabled={disabled}
            placeholder={placeholder}
            size="large"
            status={error ? "error" : undefined}
          />
        </FormFieldWrapper>
      )}
    />
  );
};
