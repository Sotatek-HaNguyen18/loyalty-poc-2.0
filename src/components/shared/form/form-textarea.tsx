import { Controller, useFormContext } from 'react-hook-form'

import { Input } from 'antd'

import { FormFieldWrapper } from './form-field-wrapper'

const { TextArea } = Input

type FormTextareaProps = {
  name: string
  label: string
  required?: boolean
  hint?: string
  rows?: number
}

export const FormTextarea = ({
  name,
  label,
  required,
  hint,
  rows = 4,
}: FormTextareaProps) => {
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
          <TextArea
            {...field}
            rows={rows}
            status={error ? 'error' : undefined}
          />
        </FormFieldWrapper>
      )}
    />
  )
}