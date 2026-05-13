import { Controller, useFormContext } from 'react-hook-form'

import { Select } from 'antd'

import { FormFieldWrapper } from './form-field-wrapper'

type Option = {
  label: string
  value: string
}

type FormSelectProps = {
  name: string
  label: string
  options: Option[]
  required?: boolean
  hint?: string
}

export const FormSelect = ({
  name,
  label,
  options,
  required,
  hint,
}: FormSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

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
          <Select
            {...field}
            options={options}
            size="large"
            status={error ? 'error' : undefined}
          />
        </FormFieldWrapper>
      )}
    />
  )
}