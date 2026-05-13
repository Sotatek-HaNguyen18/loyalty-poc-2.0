import type { ReactNode } from "react";

import { Typography } from "antd";

const { Text } = Typography;

type FormFieldWrapperProps = {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export const FormFieldWrapper = ({
  label,
  required,
  error,
  hint,
  children,
}: FormFieldWrapperProps) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-[12.5px] font-medium text-text-2">
        {label}

        {required ? <span className="ml-0.5 text-danger">*</span> : null}
      </label>

      {children}

      {error ? (
        <Text className="text-[11.5px]! text-red-500!">{error}</Text>
      ) : hint ? (
        <Text className="text-[11.5px]! text-text-3!">{hint}</Text>
      ) : null}
    </div>
  );
};
