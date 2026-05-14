import { useForm } from "react-hook-form";
import { useCreateRealEstateStore } from "@/stores/useCreateRealEstateStore";
import {
  SectionHeading,
  SelectField,
  StepFooter,
  StepHeader,
  TextField,
} from "../components/shared";
import type { CreateStepPageProps, TokenizationData } from "./types";
import { Info } from "lucide-react";

export const TokenizationStep = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
}: CreateStepPageProps) => {
  const { tokenization, setTokenization, realEstate } =
    useCreateRealEstateStore();
  const { control, handleSubmit, watch } = useForm<TokenizationData>({
    defaultValues: tokenization,
  });

  const onSubmit = (data: TokenizationData) => {
    setTokenization(data);
    onNext();
  };

  const initialPrice = watch("initialPrice");
  // Mock calculation for the info box based on design image
  const totalTokens = realEstate.valuationAmount
    ? Math.floor(realEstate.valuationAmount / 1000000)
    : 380000;

  return (
    <form
      className="rounded-[28px] border border-app-border bg-white p-8 shadow-[0_18px_55px_rgba(8,31,20,0.05)] xl:p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StepHeader
        description="Cấu hình kinh tế của token BRT: tỷ lệ token hóa theo VND/m², giá khởi tạo, mô hình thu nhập từ vận hành. Các giá trị này được encode trực tiếp vào smart contract."
        stepLabel="Bước 3 / 4"
        title="Tokenization"
      />

      <div className="mt-8 space-y-8">
        <div className="grid gap-6 xl:grid-cols-2">
          <TextField
            control={control}
            helper="Tự sinh từ mã đợt + viết tắt dự án"
            label="Tên token"
            isRequired={true}
            name="tokenName"
          />
          <SelectField
            control={control}
            helper="Mệnh giá quy ước của 1 BRT"
            label="Tỷ lệ token hóa"
            isRequired={true}
            name="tokenizationRatio"
            options={["1 BRT = 1.000.000 VND", "1 BRT = 500.000 VND"]}
          />
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-4 rounded-xl bg-[#edf5f1] p-4">
          <div className="mt-1 rounded-full bg-bidv-green p-1 text-white">
            <Info className="h-4 w-4" />
          </div>
          <div>
            <div className="text-base font-semibold text-[#16211d]">
              Tổng số token sẽ được mint: {totalTokens.toLocaleString()} BRT
            </div>
            <div className="mt-1 text-sm text-[#53635c]">
              Định giá{" "}
              {realEstate.valuationAmount?.toLocaleString() || "380 tỷ"} VND ÷
              1.000.000 VND/BRT = {totalTokens.toLocaleString()} BRT · Mỗi BRT
              đại diện cho 0.0216 m² sàn
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <TextField
            control={control}
            helper="Đối chiếu mệnh giá 1.000.000 VND · Premium +5.00%"
            label="Giá khởi tạo trên sàn"
            isRequired={true}
            name="initialPrice"
            rightAddon="VND / BRT"
          />
        </div>

        <div className="border-t border-app-border pt-8">
          <SectionHeading>MÔ HÌNH THU NHẬP</SectionHeading>
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            <SelectField
              control={control}
              label="Mô hình phân phối"
              isRequired={true}
              name="distributionModel"
              options={["Rental yield — phân phối quý", "Capital growth"]}
            />
            <TextField
              control={control}
              helper="Tham chiếu rental yield của khu vực"
              label="Lợi suất kỳ vọng"
              isRequired={true}
              name="expectedYield"
              rightAddon="% / năm"
            />
            <TextField
              control={control}
              label="Lock-up giai đoạn đầu"
              isRequired={true}
              name="lockupPeriod"
              rightAddon="tháng"
            />
          </div>
        </div>

        <div className="border-t border-app-border pt-8">
          <SectionHeading>PHÍ & HẠN MỨC GIAO DỊCH</SectionHeading>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <TextField
              control={control}
              helper="0,1 - 1,0% — bao gồm phí SPV + sàn"
              label="Phí mua"
              isRequired={true}
              name="buyFee"
              rightAddon="%"
            />
            <TextField
              control={control}
              helper="0,1 - 1,0%"
              label="Phí bán"
              isRequired={true}
              name="sellFee"
              rightAddon="%"
            />
            <TextField
              control={control}
              label="Hạn mức tối thiểu / GD"
              isRequired={true}
              name="minPurchaseLimit"
              rightAddon="BRT"
            />
            <TextField
              control={control}
              helper={`≤ ${totalTokens.toLocaleString()} BRT (tổng phát hành)`}
              label="Hạn mức tối đa / GD"
              isRequired={true}
              name="maxPurchaseLimit"
              rightAddon="BRT"
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
