import { useForm } from "react-hook-form";
import { useCreateListedGoldStore } from "../../../stores/useCreateListedGoldStore";
import {
  DateField,
  SelectField,
  StepFooter,
  StepHeader,
  TextAreaField,
  TextField,
} from "../components/shared";
import type { BasicInformationData, CreateStepPageProps } from "./types";

export const BasicInformationStep = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
}: CreateStepPageProps) => {
  const { basicInformation, setBasicInformation } = useCreateListedGoldStore();
  const { control, handleSubmit } = useForm<BasicInformationData>({
    defaultValues: basicInformation,
  });

  const onSubmit = (data: BasicInformationData) => {
    setBasicInformation(data);
    onNext();
  };

  return (
    <form
      className="rounded-[28px] border border-app-border bg-card p-8 shadow-card xl:p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StepHeader
        description="Điền các thông tin cơ bản về đợt niêm yết. Các thông tin này sẽ hiển thị trực tiếp cho nhà đầu tư trên ứng dụng di động."
        stepLabel="Bước 1 / 4"
        title="Thông tin cơ bản"
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <TextField
          control={control}
          helper="Tự sinh — chỉ đọc"
          label="Mã đợt niêm yết"
          isRequired={true}
          name="listingId"
        />
        <SelectField
          control={control}
          label="Trạng thái niêm yết ban đầu"
          isRequired={true}
          name="initialListingStatus"
          options={["Active"]}
        />
      </div>

      <div className="mt-8">
        <TextField
          control={control}
          helper="5–100 ký tự · Hiển thị trên Catalog"
          label="Tên hiển thị"
          isRequired={true}
          name="displayName"
        />
      </div>

      <div className="mt-8">
        <TextAreaField
          control={control}
          helper="500 ký tự"
          label="Mô tả ngắn"
          isRequired={true}
          name="shortDescription"
          rows={4}
        />
      </div>

      <div className="mt-8 max-w-[360px]">
        <DateField
          control={control}
          label="Ngày bắt đầu giao dịch"
          isRequired={true}
          name="tradingStartDate"
        />
      </div>

      <StepFooter
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        onBack={onBack}
        onSaveDraft={onSaveDraft}
      />
    </form>
  );
};
