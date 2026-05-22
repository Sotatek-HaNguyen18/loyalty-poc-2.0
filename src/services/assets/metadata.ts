import type {
  CarbonProjectData,
  TokenizationData as CarbonTokenizationData,
} from "@/pages/listed-property/listing-carbon/types";
import type { PhysicalGoldData } from "@/pages/listed-property/listing-gold/types";
import type {
  RealEstateData,
  TokenizationData as RealEstateTokenizationData,
} from "@/pages/listed-property/listing-real-estate/types";

const GRAMS_PER_CHI = 3.75;

const joinLocation = (...parts: Array<string | undefined>) =>
  parts.filter((part) => part?.trim()).join(", ");

export type GoldAssetMetadata = {
  purity: string;
  backing_ratio: number;
  converted_ratio: number;
  supplier: string;
  custodian: string;
  last_audit: string;
  storage: string;
};

export type RealEstateAssetMetadata = {
  backing_ratio: number;
  converted_ratio: number;
  custodian: string;
  location: string;
  distribution_rate: string;
  total_appraised_value: number;
  ownership_type: string;
  property_type: string;
  expected_yield: number;
  project_term: number;
  developer: string;
};

export type CarbonAssetMetadata = {
  backing_ratio: number;
  converted_ratio: number;
  custodian: string;
  verifier: string;
  registration_code: string;
  methodology: string;
  vintage_year: string;
  last_verification: string;
  retired: boolean;
  location: string;
};

export function buildGoldMetadata(
  physicalGold: PhysicalGoldData,
): GoldAssetMetadata {
  const totalWeight = Number(physicalGold.totalWeight) || 0;

  return {
    purity: physicalGold.purity,
    backing_ratio: totalWeight,
    converted_ratio: totalWeight / GRAMS_PER_CHI,
    supplier: physicalGold.supplier,
    custodian: "BIDV",
    last_audit: physicalGold.lastInspectedDate,
    storage: physicalGold.vault,
  };
}

export function buildRealEstateMetadata(
  realEstate: RealEstateData,
  tokenization: RealEstateTokenizationData,
): RealEstateAssetMetadata {
  const valuationAmount = Number(realEstate.valuationAmount) || 0;
  const floorArea = Number(realEstate.floorArea) || 0;

  return {
    backing_ratio: floorArea,
    converted_ratio: valuationAmount > 0 ? valuationAmount / 1_000_000_000 : 0,
    custodian: "BIDV",
    location: joinLocation(realEstate.detailAddress, realEstate.province),
    distribution_rate: tokenization.distributionModel,
    total_appraised_value: valuationAmount,
    ownership_type: realEstate.certificateType,
    property_type: realEstate.propertyType,
    expected_yield: Number(tokenization.expectedYield) || 0,
    project_term: Number(tokenization.lockupPeriod) || 0,
    developer: realEstate.developer,
  };
}

export function buildCarbonMetadata(
  carbonProject: CarbonProjectData,
  tokenization: CarbonTokenizationData,
): CarbonAssetMetadata {
  const totalIssuedCredits = Number(carbonProject.totalIssuedCredits) || 0;

  return {
    backing_ratio: Number(carbonProject.area) || 0,
    converted_ratio: totalIssuedCredits,
    custodian: "BIDV",
    verifier: carbonProject.vvb,
    registration_code: carbonProject.projectId,
    methodology: carbonProject.methodology,
    vintage_year: carbonProject.vintage,
    last_verification: carbonProject.lastVerificationDate,
    retired: Boolean(tokenization.enableRetirement),
    location: joinLocation(
      carbonProject.locationDescription,
      carbonProject.country,
    ),
  };
}
