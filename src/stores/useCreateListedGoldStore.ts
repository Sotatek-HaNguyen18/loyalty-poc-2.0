import { create } from "zustand";
import type { CreateListedGoldStore } from "../pages/listed-property/listing-gold/types";

const initialState = {
  basicInformation: {
    displayName: "",
    initialListingStatus: "",
    listingId: "",
    shortDescription: "",
    tradingStartDate: "",
  },
  legalDocumentation: {
    assetInsurance: undefined,
    otherDocuments: undefined,
    qualityCertificate: undefined,
    vaultAuditReport: undefined,
  },
  physicalGold: {
    inspectionReport: undefined,
    inspector: "",
    lastInspectedDate: "",
    purity: "",
    serialNumbers: "",
    supplier: "",
    totalWeight: 0,
    vault: "",
    vaultPosition: "",
  },
  tokenization: {
    buyFee: 0,
    initialPrice: 0,
    maxPurchaseLimit: 0,
    minPurchaseLimit: 0,
    sellFee: 0,
    tokenName: "",
    tokenizationRatio: "",
  },
};

export const useCreateListedGoldStore = create<CreateListedGoldStore>(
  (set) => ({
    ...initialState,
    reset: () => set(initialState),
    setBasicInformation: (data) =>
      set((state) => ({
        basicInformation: { ...state.basicInformation, ...data },
      })),
    setLegalDocumentation: (data) =>
      set((state) => ({
        legalDocumentation: { ...state.legalDocumentation, ...data },
      })),
    setPhysicalGold: (data) =>
      set((state) => ({
        physicalGold: { ...state.physicalGold, ...data },
      })),
    setTokenization: (data) =>
      set((state) => ({
        tokenization: { ...state.tokenization, ...data },
      })),
  }),
);
