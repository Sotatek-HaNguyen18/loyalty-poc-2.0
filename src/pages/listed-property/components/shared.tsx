import { cn } from "@/lib/utils";
import { Button, DatePicker, Input, Select, Upload, message } from "antd";
import dayjs from "dayjs";
import {
  ChevronLeft,
  Upload as UploadIcon,
  Wallet2Icon,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { Controller, type Control } from "react-hook-form";

const { TextArea } = Input;
const { Dragger } = Upload;

const DEFAULT_REQUIRED_MESSAGE = "Trường này là bắt buộc";

const renderFieldHintOrError = (
  error: { message?: string } | undefined,
  helper?: string,
) =>
  error?.message ? (
    <p className="mt-2 text-sm text-danger">{error.message}</p>
  ) : helper ? (
    <p className="mt-2 text-sm text-text-3">{helper}</p>
  ) : null;

type StepHeaderProps = {
  description: string;
  stepLabel: string;
  title: string;
};

type FormFieldProps = {
  control: Control<any>;
  name: string;
  helper?: string;
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  requiredMessage?: string;
};

type StepFooterProps = {
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext?: () => void;
  onSaveDraft: () => void;
  submitText?: string;
};

export const StepHeader = ({
  description,
  stepLabel,
  title,
}: StepHeaderProps) => {
  return (
    <>
      <div className="text-sm font-extrabold uppercase tracking-[0.18em] text-bidv-gold">
        {stepLabel}
      </div>
      <h2 className="mt-2 text-xl font-bold leading-tight text-text">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-muted-text">{description}</p>
      <div className="mt-8 border-b border-app-border" />
    </>
  );
};

export const SectionHeading = ({ children }: { children: ReactNode }) => (
  <div className="text-sm font-semibold text-text-3">{children}</div>
);

export const FieldLabel = ({
  label,
  isRequired,
}: {
  label: string;
  isRequired?: boolean;
}) => (
  <label className="mb-3 block text-sm font-semibold text-text-2">
    {label}
    {isRequired && <span className="ml-1 text-danger">*</span>}
  </label>
);

export const TextField = ({
  control,
  name,
  helper,
  label,
  isRequired,
  placeholder,
  requiredMessage,
  rightAddon,
}: FormFieldProps & { rightAddon?: string }) => {
  return (
    <div>
      <FieldLabel label={label} isRequired={isRequired} />
      <Controller
        control={control}
        name={name}
        rules={{
          required: isRequired
            ? (requiredMessage ?? DEFAULT_REQUIRED_MESSAGE)
            : false,
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              {...field}
              addonAfter={rightAddon}
              className="!h-12 !text-base"
              placeholder={placeholder}
              status={error ? "error" : ""}
            />
            {renderFieldHintOrError(error, helper)}
          </>
        )}
      />
    </div>
  );
};

export const SelectField = ({
  control,
  name,
  helper,
  label,
  isRequired,
  options = [],
  placeholder,
  requiredMessage,
}: FormFieldProps & {
  options?: { label: string; value: string | number }[] | string[];
}) => {
  const formattedOptions = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt,
  );

  return (
    <div>
      <FieldLabel label={label} isRequired={isRequired} />
      <Controller
        control={control}
        name={name}
        rules={{
          required: isRequired
            ? (requiredMessage ?? DEFAULT_REQUIRED_MESSAGE)
            : false,
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              {...field}
              className="!h-12 w-full !text-base"
              options={formattedOptions}
              placeholder={placeholder}
              status={error ? "error" : ""}
            />
            {renderFieldHintOrError(error, helper)}
          </>
        )}
      />
    </div>
  );
};

export const TextAreaField = ({
  control,
  name,
  helper,
  label,
  isRequired,
  rows = 5,
  placeholder,
  requiredMessage,
}: FormFieldProps & { rows?: number }) => {
  return (
    <div>
      <FieldLabel label={label} isRequired={isRequired} />
      <Controller
        control={control}
        name={name}
        rules={{
          required: isRequired
            ? (requiredMessage ?? DEFAULT_REQUIRED_MESSAGE)
            : false,
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextArea
              {...field}
              className="!text-base"
              placeholder={placeholder}
              rows={rows}
              status={error ? "error" : ""}
            />
            {renderFieldHintOrError(error, helper)}
          </>
        )}
      />
    </div>
  );
};

export const DateField = ({
  control,
  name,
  helper,
  label,
  isRequired,
  placeholder,
  requiredMessage,
}: FormFieldProps) => {
  return (
    <div>
      <FieldLabel label={label} isRequired={isRequired} />
      <Controller
        control={control}
        name={name}
        rules={{
          required: isRequired
            ? (requiredMessage ?? DEFAULT_REQUIRED_MESSAGE)
            : false,
        }}
        render={({
          field: { value, onChange, ...field },
          fieldState: { error },
        }) => (
          <>
            <DatePicker
              {...field}
              className="!h-12 w-full !text-base"
              format="DD/MM/YYYY"
              onChange={(date) =>
                onChange(date ? date.format("DD/MM/YYYY") : "")
              }
              placeholder={placeholder}
              status={error ? "error" : ""}
              value={value ? dayjs(value, "DD/MM/YYYY") : null}
            />
            {renderFieldHintOrError(error, helper)}
          </>
        )}
      />
    </div>
  );
};

