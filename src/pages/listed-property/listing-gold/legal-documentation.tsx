import { useForm } from "react-hook-form";
import { createAsset } from "@/services";
import { useCreateListedGoldStore } from "../../../stores/useCreateListedGoldStore";
import { FileField, StepFooter, StepHeader } from "../components/shared";
import type { CreateStepPageProps, LegalDocumentationData } from "./types";
import { CATEGORY_TYPE } from "@/services/assets/constants";

export const LegalDocumentationStep = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
}: CreateStepPageProps) => {
  const {
    legalDocumentation,
    setLegalDocumentation,
    physicalGold,
    basicInformation,
    tokenization,
  } = useCreateListedGoldStore();
  const { control, handleSubmit } = useForm<LegalDocumentationData>({
    defaultValues: legalDocumentation,
  });

  const onSubmit = async (data: LegalDocumentationData) => {
    setLegalDocumentation(data);
    const totalWeight = Number(physicalGold.totalWeight) || 0;
    const ratio = Number(tokenization.tokenizationRatio) || 0.01;
    const totalRelease = Math.floor(totalWeight / 3.75 / ratio);

    try {
      await createAsset({
        categoryCode: CATEGORY_TYPE.GOLD,
        name: basicInformation.listingId,
        tokenCode: tokenization.tokenName,
        tokenStandard: "ERC-1400 (Security Token)",
        description: basicInformation.displayName,
        shortDescription: basicInformation.shortDescription,
        currentPrice: tokenization.initialPrice,
        priceUnit: "chỉ",
        priceChangePercent: 0.85,
        buyFeePercent: tokenization.buyFee,
        sellFeePercent: tokenization.sellFee,
        liquidity24h: tokenization.maxPurchaseLimit,
        totalRelease,
        imageUrl: "string",
        thumbnailUrl: "string",
        isFeatured: false,
        metadata: {
          purity: physicalGold.purity,
          backing_ratio: physicalGold.totalWeight,
          converted_ratio: physicalGold.totalWeight / 3.75,
          supplier: physicalGold.supplier,
          custodian: "BIDV",
        },
        status: "active",
      });

      onNext();
    } catch (error) {
      console.error("Failed to submit gold listing:", error);
    }
  };

  return (
    <form
      className="rounded-[28px] border border-app-border bg-card p-8 shadow-card xl:p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StepHeader
        description="Tải lên các tài liệu pháp lý bắt buộc. Hash của mỗi tài liệu sẽ được ghi nhận on-chain để đảm bảo tính nguyên vẹn."
        stepLabel="Bước 4 / 4"
        title="Tài liệu pháp lý"
      />

      <div className="mt-8 space-y-7">
        <FileField
          control={control}
          helper="Báo cáo từ đơn vị kiểm toán độc lập (Big 4 hoặc tương đương)"
          label="Báo cáo kiểm toán Vault"
          isRequired={true}
          name="vaultAuditReport"
        />

        <FileField
          control={control}
          helper="Chứng nhận chính thức của SJC/nhà cung cấp"
          label="Giấy chứng nhận chất lượng"
          isRequired={true}
          name="qualityCertificate"
        />

        <FileField
          control={control}
          helper="Hợp đồng bảo hiểm với PVI hoặc tương đương"
          label="Bảo hiểm vàng lưu ký (tùy chọn)"
          name="assetInsurance"
        />

        <FileField
          control={control}
          label="Tài liệu khác (tùy chọn)"
          name="otherDocuments"
        />

        <div className="rounded-2xl bg-info-bg px-4 py-4 text-base leading-7 text-info">
          <span className="font-semibold">Lưu ý:</span> Hash SHA-256 của mỗi tài
          liệu sẽ được ghi nhận trên smart contract
          <span className="font-mono"> VaultRegistry </span>
          để xác minh tính nguyên vẹn. Mọi thay đổi tài liệu sau khi niêm yết sẽ
          yêu cầu một giao dịch on-chain mới.
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
