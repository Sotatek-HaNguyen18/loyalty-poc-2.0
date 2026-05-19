export type AssetType = "Gold" | "RealEstate" | "Carbon";
export type ReconStatus = "Khớp" | "Lệch" | "Đang xử lý";
export type StatusBadgeType = "success" | "danger" | "warning";

export interface Transaction {
  id: string;
  time: string;
  investorName: string;
  investorId: string;
  type: "Mint" | "Burn" | "Transfer";
  tokenCount: number;
  vndValue: number;
  txHash: string;
}

export interface BatchRecord {
  id: string;
  date: string;
  rawDate: string;
  categoryId: string;
  categoryName: string;
  assetType: AssetType;
  txCount: number;
  mint: number;
  burn: number;
  transfer: number;
  totalVnd: number;
  status: ReconStatus;
  coreBanking: "OK" | "Diff" | "Pending";
  transactions?: Transaction[];
}
