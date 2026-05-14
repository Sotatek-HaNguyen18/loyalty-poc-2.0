import { useForm } from "react-hook-form";
import { useCreateListedGoldStore } from "../../../stores/useCreateListedGoldStore";
import {
  DateField,
  FileField,
  SectionHeading,
  SelectField,
  StepFooter,
  StepHeader,
  TextAreaField,
  TextField,
} from "../components/shared";
import type { CreateStepPageProps, PhysicalGoldData } from "./types";

export const PhysicalGoldStep = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
}: CreateStepPageProps) => {
  const { physicalGold, setPhysicalGold } = useCreateListedGoldStore();
  const { control, handleSubmit } = useForm<PhysicalGoldData>({
    defaultValues: physicalGold,
  });

  const onSubmit = (data: PhysicalGoldData) => {
    setPhysicalGold(data);
    onNext();
  };

  return (
    <form
      className="rounded-[28px] border border-app-border bg-white p-8 shadow-[0_18px_55px_rgba(8,31,20,0.05)] xl:p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StepHeader
        description="Thông tin về vàng vật chất đang được lưu ký. Mọi số seri phải khớp với hồ sơ kho của BIDV và biên bản giao nhận từ nhà cung cấp."
        stepLabel="Bước 2 / 4"
        title="Vàng vật chất"
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <TextField
          control={control}
          helper="= 666.67 chỉ · 66.67 lượng"
          label="Tổng khối lượng"
          isRequired={true}
          name="totalWeight"
          rightAddon="gram"
        />
        <TextField
          control={control}
          helper="Tự sinh — chỉ đọc"
          label="Mã đợt niêm yết"
          isRequired={true}
          name="listingId"
        />
        <SelectField
          control={control}
          label="Độ tinh khiết"
          isRequired={true}
          name="purity"
          options={["9999 (SJC)"]}
        />
        <SelectField
          control={control}
          label="Nhà cung cấp"
          isRequired={true}
          name="supplier"
          options={["SJC"]}
        />
      </div>

      <div className="mt-8">
        <TextAreaField
          control={control}
          helper="Mỗi dòng 1 seri · Định dạng: SJC-YYYY-XXXXXXXX"
          label="Số seri từng thỏi"
          isRequired={true}
          name="serialNumbers"
        />
      </div>

      <div className="mt-8 border-t border-app-border pt-8">
        <SectionHeading>Vị trí lưu ký</SectionHeading>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <SelectField
            control={control}
            label="Kho lưu trữ"
            isRequired={true}
            name="vault"
            options={["Kho Hội sở Hà Nội"]}
          />
          <TextField
            control={control}
            helper="Định dạng Tủ-Ngăn-Vị trí"
            label="Vị trí trong kho"
            isRequired={true}
            name="vaultPosition"
          />
        </div>
      </div>

      <div className="mt-8 border-t border-app-border pt-8">
        <SectionHeading>Kiểm định chất lượng</SectionHeading>
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <TextField
            control={control}
            label="Đơn vị kiểm tra"
            isRequired={true}
            name="inspector"
          />
          <DateField
            control={control}
            helper="≤ 6 tháng từ hôm nay"
            label="Ngày kiểm tra gần nhất"
            isRequired={true}
            name="lastInspectedDate"
          />
        </div>
        <div className="mt-8">
          <FileField
            control={control}
            label="Báo cáo kiểm tra (PDF)"
            isRequired={true}
            name="inspectionReport"
          />
        </div>
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
