import { Controller, useFormContext } from "react-hook-form";

import { InboxOutlined } from "@ant-design/icons";

import {
  message,
  Upload,
  type UploadFile,
  type UploadProps,
} from "antd";

import { FormFieldWrapper } from "./form-field-wrapper";

const { Dragger } = Upload;

type FormUploadProps = {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
};

export const FormUpload = ({
  name,
  label,
  required,
  hint,
}: FormUploadProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  const handleBeforeUpload: UploadProps["beforeUpload"] = (
    file,
  ) => {
    const isPDF =
      file.type === "application/pdf";

    if (!isPDF) {
      message.error(
        "Chỉ được upload file PDF"
      );

      return Upload.LIST_IGNORE;
    }

    const isLt10MB =
      file.size / 1024 / 1024 < 10;

    if (!isLt10MB) {
      message.error(
        "File phải nhỏ hơn 10MB"
      );
      return Upload.LIST_IGNORE;
    }

    return false;
  };

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
          <Dragger
            accept=".pdf"
            beforeUpload={handleBeforeUpload}
            fileList={field.value || []}
            maxCount={1}
            multiple={false}
            onChange={({ fileList }) => {
              const validFiles =
                fileList.filter(
                  (file: UploadFile) =>
                    file.type ===
                    "application/pdf"
                );

              field.onChange(validFiles);
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>

            <p className="ant-upload-text">
              Kéo thả file PDF vào đây
            </p>

            <p className="text-xs text-[#7d8a85]">
              PDF ≤ 10MB
            </p>
          </Dragger>
        </FormFieldWrapper>
      )}
    />
  );
};