export type KYCStatus = "Đang giao dịch" | "Frozen" | "Đang xử lý";
export type KYCLevel = "Level 1" | "Level 2" | "VIP";
export type RiskAppetite = "Thận trọng" | "Trung bình" | "Năng động";

export interface KYCRecord {
  detailId?: string;
  id: string;
  name: string;
  phone: string;
  cccd: string;
  level: KYCLevel;
  riskAppetite: RiskAppetite;
  walletAddress: string;
  limit: string;
  status: KYCStatus;
  registrationDate: string;
}

export const kycLevelParams: Record<string, string | undefined> = {
  "Tất cả": undefined,
  "Level 1": "LEVEL_1",
  "Level 2": "LEVEL_2",
  VIP: "VIP",
};

export const statusParams: Record<string, string | undefined> = {
  "Tất cả": undefined,
  "Đang giao dịch": "TRADING",
  Frozen: "FROZEN",
};