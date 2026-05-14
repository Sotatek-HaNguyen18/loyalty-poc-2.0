export type KYCStatus = "Đang giao dịch" | "Frozen" | "Đang xử lý";
export type KYCLevel = "Level 1" | "Level 2" | "VIP";
export type RiskAppetite = 'Thận trọng' | 'Trung bình' | 'Năng động';

export interface KYCRecord {
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
