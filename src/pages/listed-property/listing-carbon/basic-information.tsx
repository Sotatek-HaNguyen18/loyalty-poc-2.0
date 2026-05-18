import { useForm } from "react-hook-form";
import { useCreateCarbonStore } from "@/stores/useCreateCarbonStore";
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
  const { basicInformation, setBasicInformation } = useCreateCarbonStore();
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
      className="rounded-[28px] border border-app-border bg-card p-8 shadow-card xl:p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StepHeader
        description="Mã đợt theo định dạng CC-YYYY-XXX. Mỗi đợt phải gắn với một dự án đã được verify bởi registry quốc tế (Verra, Gold Standard, ACR...)."
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
          options={["Active", "Paused", "Draft"]}
        />
        <div className="xl:col-span-2">
          <TextField
            control={control}
            helper="5-100 ký tự · Hiển thị trên Catalog"
            label="Tên dự án"
            isRequired={true}
            name="displayName"
            placeholder="VD: Rừng Cúc Phương — Phục hồi rừng bản địa (Vintage 2026)"
          />
        </div>
        <div className="xl:col-span-2">
          <TextAreaField
            control={control}
            helper={`${shortDescription?.length || 0}/500 ký tự`}
            label="Mô tả ngắn"
            isRequired={true}
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
