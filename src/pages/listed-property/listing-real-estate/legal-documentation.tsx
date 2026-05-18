import { useCreateRealEstateStore } from "@/stores/useCreateRealEstateStore";
import { message } from "antd";
import { useForm } from "react-hook-form";
import { FileField, StepFooter, StepHeader } from "../components/shared";
import { getCreateAssetErrorMessage } from "../utils";
import type { CreateStepPageProps, LegalDocumentationData } from "./types";
import { CATEGORY_TYPE } from "@/services/assets/constants";
import { createAsset } from "@/services";

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
    tokenization,
    realEstate,
  } = useCreateRealEstateStore();
  const { control, handleSubmit } = useForm<LegalDocumentationData>({
    defaultValues: legalDocumentation,
  });

  const onSubmit = async (data: LegalDocumentationData) => {
    setLegalDocumentation(data);

    const valuationAmount = Number(realEstate.valuationAmount) || 0;
    const tokenizationRatio = Number(tokenization.tokenizationRatio) || 0;
    const totalRelease =
      tokenizationRatio > 0
        ? Math.floor(valuationAmount / tokenizationRatio)
        : 0;

    try {
      await createAsset({
        categoryCode: CATEGORY_TYPE.REAL_ESTATE,
        name: basicInformation.listingId,
        tokenCode: tokenization.tokenName,
        tokenStandard: "ERC-1400 (Security Token)",
        description: basicInformation.displayName,
        shortDescription: basicInformation.shortDescription,
        currentPrice: tokenization.initialPrice,
        priceUnit: "tỷ VNĐ",
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
          backing_ratio: Number(realEstate.floorArea) || 0,
          converted_ratio:
            valuationAmount > 0 ? valuationAmount / 1_000_000_000 : 0,
          supplier: tokenization.distributionModel,
          custodian: "BIDV",
        },
        status: "active",
      });

      onNext();
    } catch (error) {
      message.error(getCreateAssetErrorMessage(error));
    }
  };

  return (
    <form
      className="rounded-[28px] border border-app-border bg-card p-8 shadow-card xl:p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StepHeader
        description="Tải lên các tài liệu pháp lý bắt buộc cho BĐS. Hash của mỗi tài liệu sẽ được ghi nhận on-chain trong RealEstateRegistry."
        stepLabel="Bước 4 / 4"
        title="Tài liệu pháp lý"
      />

      <div className="mt-8 space-y-7">
        <FileField
          control={control}
          helper="Bản scan có công chứng — phải khớp số seri đã khai báo"
          label="GCN Quyền sử dụng đất (Sổ Hồng/Đỏ)"
          isRequired={true}
          name="landUseCertificate"
        />

        <FileField
          control={control}
          helper="Hợp đồng giữa BIDV và pháp nhân SPV về quyền quản lý/định đoạt"
          label="Hợp đồng chuyển nhượng SPV"
          isRequired={true}
          name="spvTransferContract"
        />

        <FileField
          control={control}
          helper="Savills/CBRE/JLL — phát hành trong 6 tháng"
          label="Báo cáo định giá độc lập"
          isRequired={true}
          name="valuationReport"
        />

        <FileField
          control={control}
          helper="Bảo hiểm cháy nổ + thiệt hại toàn diện"
          label="Hợp đồng bảo hiểm tài sản"
          isRequired={true}
          name="assetInsurance"
        />

        <FileField
          control={control}
          helper="Đơn vị vận hành tòa nhà / cho thuê"
          label="Hợp đồng quản lý vận hành (tùy chọn)"
          name="operationContract"
        />

        <div className="rounded-2xl bg-info-bg px-6 py-4 text-sm leading-7 text-info">
          <span className="font-semibold">Lưu ý:</span> Hash SHA-256 của mỗi tài
          liệu sẽ được ghi nhận trên smart contract{" "}
          <span className="font-mono">RealEstateRegistry</span>. Bản gốc của
          GCN-QSDĐ phải được lưu ký vật lý tại két an toàn của BIDV Trustee
          Services trước khi token được phép giao dịch.
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
