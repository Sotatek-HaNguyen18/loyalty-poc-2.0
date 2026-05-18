import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useCreateRealEstateStore } from "@/stores/useCreateRealEstateStore";
import {
  DateField,
  FileField,
  SectionHeading,
  SelectField,
  StepFooter,
  StepHeader,
  TextField,
} from "../components/shared";
import type { CreateStepPageProps, RealEstateData } from "./types";

export const RealEstateStep = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
}: CreateStepPageProps) => {
  const { realEstate, setRealEstate } = useCreateRealEstateStore();
  const { control, handleSubmit } = useForm<RealEstateData>({
    defaultValues: realEstate,
  });
  const valuationAmount = useWatch({
    control,
    name: "valuationAmount",
  });

  const valuationAmountHelper = useMemo(() => {
    const amount = Number(valuationAmount) || 0;
    if (!amount) return "= — tỷ VND";

    const ty = amount / 1_000_000_000;
    const formatted =
      ty % 1 === 0
        ? ty.toLocaleString("vi-VN", { maximumFractionDigits: 0 })
        : ty.toLocaleString("vi-VN", { maximumFractionDigits: 2 });

    return `= ${formatted} tỷ VND`;
  }, [valuationAmount]);

  const onSubmit = (data: RealEstateData) => {
    setRealEstate({
      ...data,
      valuationAmount: Number(data.valuationAmount) || 0,
    });
    onNext();
  };

  return (
    <form
      className="rounded-[28px] border border-app-border bg-card p-8 shadow-card xl:p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StepHeader
        description="Thông tin pháp lý và vật lý của bất động sản. SPV phải đã được thành lập trước khi niêm yết và sở hữu trực tiếp các chứng nhận quyền sử dụng đất."
        stepLabel="Bước 2 / 4"
        title="Tài sản BĐS"
      />

      <div className="mt-8 space-y-8">
        {/* General Info Section */}
        <div className="grid gap-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <SelectField
              control={control}
              label="Loại bất động sản"
              isRequired={true}
              name="propertyType"
              options={["Căn hộ chung cư cao cấp", "Văn phòng", "Shophouse"]}
            />
            <SelectField
              control={control}
              label="Chủ đầu tư"
              isRequired={true}
              name="developer"
              options={["Vinhomes", "Novaland", "Masterise Homes"]}
            />
          </div>

          <TextField
            control={control}
            label="Địa chỉ chi tiết"
            isRequired={true}
            name="detailAddress"
            placeholder="VD: Đường Nguyễn Xiển, P. Long Bình, TP. Thủ Đức"
          />

          <div className="grid gap-6 xl:grid-cols-3">
            <TextField
              control={control}
              label="Tỉnh / Thành phố"
              isRequired={true}
              name="province"
            />
            <TextField
              control={control}
              helper="m² — theo GCN-QSDĐ"
              label="Diện tích đất"
              isRequired={true}
              name="landArea"
              rightAddon="m²"
            />
            <TextField
              control={control}
              helper="m² sàn sử dụng"
              label="Diện tích sàn (NFA)"
              isRequired={true}
              name="floorArea"
              rightAddon="m²"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <TextField
              control={control}
              label="Số căn / Số đơn vị"
              isRequired={true}
              name="totalUnits"
              rightAddon="căn"
            />
            <TextField
              control={control}
              label="Tầng / Block niêm yết"
              isRequired={true}
              name="blockFloor"
            />
            <TextField
              control={control}
              label="Năm hoàn thành"
              isRequired={true}
              name="completionYear"
            />
          </div>
        </div>

        {/* Certificate Section */}
        <div className="border-t border-app-border pt-8">
          <SectionHeading>CHỨNG NHẬN QUYỀN SỬ DỤNG ĐẤT</SectionHeading>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <SelectField
              control={control}
              label="Loại chứng nhận"
              isRequired={true}
              name="certificateType"
              options={["Số Hồng — GCN QSDĐ và tài sản gắn liền", "Sổ Đỏ"]}
            />
            <TextField
              control={control}
              helper="Định dạng theo Sở TN&MT"
              label="Số seri / Số GCN"
              isRequired={true}
              name="certificateNumber"
            />
            <DateField
              control={control}
              label="Ngày cấp"
              isRequired={true}
              name="issueDate"
            />
            <TextField
              control={control}
              label="Cơ quan cấp"
              isRequired={true}
              name="issueAuthority"
            />
          </div>
        </div>

        {/* SPV Section */}
        <div className="border-t border-app-border pt-8">
          <SectionHeading>SPV (PHÁP NHÂN NẮM GIỮ TÀI SẢN)</SectionHeading>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <TextField
              control={control}
              helper="Phải là pháp nhân BIDV holding 100% vốn hoặc trust theo Nghị định 65"
              label="Tên SPV"
              isRequired={true}
              name="spvName"
            />
            <TextField
              control={control}
              label="Mã số doanh nghiệp"
              isRequired={true}
              name="businessCode"
            />
          </div>
        </div>

        {/* Valuation Section */}
        <div className="border-t border-app-border pt-8">
          <SectionHeading>ĐỊNH GIÁ ĐỘC LẬP</SectionHeading>
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            <SelectField
              control={control}
              label="Đơn vị thẩm định"
              isRequired={true}
              name="valuationUnit"
              options={["Savills Việt Nam", "CBRE", "Jones Lang LaSalle"]}
            />
            <DateField
              control={control}
              helper="≤ 6 tháng từ hôm nay"
              label="Ngày định giá"
              isRequired={true}
              name="valuationDate"
            />
            <TextField
              control={control}
              helper={valuationAmountHelper}
              label="Giá trị định giá (VND)"
              isRequired={true}
              name="valuationAmount"
              rightAddon="VND"
            />
          </div>
          <div className="mt-6">
            <FileField
              control={control}
              helper="Phải khớp giá trị nhập ở trên"
              label="Báo cáo định giá (PDF)"
              isRequired={true}
              name="valuationReport"
            />
          </div>
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
