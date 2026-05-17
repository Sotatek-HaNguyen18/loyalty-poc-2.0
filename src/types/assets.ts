export type CategoryType = "gold" | "real_estate" | "carbon";

export type AssetStatus = "active" | "inactive" | "coming_soon";

export type AssetCategory = {
  id: string;
  name: string;
  slug: string;
  category: CategoryType;
  iconUrl: string | null;
};

export type Asset = {
  id: string;
  categoryId: string;
  name: string;
  tokenCode: string;
  shortDescription: string | null;
  currentPrice: string | number;
  priceUnit: string | null;
  priceChangePercent: string | number;
  totalRelease: string | number | null;
  thumbnailUrl: string | null;
  isFeatured: boolean;
  status: AssetStatus;
  createdAt: string;
  category: AssetCategory;
  txHash: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any> | null;
};

export type PaginatedResult<T> = {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type ResponseEnvelope<T> = {
  data: T;
  statusCode: number;
  timestamp: string;
};
