import { useForm } from "react-hook-form";
import { useCreateRealEstateStore } from "@/stores/useCreateRealEstateStore";
import { FileField, StepFooter, StepHeader } from "../components/shared";
import type { CreateStepPageProps, LegalDocumentationData } from "./types";

export const LegalDocumentationStep = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
}: CreateStepPageProps) => {
  const { legalDocumentation, setLegalDocumentation } =
    useCreateRealEstateStore();
  const { control, handleSubmit } = useForm<LegalDocumentationData>({
    defaultValues: legalDocumentation,
  });

  const onSubmit = (data: LegalDocumentationData) => {
    setLegalDocumentation(data);
    onNext();
  };

  return (
    <form
      className="rounded-[28px] border border-app-border bg-white p-8 shadow-[0_18px_55px_rgba(8,31,20,0.05)] xl:p-10"
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

        <div className="rounded-2xl bg-[#e9f0ff] px-6 py-4 text-sm leading-7 text-[#3459b8]">
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
