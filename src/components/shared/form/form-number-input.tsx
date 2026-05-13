import { Controller, useFormContext } from "react-hook-form";

import { InputNumber, Space } from "antd";

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

export const FormNumberInput = ({
  name,
  label,
  required,
  hint,
  suffix,
  min,
  max,
}: FormNumberInputProps) => {
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
          <Space.Compact block className="mb-0!">
            <InputNumber
              {...field}
              className="w-full! text-text! text-xs!"
              controls={false}
              max={max}
              min={min}
              parser={(value) => {
                if (!value) return "";

                return value.replace(/[^\d.]/g, "");
              }}
              size="large"
              status={error ? "error" : undefined}
              onKeyDown={(e) => {
                const allowedKeys = [
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                  "Tab",
                ];

                if (allowedKeys.includes(e.key)) {
                  return;
                }

                // only allow digits
                if (!/^\d$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            {suffix && (
              <Space.Addon className="bg-app-bg! text-text-2! border-l! border-border-strong! text-xs! z-0!">
                {suffix}
              </Space.Addon>
            )}
          </Space.Compact>
        </FormFieldWrapper>
      )}
    />
  );
};
