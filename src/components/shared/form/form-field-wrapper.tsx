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

export const FormFieldWrapper = ({ label, required, error, hint, children }: FormFieldWrapperProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#17211d]">
        {label}

        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </label>

      {children}

      {error ? <Text className="!text-xs !text-red-500">{error}</Text> : hint ? <Text className="!text-xs !text-[#7d8a85]">{hint}</Text> : null}
    </div>
  );
};
