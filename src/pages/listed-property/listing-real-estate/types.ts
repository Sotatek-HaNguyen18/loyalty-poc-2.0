export type CreateStepPageProps = {
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
};

export interface BasicInformationData {
  listingId: string;
  initialListingStatus: string;
  displayName: string;
  shortDescription: string;
  tradingStartDate: string;
}

export interface RealEstateData {
  // General Info
  propertyType: string;
  developer: string;
  detailAddress: string;
  province: string;
  landArea: number;
  floorArea: number;
  totalUnits: number;
  blockFloor: string;
  completionYear: string;

  // Land Use Rights Certificate
  certificateType: string;
  certificateNumber: string;
  issueDate: string;
  issueAuthority: string;

  // SPV Info
  spvName: string;
  businessCode: string;

  // Valuation Info
  valuationUnit: string;
  valuationDate: string;
  valuationAmount: number;
  valuationReport?: File | string;
}

export interface TokenizationData {
  tokenName: string;
  tokenizationRatio: number;
  initialPrice: number;
  distributionModel: string;
  expectedYield: number;
  lockupPeriod: number;
  buyFee: number;
  sellFee: number;
  minPurchaseLimit: number;
  maxPurchaseLimit: number;
}

export interface LegalDocumentationData {
  landUseCertificate?: File | string;
  spvTransferContract?: File | string;
  valuationReport?: File | string;
  assetInsurance?: File | string;
  operationContract?: File | string;
}

export interface CreateRealEstateStore {
  basicInformation: BasicInformationData;
  realEstate: RealEstateData;
  tokenization: TokenizationData;
  legalDocumentation: LegalDocumentationData;
  setBasicInformation: (data: Partial<BasicInformationData>) => void;
  setRealEstate: (data: Partial<RealEstateData>) => void;
  setTokenization: (data: Partial<TokenizationData>) => void;
  setLegalDocumentation: (data: Partial<LegalDocumentationData>) => void;
  fillDemoData: () => void;
  reset: () => void;
}
