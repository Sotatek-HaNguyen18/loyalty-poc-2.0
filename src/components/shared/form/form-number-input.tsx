import { Controller, useFormContext } from "react-hook-form";

import { InputNumber } from "antd";

import { FormFieldWrapper } from "./form-field-wrapper";

type FormNumberInputProps = {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  suffix?: string;
  min?: number;
  max?: number;
};

export const FormNumberInput = ({ name, label, required, hint, suffix, min, max }: FormNumberInputProps) => {
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
        <FormFieldWrapper error={error} hint={hint} label={label} required={required}>
          <InputNumber
            {...field}
            className="w-full"
            controls={false}
            max={max}
            min={min}
            parser={(value) => {
              if (!value) return "";

              return value.replace(/[^\d.]/g, "");
            }}
            size="large"
            status={error ? "error" : undefined}
            suffix={suffix}
            onKeyDown={(e) => {
              const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

              if (allowedKeys.includes(e.key)) {
                return;
              }

              // only allow digits
              if (!/^\d$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </FormFieldWrapper>
      )}
    />
  );
};
