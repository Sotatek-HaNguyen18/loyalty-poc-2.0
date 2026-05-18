import { cn } from "@/lib/utils";
import { Button } from "antd";
import { ChevronLeft, X } from "lucide-react";
import { useState } from "react";
import { BasicInformationStep } from "./basic-information";
import { RealEstateStep } from "./real-estate";
import { TokenizationStep } from "./tokenization";
import { LegalDocumentationStep } from "./legal-documentation";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/paths";
import { SuccessModal } from "../components/SuccessModal";
import { SignTransactionModal } from "../components/SignTransactionModal";
import { WalletInfoCard } from "../components/WalletInfoCard";
import { useCreateRealEstateStore } from "@/stores/useCreateRealEstateStore";
import { withWalletLoginChecking } from "@/components/shared/hoc/wallet-login-checking";

type StepKey =
  | "basic-information"
  | "real-estate-property"
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
    description: "Mã đợt, tên hiển thị, trạng thái",
    key: "basic-information",
    shortLabel: "1",
    title: "Thông tin cơ bản",
  },
  {
    description: "Vị trí, diện tích, định giá",
    key: "real-estate-property",
    shortLabel: "2",
    title: "Thông tin BĐS",
  },
  {
    description: "Cung, giá, phí, hạn mức",
    key: "tokenization",
    shortLabel: "3",
    title: "Tokenization",
  },
  {
    description: "Sổ hồng, kiểm toán, bảo hiểm",
    key: "legal-documentation",
    shortLabel: "4",
    title: "Tài liệu pháp lý",
  },
];

const stepComponentMap = {
  "basic-information": BasicInformationStep,
  "real-estate-property": RealEstateStep,
  tokenization: TokenizationStep,
  "legal-documentation": LegalDocumentationStep,
};

const progressText = (step: number) =>
  `${Math.round((step / steps.length) * 100)}% hoàn thành · ${step} / ${steps.length} bước`;

const ListingRealEstatePageBase = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSign, setShowSign] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { basicInformation, reset } = useCreateRealEstateStore();

  const activeStep = steps[currentStep];
  const ActiveStepComponent = stepComponentMap[activeStep.key];

  return (
    <div className="mx-auto max-w-[1640px]">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-3 text-sm font-medium text-text-3">
            <button
              className="rounded-full p-1 text-muted-text"
              onClick={() => navigate(paths.listedProperty)}
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[0.92rem] font-extrabold uppercase tracking-[0.18em] text-bidv-gold">
              Module E • Form Bất động sản
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-text">
            Niêm yết dự án BĐS mới
          </h1>
          <p className="mt-2 text-muted-text">
            Mã đợt: <span className="font-mono">RE-20260520-001</span> · Tự lưu
            nháp mỗi 30s · Smart contract:{" "}
            <span className="font-mono">
              AssetRegistry.createRealEstateAsset(...)
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 self-start xl:self-auto">
          <Button className="!h-11 !rounded-xl !border-0 !bg-transparent !px-2 !text-base !font-semibold !text-text-2">
            Lưu nháp
          </Button>
          <Button
            className="!h-11 !rounded-xl !border-app-border !px-4 !text-base !font-semibold !text-text"
            icon={<X className="h-4 w-4" />}
          >
            Hủy
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="rounded-[28px] border border-app-border bg-card p-5 shadow-card">
            <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-text-3">
              Tiến độ niêm yết
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-border-soft">
              <div
                className="h-1.5 rounded-full bg-bidv-green transition-all"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <div className="mt-4 text-xs text-text-3">
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
                      isActive ? "bg-primary-50" : "hover:bg-bg-alt",
                    )}
                    key={step.key}
                    type="button"
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                        isActive || isCompleted
                          ? "border-bidv-green bg-bidv-green text-white"
                          : "border-border-strong bg-card text-text-2",
                      )}
                    >
                      {step.shortLabel}
                    </span>
                    <span>
                      <span className="block text-base text-text">
                        {step.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-text-3">
                        {step.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <WalletInfoCard />
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
        methodName="createRealEstateAsset(...)"
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

export const ListingRealEstatePage = withWalletLoginChecking(
  ListingRealEstatePageBase,
);
