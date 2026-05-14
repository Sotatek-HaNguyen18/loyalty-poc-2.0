import { cn } from "@/lib/utils";
import { Button } from "antd";
import { ChevronLeft, FileBadge2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/paths";
import { BasicInformationStep } from "./basic-information";
import { CarbonProjectStep } from "./carbon-project";
import { TokenizationStep } from "./tokenization";
import { LegalDocumentationStep } from "./legal-documentation";
import { SuccessModal } from "../components/SuccessModal";
import { SignTransactionModal } from "../components/SignTransactionModal";
import { useCreateCarbonStore } from "@/stores/useCreateCarbonStore";
import { withWalletLoginChecking } from "@/components/shared/hoc/wallet-login-checking";

type StepKey =
  | "basic-information"
  | "carbon-project"
  | "tokenization"
  | "legal-documentation";

type StepDefinition = {
  description: string;
  key: StepKey;
  shortLabel: string;
  title: string;
};

const steps: StepDefinition[] = [
  {
    description: "Mã đợt, tên dự án, trạng thái",
    key: "basic-information",
    shortLabel: "1",
    title: "Thông tin cơ bản",
  },
  {
    description: "Methodology, vintage, registry, MRV",
    key: "carbon-project",
    shortLabel: "2",
    title: "Dự án Carbon",
  },
  {
    description: "Cung, giá, phí, hỗ trợ retirement",
    key: "tokenization",
    shortLabel: "3",
    title: "Tokenization",
  },
  {
    description: "PDD, verification, ESG, additionality",
    key: "legal-documentation",
    shortLabel: "4",
    title: "Tài liệu pháp lý",
  },
];

const stepComponentMap = {
  "basic-information": BasicInformationStep,
  "carbon-project": CarbonProjectStep,
  tokenization: TokenizationStep,
  "legal-documentation": LegalDocumentationStep,
};

const progressText = (step: number) =>
  `${Math.round((step / steps.length) * 100)}% hoàn thành · ${step} / ${steps.length} bước`;

const ListingCarbonPageBase = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSign, setShowSign] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { basicInformation, reset } = useCreateCarbonStore();

  const activeStep = steps[currentStep];
  const ActiveStepComponent = stepComponentMap[activeStep.key];

  const walletInfo = useMemo(
    () => ({
      address: "0xA82C9b57Fe2a510C8f4b09a1d72ee547c8a47e91",
      balance: "24,8 MATIC",
      label: "Ví Admin đã kết nối",
    }),
    [],
  );

  return (
    <div className="mx-auto max-w-[1640px]">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-3 text-sm font-medium text-[#81938c]">
            <button
              className="rounded-full p-1 text-[#70827a]"
              onClick={() => navigate(paths.listedProperty)}
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[0.92rem] font-extrabold uppercase tracking-[0.18em] text-bidv-gold">
              Module E • Form Carbon Credit
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#07130f]">
            Niêm yết đợt tín chỉ carbon mới
          </h1>
          <p className="mt-2 text-[#70827a]">
            Mã đợt: <span className="font-mono">CC-2026-002</span> · Tự lưu nháp
            mỗi 30s · Smart contract:{" "}
            <span className="font-mono">
              AssetRegistry.createCarbonAsset(...)
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 self-start xl:self-auto">
          <Button className="!h-11 !rounded-xl !border-0 !bg-transparent !px-2 !text-base !font-semibold !text-[#53635c]">
            Lưu nháp
          </Button>
          <Button
            className="!h-11 !rounded-xl !border-app-border !px-4 !text-base !font-semibold !text-[#16211d]"
            icon={<X className="h-4 w-4" />}
          >
            Hủy
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="rounded-[28px] border border-app-border bg-white p-5 shadow-[0_18px_55px_rgba(8,31,20,0.05)]">
            <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#81938c]">
              Tiến độ niêm yết
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-[#e8edeb]">
              <div
                className="h-1.5 rounded-full bg-bidv-green transition-all"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <div className="mt-4 text-xs text-[#81938c]">
              {progressText(currentStep)}
            </div>

            <div className="mt-5 space-y-2">
              {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <button
                    className={cn(
                      "flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition-colors",
                      isActive ? "bg-[#edf5f1]" : "hover:bg-[#f7f9f8]",
                    )}
                    key={step.key}
                    type="button"
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                        isActive || isCompleted
                          ? "border-bidv-green bg-bidv-green text-white"
                          : "border-[#ccd6d1] bg-white text-[#53635c]",
                      )}
                    >
                      {step.shortLabel}
                    </span>
                    <span>
                      <span className="block text-base text-[#16211d]">
                        {step.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-[#81938c]">
                        {step.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[24px] bg-[#edf5f1] px-4 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#16211d]">
              <FileBadge2 className="h-5 w-5 text-bidv-green" />
              {walletInfo.label}
            </div>
            <div className="mt-3 break-all font-mono text-sm text-[#53635c]">
              {walletInfo.address}
            </div>
            <div className="mt-2 text-sm text-[#53635c]">
              Balance:{" "}
              <span className="font-semibold text-[#16211d]">
                {walletInfo.balance}
              </span>
            </div>
          </div>
        </aside>

        <main>
          <ActiveStepComponent
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === steps.length - 1}
            onBack={() => setCurrentStep((step) => Math.max(step - 1, 0))}
            onNext={() => {
              if (currentStep === steps.length - 1) {
                setShowSign(true);
              } else {
                setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
              }
            }}
            onSaveDraft={() => undefined}
          />
        </main>
      </div>
      <SignTransactionModal
        open={showSign}
        onClose={() => setShowSign(false)}
        onConfirm={() => {
          setShowSign(false);
          setShowSuccess(true);
        }}
        methodName="createCarbonAsset(...)"
      />
      <SuccessModal
        open={showSuccess}
        onReset={reset}
        onClose={() => setShowSuccess(false)}
        listingId={basicInformation?.listingId}
      />
    </div>
  );
};

export const ListingCarbonPage = withWalletLoginChecking(ListingCarbonPageBase);
