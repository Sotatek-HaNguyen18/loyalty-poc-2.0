import { create } from "zustand";
import type { CreateRealEstateStore } from "@/pages/listed-property/listing-real-estate/types";

const initialState = {
  basicInformation: {
    listingId: "",
    initialListingStatus: "",
    displayName: "",
    shortDescription: "",
    tradingStartDate: "",
  },
  realEstate: {
    propertyType: "",
    developer: "",
    detailAddress: "",
    province: "",
    landArea: 0,
    floorArea: 0,
    totalUnits: 0,
    blockFloor: "",
    completionYear: "",
    certificateType: "",
    certificateNumber: "",
    issueDate: "",
    issueAuthority: "",
    spvName: "",
    businessCode: "",
    valuationUnit: "",
    valuationDate: "",
    valuationAmount: 0,
    valuationReport: undefined,
  },
  tokenization: {
    tokenName: "",
    tokenizationRatio: 1_000_000,
    initialPrice: 0,
    distributionModel: "",
    expectedYield: 0,
    lockupPeriod: 0,
    buyFee: 0,
    sellFee: 0,
    minPurchaseLimit: 0,
    maxPurchaseLimit: 0,
  },
  legalDocumentation: {
    landUseCertificate: undefined,
    spvTransferContract: undefined,
    valuationReport: undefined,
    assetInsurance: undefined,
    operationContract: undefined,
  },
};

export const useCreateRealEstateStore = create<CreateRealEstateStore>(
  (set) => ({
    ...initialState,
    setBasicInformation: (data) =>
      set((state) => ({
        basicInformation: { ...state.basicInformation, ...data },
      })),
    setRealEstate: (data) =>
      set((state) => ({
        realEstate: { ...state.realEstate, ...data },
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
  }),
);
