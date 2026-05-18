import { CircleDollarSign } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { useCreateListedGoldStore } from "../../../stores/useCreateListedGoldStore";
import {
  SectionHeading,
  SelectField,
  StepFooter,
  StepHeader,
  TextField,
} from "../components/shared";
import type { CreateStepPageProps, TokenizationData } from "./types";

export const TokenizationStep = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
}: CreateStepPageProps) => {
  const { physicalGold, tokenization, setTokenization } =
    useCreateListedGoldStore();
  const { control, handleSubmit } = useForm<TokenizationData>({
    defaultValues: tokenization,
  });
  const tokenizationRatio = useWatch({
    control,
    name: "tokenizationRatio",
  });
  const totalWeight = physicalGold.totalWeight || 0;

  const numberFormatter = useMemo(() => new Intl.NumberFormat("vi-VN"), []);
  const totalTokens = useMemo(() => {
    if (!tokenizationRatio || !totalWeight) return 0;

    return totalWeight / 3.75 / tokenizationRatio;
  }, [tokenizationRatio, totalWeight]);
  const issuedTokens = Math.floor(totalTokens);
  const ratioText = tokenizationRatio
    ? tokenizationRatio.toLocaleString("vi-VN")
    : "-";

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
        description="Cấu hình kinh tế của token: tỷ lệ token hóa, giá khởi tạo, phí giao dịch và hạn mức. Các giá trị này được mã hóa trực tiếp vào smart contract."
        stepLabel="Bước 3 / 4"
        title="Tokenization"
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <TextField
          control={control}
          helper="Tự sinh từ mã đợt"
          label="Tên token"
          isRequired={true}
          name="tokenName"
        />
        <SelectField
          control={control}
          label="Tỷ lệ token hóa"
          isRequired={true}
          name="tokenizationRatio"
          options={[
            { label: "1 BGT = 0,01 chỉ", value: 0.01 },
            { label: "1 BGT = 1 chỉ", value: 1 },
          ]}
        />
      </div>

      <div className="mt-8 rounded-2xl bg-primary-50 px-5 py-5">
        <div className="flex items-start gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bidv-green text-white">
            <CircleDollarSign className="h-4 w-4" />
          </div>
          <div>
            <div className="text-base font-semibold text-bidv-green">
              Tổng số token sẽ được mint: {numberFormatter.format(issuedTokens)}{" "}
              BGT
            </div>
            <div className="mt-2 text-sm text-text-2">
              {numberFormatter.format(totalWeight)}g × (1 chỉ / 3,75g) ÷{" "}
              {ratioText} = {numberFormatter.format(issuedTokens)} BGT
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-[420px]">
        <TextField
          control={control}
          helper="Đối chiếu giá SJC tham chiếu hôm nay: 950.000 đ/0,01 chỉ"
          label="Giá khởi tạo"
          isRequired={true}
          name="initialPrice"
          rightAddon="VND / token"
        />
      </div>

      <div className="mt-10 border-t border-app-border pt-8">
        <SectionHeading>Phí & hạn mức giao dịch</SectionHeading>
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <TextField
            control={control}
            helper="Phần trăm trên giá trị giao dịch (0–1%)"
            label="Phí mua"
            isRequired={true}
            name="buyFee"
            rightAddon="%"
          />
          <TextField
            control={control}
            helper="Phần trăm trên giá trị giao dịch (0–1%)"
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
            rightAddon="BGT"
          />
          <TextField
            control={control}
            helper={`≤ ${numberFormatter.format(issuedTokens)} BGT (tổng phát hành)`}
            label="Hạn mức tối đa / GD"
            isRequired={true}
            name="maxPurchaseLimit"
            rightAddon="BGT"
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
