import dayjs from "dayjs";

import { Controller, useFormContext } from "react-hook-form";

import { DatePicker } from "antd";

import { FormFieldWrapper } from "./form-field-wrapper";

type FormDatePickerProps = {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
};

export const FormDatePicker = ({ name, label, required, hint }: FormDatePickerProps) => {
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
          <DatePicker
            format="MM/DD/YYYY"
            inputReadOnly
            onChange={(date) => field.onChange(date?.toISOString()) ?? null}
            size="large"
            status={error ? "error" : undefined}
            value={field.value ? dayjs(field.value) : null}
          />
        </FormFieldWrapper>
      )}
    />
  );
};
