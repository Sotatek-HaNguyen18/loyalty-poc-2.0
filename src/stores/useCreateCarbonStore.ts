import { create } from "zustand";
import type { CreateCarbonStore } from "@/pages/listed-property/listing-carbon/types";
import {
  currentYear,
  demoPdfName,
  randomDigits,
  uniqueSuffix,
} from "@/pages/listed-property/utils/demoCodes";

const initialState = {
  basicInformation: {
    listingId: "",
    initialListingStatus: "",
    displayName: "",
    shortDescription: "",
    tradingStartDate: "",
  },
  carbonProject: {
    projectType: "",
    vintage: "",
    methodology: "",
    registry: "",
    projectId: "",
    locationDescription: "",
    country: "",
    coordinates: "",
    area: 0,
    developer: "",
    vvb: "",
    lastVerificationDate: "",
    nextMrvDate: "",
    totalIssuedCredits: 0,
    sdgs: [],
    passedAdditionalityTest: false,
  },
  tokenization: {
    tokenName: "",
    tokenizationRatio: 1,
    initialPrice: 0,
    enableRetirement: true,
    retirementFee: 0,
    buyFee: 0,
    sellFee: 0,
    minPurchaseLimit: 0,
    maxPurchaseLimit: 0,
  },
  legalDocumentation: {
    pdd: undefined,
    verificationReport: undefined,
    methodologyDoc: undefined,
    additionalityTest: undefined,
    esgImpact: undefined,
    sdgCert: undefined,
  },
};

const createCarbonDemoState = () => {
  const batchNo = randomDigits(3);
  const year = currentYear();
  const listingId = `CC-${year}-${batchNo}`;
  const projectId = `VCS-${randomDigits(4)}`;
  const tokenName = `BCT-CP${batchNo}`;
  const fileSuffix = uniqueSuffix();

  return {
    basicInformation: {
      listingId,
      initialListingStatus: "Active",
      displayName: `Rừng Cúc Phương — Phục hồi rừng bản địa (Vintage ${year}) #${batchNo}`,
      shortDescription:
        "Dự án trồng rừng và phục hồi hệ sinh thái tại Vườn Quốc gia Cúc Phương. Tín chỉ carbon đã được Verra VCS xác minh, hỗ trợ retirement on-chain cho báo cáo ESG doanh nghiệp.",
      tradingStartDate: "15/07/2026",
    },
    carbonProject: {
      projectType: "Trồng rừng / Tái trồng (AR)",
      vintage: year,
      methodology: "AR-ACM0003 — Afforestation & Reforestation",
      registry: "Verra (VCS)",
      projectId,
      locationDescription: "Vườn Quốc gia Cúc Phương — Ninh Bình",
      country: "Việt Nam",
      coordinates: "20.3167, 105.6000",
      area: 2500,
      developer: "Công ty CP Phát triển Carbon Việt Nam",
      vvb: "SCS Global Services",
      lastVerificationDate: "10/01/2026",
      nextMrvDate: "10/01/2027",
      totalIssuedCredits: 50000,
      sdgs: ["sdg13", "sdg15", "sdg8"],
      passedAdditionalityTest: true,
    },
    tokenization: {
      tokenName,
      tokenizationRatio: 1,
      initialPrice: 120000,
      enableRetirement: true,
      retirementFee: 50000,
      buyFee: 0.3,
      sellFee: 0.3,
      minPurchaseLimit: 1,
      maxPurchaseLimit: 50000,
    },
    legalDocumentation: {
      pdd: demoPdfName("project-design-document-cuc-phuong", fileSuffix),
      verificationReport: demoPdfName("verification-report-scs", fileSuffix),
      methodologyDoc: demoPdfName("methodology-ar-acm0003", fileSuffix),
      additionalityTest: demoPdfName("additionality-test-cdm-tool01", fileSuffix),
      esgImpact: demoPdfName("esg-impact-assessment", fileSuffix),
      sdgCert: demoPdfName("sdg-co-benefit-certification", fileSuffix),
    },
  };
};

export const useCreateCarbonStore = create<CreateCarbonStore>((set) => ({
  ...initialState,
  fillDemoData: () => set(createCarbonDemoState()),
  setBasicInformation: (data) =>
    set((state) => ({
      basicInformation: { ...state.basicInformation, ...data },
    })),
  setCarbonProject: (data) =>
    set((state) => ({
      carbonProject: { ...state.carbonProject, ...data },
    })),
  setTokenization: (data) =>
    set((state) => ({
      tokenization: { ...state.tokenization, ...data },
    })),
  setLegalDocumentation: (data) =>
    set((state) => ({
      legalDocumentation: { ...state.legalDocumentation, ...data },
    })),
  reset: () => set(initialState),
}));
