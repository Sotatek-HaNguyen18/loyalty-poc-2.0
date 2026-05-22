import type { AssetStatus, CategoryType } from "@/types/assets";
import type {
  CarbonAssetMetadata,
  GoldAssetMetadata,
  RealEstateAssetMetadata,
} from "./metadata";

export type AssetMetadata =
  | GoldAssetMetadata
  | RealEstateAssetMetadata
  | CarbonAssetMetadata;

export type GetAssetsParams = {
  category?: CategoryType;
  status?: AssetStatus;
  search?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "price_asc" | "price_desc";
};

export interface IListingRequest {
  categoryCode: string;
  name: string;
  tokenCode: string;
  tokenStandard: string;
  description: string;
  shortDescription: string;
  currentPrice: number;
  priceUnit: string;
  priceChangePercent: number;
  buyFeePercent: number;
  sellFeePercent: number;
  liquidity24h: number;
  totalRelease: number;
  imageUrl: string;
  thumbnailUrl: string;
  isFeatured: boolean;
  metadata: AssetMetadata;
  status: string;
}
