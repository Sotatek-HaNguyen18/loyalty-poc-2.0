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

export interface CarbonProjectData {
  projectType: string;
  vintage: string;
  methodology: string;
  registry: string;
  projectId: string;
  locationDescription: string;
  country: string;
  coordinates: string;
  area: number;
  developer: string;
  vvb: string;
  lastVerificationDate: string;
  nextMrvDate: string;
  totalIssuedCredits: number;
  sdgs: string[];
  passedAdditionalityTest: boolean;
}

export interface TokenizationData {
  tokenName: string;
  tokenizationRatio: number;
  initialPrice: number;
  enableRetirement: boolean;
  retirementFee: number;
  buyFee: number;
  sellFee: number;
  minPurchaseLimit: number;
  maxPurchaseLimit: number;
}

export interface LegalDocumentationData {
  pdd?: File | string;
  verificationReport?: File | string;
  methodologyDoc?: File | string;
  additionalityTest?: File | string;
  esgImpact?: File | string;
  sdgCert?: File | string;
}

export interface CreateCarbonStore {
  basicInformation: BasicInformationData;
  carbonProject: CarbonProjectData;
  tokenization: TokenizationData;
  legalDocumentation: LegalDocumentationData;
  setBasicInformation: (data: Partial<BasicInformationData>) => void;
  setCarbonProject: (data: Partial<CarbonProjectData>) => void;
  setTokenization: (data: Partial<TokenizationData>) => void;
  setLegalDocumentation: (data: Partial<LegalDocumentationData>) => void;
  fillDemoData: () => void;
  reset: () => void;
}
