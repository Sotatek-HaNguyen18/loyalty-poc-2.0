import { Info } from "lucide-react";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useCreateRealEstateStore } from "@/stores/useCreateRealEstateStore";
import {
  SectionHeading,
  SelectField,
  StepFooter,
  StepHeader,
  TextField,
} from "../components/shared";
import type { CreateStepPageProps, TokenizationData } from "./types";

const TOKENIZATION_RATIO_OPTIONS = [
  { label: "1 BRT = 100.000 VND", value: 100_000 },
  { label: "1 BRT = 1.000.000 VND", value: 1_000_000 },
  { label: "1 BRT = 10.000.000 VND", value: 10_000_000 },
] as const;

export const TokenizationStep = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
}: CreateStepPageProps) => {
  const { tokenization, setTokenization, realEstate } =
    useCreateRealEstateStore();
  const { control, handleSubmit } = useForm<TokenizationData>({
    defaultValues: tokenization,
  });
  const tokenizationRatio = useWatch({
    control,
    name: "tokenizationRatio",
  });
  const initialPrice = useWatch({
    control,
    name: "initialPrice",
  });

  const numberFormatter = useMemo(() => new Intl.NumberFormat("vi-VN"), []);
  const valuationAmount = realEstate.valuationAmount || 0;
  const floorArea = realEstate.floorArea || 0;

  const issuedTokens = useMemo(() => {
    if (!tokenizationRatio || !valuationAmount) return 0;
    return Math.floor(valuationAmount / tokenizationRatio);
  }, [tokenizationRatio, valuationAmount]);

  const sqmPerToken = useMemo(() => {
    if (!issuedTokens || !floorArea) return 0;
    return floorArea / issuedTokens;
  }, [issuedTokens, floorArea]);

  const ratioLabel = useMemo(() => {
    if (!tokenizationRatio) return "-";
    return `${numberFormatter.format(tokenizationRatio)} VND/BRT`;
  }, [tokenizationRatio, numberFormatter]);

  const premiumPercent = useMemo(() => {
    const price = Number(initialPrice) || 0;
    if (!valuationAmount || !issuedTokens || !price) return null;

    const initialMarketCap = issuedTokens * price;
    return ((initialMarketCap - valuationAmount) / valuationAmount) * 100;
  }, [initialPrice, valuationAmount, issuedTokens]);

  const initialPriceHelper = useMemo(() => {
    if (!tokenizationRatio) {
      return "Đối chiếu mệnh giá quy ước · Premium —";
    }

    const premiumText =
      premiumPercent == null
        ? "—"
        : `${premiumPercent >= 0 ? "+" : ""}${premiumPercent.toFixed(2)}%`;

    return `Đối chiếu mệnh giá ${numberFormatter.format(tokenizationRatio)} VND · Premium ${premiumText}`;
  }, [tokenizationRatio, premiumPercent, numberFormatter]);

  const onSubmit = (data: TokenizationData) => {
    setTokenization(data);
    onNext();
  };

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
            options={[...TOKENIZATION_RATIO_OPTIONS]}
          />
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-4 rounded-xl bg-[#edf5f1] p-4">
          <div className="mt-1 rounded-full bg-bidv-green p-1 text-white">
            <Info className="h-4 w-4" />
          </div>
          <div>
            <div className="text-base font-semibold text-[#16211d]">
              Tổng số token sẽ được mint: {numberFormatter.format(issuedTokens)}{" "}
              BRT
            </div>
            <div className="mt-1 text-sm text-[#53635c]">
              Định giá {numberFormatter.format(valuationAmount)} VND ÷{" "}
              {ratioLabel} = {numberFormatter.format(issuedTokens)} BRT · Mỗi
              BRT đại diện cho{" "}
              {sqmPerToken > 0
                ? sqmPerToken.toLocaleString("vi-VN", {
                    maximumFractionDigits: 4,
                  })
                : "-"}{" "}
              m² sàn
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <TextField
            control={control}
            helper={initialPriceHelper}
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
              helper={`≤ ${numberFormatter.format(issuedTokens)} BRT (tổng phát hành)`}
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
