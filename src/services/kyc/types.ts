export interface GetKYCParams {
  search?: string;
  status?: string;
  riskAppetite?: string;
  kycLevel?: string;
  page?: number;
  limit?: number;
}

export interface KYCRecord {
  id: string;
  investor: string;
  citizenId: string;
  kycLevel: string;
  riskAppetite: string;
  walletAddress: string;
  portfolio: Portfolio;
  status: string;
  fullName: string;
  phoneNumber: string;
  custodialWalletAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface Portfolio {
  [tokenSymbol: string]: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface KYCListResponse {
  data: {
    items: KYCRecord[];
    meta: PaginationMeta;
  };
  statusCode: number;
  timestamp: string;
}

export type KYCListResult = KYCListResponse["data"];

export interface KYCDetailResponse {
  data: KYCRecord;
  statusCode: number;
  timestamp: string;
}

export type KYCLevel = "LEVEL_1" | "LEVEL_2" | "VIP";

export interface UpdateKYCLevelPayload {
  kycLevel: KYCLevel;
}
