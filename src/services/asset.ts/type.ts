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
  metadata: {
    purity: string;
    backing_ratio: number;
    converted_ratio: number;
    supplier: string;
    custodian: string;
  };
  status: string;
}
