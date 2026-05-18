import { useMemo } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Checkbox } from "antd";
import { useCreateCarbonStore } from "@/stores/useCreateCarbonStore";
import {
  SectionHeading,
  SelectField,
  StepFooter,
  StepHeader,
  TextField,
} from "../components/shared";
import type { CreateStepPageProps, TokenizationData } from "./types";
import { Info } from "lucide-react";

const TOKENIZATION_RATIO_OPTIONS = [
  { label: "1 BCT = 1 tCO2e (chuẩn)", value: 1 },
  { label: "1 BCT = 0.1 tCO2e (fractional)", value: 0.1 },
] as const;

export const TokenizationStep = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
}: CreateStepPageProps) => {
  const { carbonProject, tokenization, setTokenization } =
    useCreateCarbonStore();
  const { control, handleSubmit } = useForm<TokenizationData>({
    defaultValues: tokenization,
  });
  const tokenizationRatio = useWatch({
    control,
    name: "tokenizationRatio",
  });

  const numberFormatter = useMemo(() => new Intl.NumberFormat("vi-VN"), []);
  const totalIssuedCredits = carbonProject.totalIssuedCredits || 0;
  const vvb = carbonProject.vvb?.trim() || "đơn vị xác minh độc lập";

  const issuedTokens = useMemo(() => {
    if (!tokenizationRatio || !totalIssuedCredits) return 0;
    return Math.floor(totalIssuedCredits / tokenizationRatio);
  }, [tokenizationRatio, totalIssuedCredits]);

  const ratioText = useMemo(() => {
    if (!tokenizationRatio) return "-";
    return tokenizationRatio.toLocaleString("vi-VN");
  }, [tokenizationRatio]);

  const onSubmit = (data: TokenizationData) => {
    setTokenization(data);
    onNext();
  };

  return (
    <form
      className="rounded-[28px] border border-app-border bg-card p-8 shadow-card xl:p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StepHeader
        description="Cấu hình kinh tế của token BCT. Tỷ lệ 1 BCT = 1 tCO2e (chuẩn quốc tế). Người mua có thể 'retire' token để chính thức ghi nhận giảm phát thải vào CSR/ESG báo cáo."
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
            helper="Chuẩn ICVCM: 1 token = 1 tCO2e"
            label="Tỷ lệ token hóa"
            isRequired={true}
            name="tokenizationRatio"
            options={[...TOKENIZATION_RATIO_OPTIONS]}
          />
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-4 rounded-xl bg-primary-50 p-4">
          <div className="mt-1 rounded-full bg-bidv-green p-1 text-white">
            <Info className="h-4 w-4" />
          </div>
          <div>
            <div className="text-base font-semibold text-text">
              Tổng số token sẽ được mint: {numberFormatter.format(issuedTokens)}{" "}
              BCT
            </div>
            <div className="mt-1 text-sm text-text-2">
              {numberFormatter.format(totalIssuedCredits)} tCO2e ÷ {ratioText} ={" "}
              {numberFormatter.format(issuedTokens)} BCT · Mỗi BCT đại diện{" "}
              {ratioText} tCO2e đã được verify bởi {vvb}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <TextField
            control={control}
            helper="Tham chiếu giá VCS tự nguyện 2026: 95.000 - 145.000đ/tCO2e"
            label="Giá khởi tạo trên sàn"
            isRequired={true}
            name="initialPrice"
            rightAddon="VND / BCT"
          />
        </div>

        <div className="border-t border-app-border pt-8">
          <SectionHeading>CƠ CHẾ RETIREMENT</SectionHeading>
          <div className="mt-6 space-y-6">
            <div>
              <div className="mb-2 text-sm font-semibold text-text">
                Cho phép retirement on-chain
              </div>
              <Controller
                control={control}
                name="enableRetirement"
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    className="font-semibold text-bidv-green"
                  >
                    Bật retirement — phát hành Retirement Certificate NFT
                  </Checkbox>
                )}
              />
              <p className="mt-2 text-base text-text-3">
                Cho phép NĐT/doanh nghiệp burn token để ghi nhận giảm phát thải
                vào báo cáo ESG
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <TextField
                control={control}
                helper="Phí phát hành certificate + ghi nhận với registry"
                label="Phí retirement"
                isRequired={true}
                name="retirementFee"
                rightAddon="VND / cert."
              />
            </div>
          </div>
        </div>

        <div className="border-t border-app-border pt-8">
          <SectionHeading>PHÍ & HẠN MỨC GIAO DỊCH</SectionHeading>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <TextField
              control={control}
              helper="Thấp hơn vàng/BĐS để khuyến khích thị trường"
              label="Phí mua"
              isRequired={true}
              name="buyFee"
              rightAddon="%"
            />
            <TextField
              control={control}
              label="Phí bán"
              isRequired={true}
              name="sellFee"
              rightAddon="%"
            />
            <TextField
              control={control}
              helper="Hỗ trợ retail nhỏ — chỉ từ 1 tCO2e"
              label="Hạn mức tối thiểu / GD"
              isRequired={true}
              name="minPurchaseLimit"
              rightAddon="BCT"
            />
            <TextField
              control={control}
              helper={`≤ ${numberFormatter.format(issuedTokens)} BCT (tổng phát hành)`}
              label="Hạn mức tối đa / GD"
              isRequired={true}
              name="maxPurchaseLimit"
              rightAddon="BCT"
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
