import { create } from "zustand";
import type { CreateRealEstateStore } from "@/pages/listed-property/listing-real-estate/types";
import {
  dateStampYmd,
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

const createRealEstateDemoState = () => {
  const batchNo = randomDigits(3);
  const listingId = `RE-${dateStampYmd()}-${batchNo}`;
  const tokenName = `BRT-VOP3-${batchNo}`;
  const certificateNumber = `CS-${dateStampYmd()}-${randomDigits(7)}`;
  const businessCode = randomDigits(10);
  const fileSuffix = uniqueSuffix();
  const towerNo = randomDigits(2);

  return {
    basicInformation: {
      listingId,
      initialListingStatus: "Active",
      displayName: `Vinhomes Ocean Park 3 — Tòa T${towerNo}`,
      shortDescription:
        "Dự án căn hộ cao cấp tại Ocean Park 3, Gia Lâm. Token hóa theo mô hình rental yield, SPV BIDV nắm giữ GCN quyền sử dụng đất và tài sản gắn liền.",
      tradingStartDate: "01/08/2026",
    },
    realEstate: {
      propertyType: "Căn hộ chung cư cao cấp",
      developer: "Vinhomes",
      detailAddress: "Đường Nguyễn Xiển, P. Long Bình, TP. Thủ Đức",
      province: "TP. Hồ Chí Minh",
      landArea: 12500,
      floorArea: 98500,
      totalUnits: 420,
      blockFloor: `Tòa T${towerNo} — Tầng 5–35`,
      completionYear: "2025",
      certificateType: "Số Hồng — GCN QSDĐ và tài sản gắn liền",
      certificateNumber,
      issueDate: "20/11/2025",
      issueAuthority: "Sở Tài nguyên và Môi trường TP. Hồ Chí Minh",
      spvName: "Công ty TNHH SPV Vinhomes Ocean Park 3",
      businessCode,
      valuationUnit: "Savills Việt Nam",
      valuationDate: "01/03/2026",
      valuationAmount: 185000000000,
      valuationReport: demoPdfName("bao-cao-dinh-gia-savills-vop3", fileSuffix),
    },
    tokenization: {
      tokenName,
      tokenizationRatio: 1_000_000,
      initialPrice: 1050000,
      distributionModel: "Rental yield — phân phối quý",
      expectedYield: 6.5,
      lockupPeriod: 12,
      buyFee: 0.5,
      sellFee: 0.5,
      minPurchaseLimit: 10,
      maxPurchaseLimit: 185000,
    },
    legalDocumentation: {
      landUseCertificate: demoPdfName("gcn-quyen-su-dung-dat-so-hong", fileSuffix),
      spvTransferContract: demoPdfName(
        "hop-dong-chuyen-nhuong-spv-bidv",
        fileSuffix,
      ),
      valuationReport: demoPdfName("bao-cao-dinh-gia-doc-lap-savills", fileSuffix),
      assetInsurance: demoPdfName("hop-dong-bao-hiem-tai-san-pvi", fileSuffix),
      operationContract: demoPdfName(
        "hop-dong-quan-ly-van-hanh-toa-nha",
        fileSuffix,
      ),
    },
  };
};

export const useCreateRealEstateStore = create<CreateRealEstateStore>(
  (set) => ({
    ...initialState,
    fillDemoData: () => set(createRealEstateDemoState()),
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
