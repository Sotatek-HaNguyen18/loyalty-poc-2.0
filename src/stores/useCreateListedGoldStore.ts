import { create } from "zustand";
import type { CreateListedGoldStore } from "../pages/listed-property/listing-gold/types";
import {
  currentYear,
  dateStampYmd,
  demoPdfName,
  randomDigits,
  randomSerialLines,
  uniqueSuffix,
} from "../pages/listed-property/utils/demoCodes";

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
    tokenizationRatio: 0.01,
  },
};

const createGoldDemoState = () => {
  const batchNo = randomDigits(3);
  const listingId = `GOLD-${dateStampYmd()}-${batchNo}`;
  const tokenName = `BGT-GOLD-${batchNo}`;
  const fileSuffix = uniqueSuffix();
  const year = currentYear();
  const vaultSlot = randomDigits(2);

  return {
    basicInformation: {
      listingId,
      initialListingStatus: "Active",
      displayName: `Vàng SJC 9999 — Đợt ${batchNo}/${year}`,
      shortDescription:
        "Đợt niêm yết vàng SJC 9999 lưu ký tại Kho Hội sở Hà Nội. Token BGT đại diện quyền sở hữu phần vàng vật chất đã kiểm định, phù hợp giao dịch trên sàn BIDV Loyalty.",
      tradingStartDate: "01/06/2026",
    },
    physicalGold: {
      totalWeight: 3750,
      purity: "9999 (SJC)",
      supplier: "SJC",
      serialNumbers: randomSerialLines("SJC", year, 3),
      vault: "Kho Hội sở Hà Nội",
      vaultPosition: `Tủ-A3-Ngăn-${vaultSlot}`,
      inspector: "Công ty TNHH Kiểm định Quốc tế SGS Việt Nam",
      lastInspectedDate: "15/03/2026",
      inspectionReport: demoPdfName("bao-cao-kiem-dinh-vang-sjc", fileSuffix),
    },
    tokenization: {
      tokenName,
      tokenizationRatio: 0.01,
      initialPrice: 950000,
      buyFee: 0.5,
      sellFee: 0.5,
      minPurchaseLimit: 100,
      maxPurchaseLimit: 100000,
    },
    legalDocumentation: {
      vaultAuditReport: demoPdfName("bao-cao-kiem-toan-vault", fileSuffix),
      qualityCertificate: demoPdfName(
        "giay-chung-nhan-chat-luong-sjc",
        fileSuffix,
      ),
      assetInsurance: demoPdfName("hop-dong-bao-hiem-vang-luu-ky-pvi", fileSuffix),
      otherDocuments: demoPdfName("bien-ban-giao-nhan-vang", fileSuffix),
    },
  };
};

export const useCreateListedGoldStore = create<CreateListedGoldStore>(
  (set) => ({
    ...initialState,
    fillDemoData: () => set(createGoldDemoState()),
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
