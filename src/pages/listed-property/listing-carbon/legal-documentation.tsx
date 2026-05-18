import { CATEGORY_TYPE } from "@/services/assets/constants";
import { createAsset } from "@/services";
import { useCreateCarbonStore } from "@/stores/useCreateCarbonStore";
import { useForm } from "react-hook-form";
import { FileField, StepFooter, StepHeader } from "../components/shared";
import type { CreateStepPageProps, LegalDocumentationData } from "./types";

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
    basicInformation,
    carbonProject,
    tokenization,
  } = useCreateCarbonStore();
  const { control, handleSubmit } = useForm<LegalDocumentationData>({
    defaultValues: legalDocumentation,
  });

  const onSubmit = async (data: LegalDocumentationData) => {
    setLegalDocumentation(data);

    const totalIssuedCredits = Number(carbonProject.totalIssuedCredits) || 0;
    const tokenizationRatio = Number(tokenization.tokenizationRatio) || 0;
    const totalRelease =
      tokenizationRatio > 0
        ? Math.floor(totalIssuedCredits / tokenizationRatio)
        : 0;

    try {
      await createAsset({
        categoryCode: CATEGORY_TYPE.CARBON,
        name: basicInformation.listingId,
        tokenCode: tokenization.tokenName,
        tokenStandard: "ERC-1400 (Security Token)",
        description: basicInformation.displayName,
        shortDescription: basicInformation.shortDescription,
        currentPrice: tokenization.initialPrice,
        priceUnit: "tCO2e / ha",
        priceChangePercent: 0.85,
        buyFeePercent: tokenization.buyFee,
        sellFeePercent: tokenization.sellFee,
        liquidity24h: tokenization.maxPurchaseLimit,
        totalRelease,
        imageUrl: "string",
        thumbnailUrl: "string",
        isFeatured: false,
        metadata: {
          purity: "string",
          backing_ratio: Number(carbonProject.area) || 0,
          converted_ratio: totalIssuedCredits,
          supplier: carbonProject.vvb,
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
        description="Tải lên các tài liệu bắt buộc theo chuẩn Verra/Gold Standard. Hash của verification report + PDD sẽ được anchor on-chain trong CarbonRegistry."
        stepLabel="Bước 4 / 4"
        title="Tài liệu pháp lý"
      />

      <div className="mt-8 space-y-7">
        <FileField
          control={control}
          helper="Theo chuẩn Verra (VCS)"
          label="Project Design Document (PDD)"
          isRequired={true}
          name="pdd"
        />

        <FileField
          control={control}
          helper="SCS Global Services — phát hành trong 12 tháng"
          label="Verification Report (VVB)"
          isRequired={true}
          name="verificationReport"
        />

        <FileField
          control={control}
          helper="Bản chính thức từ registry"
          label="Tài liệu Methodology"
          isRequired={true}
          name="methodologyDoc"
        />

        <FileField
          control={control}
          helper="CDM Tool 01 hoặc tương đương"
          label="Additionality Test"
          isRequired={true}
          name="additionalityTest"
        />

        <FileField
          control={control}
          helper="Tác động xã hội, đa dạng sinh học, cộng đồng"
          label="ESG Impact Assessment (tùy chọn)"
          name="esgImpact"
        />

        <FileField
          control={control}
          helper="CCB Standard hoặc Gold Standard SDG cert"
          label="Co-benefit / SDG Certification (tùy chọn)"
          name="sdgCert"
        />

        <div className="rounded-2xl bg-info-bg px-6 py-4 text-sm leading-7 text-info">
          <span className="font-semibold">Lưu ý:</span> Hash của Verification
          Report và PDD sẽ được anchor lên smart contract{" "}
          <span className="font-mono">CarbonRegistry</span>. Khi NĐT thực hiện
          retirement on-chain, hệ thống sẽ tự động gọi API tới registry (Verra
          (VCS)) để cancel cùng số VCU tương ứng — đảm bảo không
          double-counting.
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
