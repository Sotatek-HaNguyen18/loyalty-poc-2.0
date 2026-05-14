import { create } from "zustand";
import type { CreateCarbonStore } from "@/pages/listed-property/listing-carbon/types";

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
    tokenizationRatio: "",
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

export const useCreateCarbonStore = create<CreateCarbonStore>((set) => ({
  ...initialState,
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
