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

export interface PhysicalGoldData {
  totalWeight: number;
  purity: string;
  supplier: string;
  serialNumbers: string;
  vault: string;
  vaultPosition: string;
  inspector: string;
  lastInspectedDate: string;
  inspectionReport?: File | string;
}

export interface TokenizationData {
  tokenName: string;
  tokenizationRatio: number;
  initialPrice: number;
  buyFee: number;
  sellFee: number;
  minPurchaseLimit: number;
  maxPurchaseLimit: number;
}

export interface LegalDocumentationData {
  vaultAuditReport?: File | string;
  qualityCertificate?: File | string;
  assetInsurance?: File | string;
  otherDocuments?: File | string;
}

export interface CreateListedGoldStore {
  basicInformation: BasicInformationData;
  physicalGold: PhysicalGoldData;
  tokenization: TokenizationData;
  legalDocumentation: LegalDocumentationData;
  setBasicInformation: (data: BasicInformationData) => void;
  setPhysicalGold: (data: PhysicalGoldData) => void;
  setTokenization: (data: TokenizationData) => void;
  setLegalDocumentation: (data: LegalDocumentationData) => void;
  fillDemoData: () => void;
  reset: () => void;
}
