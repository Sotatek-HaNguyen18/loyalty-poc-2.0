import dayjs from "dayjs";

import { Controller, useFormContext } from "react-hook-form";

import { DatePicker } from "antd";

import { FormFieldWrapper } from "./form-field-wrapper";

type FormDatePickerProps = {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  showTime?: boolean;
};

export const FormDatePicker = ({
  name,
  label,
  required,
  hint,
  showTime,
}: FormDatePickerProps) => {
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
          <DatePicker
            className="w-full [&_.ant-picker-input>input]:text-xs!"
            format={showTime ? "DD/MM/YYYY HH:mm" : "DD/MM/YYYY"}
            inputReadOnly
            onChange={(date) => field.onChange(date?.toISOString() ?? null)}
            showTime={
              showTime ? { format: "HH:mm", use12Hours: false } : undefined
            }
            size="large"
            status={error ? "error" : undefined}
            value={field.value ? dayjs(field.value) : null}
          />
        </FormFieldWrapper>
      )}
    />
  );
};