export const FileCard = ({
  filename,
  meta,
  onRemove,
}: {
  filename: string;
  meta: string;
  onRemove?: () => void;
}) => {
  return (
    <div className="flex items-center rounded-sm justify-between border border-app-border bg-card px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center bg-pdf-accent-bg text-xs font-bold text-pdf-accent">
          PDF
        </div>
        <div>
          <div className="text-base font-semibold text-text">{filename}</div>
          <div className="text-xs text-text-3">{meta}</div>
        </div>
      </div>
      {onRemove && (
        <button
          className="p-2 text-text-2 hover:bg-bg-alt"
          onClick={onRemove}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export const FileField = ({
  control,
  name,
  helper,
  label,
  isRequired,
  maxSizeMB = 10,
  requiredMessage,
}: FormFieldProps & { maxSizeMB?: number }) => {
  return (
    <div>
      <FieldLabel label={label} isRequired={isRequired} />
      <Controller
        control={control}
        name={name}
        rules={{
          required: isRequired
            ? (requiredMessage ?? DEFAULT_REQUIRED_MESSAGE)
            : false,
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const file = value as any;

          const beforeUpload = (file: File) => {
            const isPdf = file.type === "application/pdf";
            if (!isPdf) {
              message.error("Chỉ chấp nhận tệp PDF!");
            }
            const isLtSize = file.size / 1024 / 1024 < maxSizeMB;
            if (!isLtSize) {
              message.error(`Tệp phải nhỏ hơn ${maxSizeMB}MB!`);
            }
            return isPdf && isLtSize;
          };

          const handleUpload = (info: any) => {
            if (
              info.file.status === "done" ||
              info.file.status === "uploading"
            ) {
              onChange(info.file.originFileObj || info.file);
            }
          };

          if (file) {
            const filename = typeof file === "string" ? file : file.name;
            const meta =
              typeof file === "string"
                ? "Đã tải lên"
                : `${(file.size / 1024 / 1024).toFixed(1)} MB · Tải lên thành công`;

            return (
              <div className="space-y-2">
                <FileCard
                  filename={filename}
                  meta={meta}
                  onRemove={() => onChange(undefined)}
                />
                {renderFieldHintOrError(error, helper)}
              </div>
            );
          }

          return (
            <>
              <Dragger
                accept=".pdf"
                beforeUpload={beforeUpload}
                className={cn(
                  error ? "[&_.ant-upload-drag]:border-danger!" : "",
                )}
                customRequest={({ onSuccess }) =>
                  setTimeout(() => onSuccess?.("ok"), 0)
                }
                multiple={false}
                onChange={handleUpload}
                showUploadList={false}
              >
                <div className={error ? "border-danger" : ""}>
                  <UploadIcon className="mx-auto h-6 w-6 text-text-3" />
                  <div className="mt-4 text-xl font-semibold text-text">
                    Kéo thả tệp vào đây hoặc bấm để chọn
                  </div>
                  <div className="mt-1 text-base text-text-3">
                    PDF · Tối đa {maxSizeMB}MB
                  </div>
                </div>
              </Dragger>
              {renderFieldHintOrError(error, helper)}
            </>
          );
        }}
      />
    </div>
  );
};

export const StepFooter = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
  submitText,
}: StepFooterProps) => {
  return (
    <div className="mt-10 flex flex-col gap-4 border-t border-app-border pt-8 sm:flex-row sm:items-center sm:justify-between">
      <Button
        className={cn(
          "!h-12 !rounded-none !border-0 !bg-transparent !px-0 !text-base !font-semibold !text-text-3",
          isFirstStep && "!pointer-events-none !opacity-50",
        )}
        icon={<ChevronLeft className="h-4 w-4" />}
        onClick={onBack}
      >
        Quay lại
      </Button>
      <div className="flex items-center justify-end gap-3">
        <Button
          className="!h-11 !border-0 !bg-transparent !px-4 !text-base !font-semibold !text-text-2"
          onClick={onSaveDraft}
        >
          Lưu nháp
        </Button>
        <Button
          className="!h-11 !border-0 !bg-bidv-green !px-5 !text-base !font-semibold !text-white"
          htmlType={onNext ? "button" : "submit"}
          icon={isLastStep && <Wallet2Icon className="h-4 w-4" />}
          onClick={onNext}
          type="primary"
        >
          {submitText || (isLastStep ? "Ký với ví Admin" : "Tiếp tục")}
        </Button>
      </div>
    </div>
  );
};
