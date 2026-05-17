import { useForm } from "react-hook-form";
import { useCreateRealEstateStore } from "@/stores/useCreateRealEstateStore";
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
  const { basicInformation, setBasicInformation } = useCreateRealEstateStore();
  const { control, handleSubmit, watch } = useForm<BasicInformationData>({
    defaultValues: basicInformation,
  });

  const shortDescription = watch("shortDescription");

  const onSubmit = (data: BasicInformationData) => {
    setBasicInformation(data);
    onNext();
  };

  return (
    <form
      className="rounded-[28px] border border-app-border bg-white p-8 shadow-[0_18px_55px_rgba(8,31,20,0.05)] xl:p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StepHeader
        description="Thông tin định danh và hiển thị của dự án bất động sản trên hệ thống."
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
          label="Trạng thái khởi tạo"
          isRequired={true}
          name="initialListingStatus"
          options={["Active", "Paused", "Draft"]}
        />
        <div className="xl:col-span-2">
          <TextField
            control={control}
            helper="Tên thương mại hiển thị trên Market"
            label="Tên hiển thị dự án"
            isRequired={true}
            name="displayName"
            placeholder="VD: Vinhomes Ocean Park 3 — Tòa T15"
          />
        </div>
        <div className="xl:col-span-2">
          <TextAreaField
            control={control}
            helper={`${shortDescription?.length || 0}/500 ký tự`}
            label="Mô tả ngắn"
            isRequired={true}
            placeholder="Mô tả tóm tắt về vị trí và tiềm năng dự án..."
            name="shortDescription"
            rows={4}
          />
        </div>
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
