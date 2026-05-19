export type DailyBatchRow = {
  date: string;
  categoryId: string;
  categoryName: string;
  soGD: number;
  mint: number;
  burn: number;
  transfer: number;
  totalVND: number;
};

export type StatsSummary = {
  totalCount: number;
  totalVND: number;
};

export type TransactionStats = {
  summary: StatsSummary;
  dailyBatch: DailyBatchRow[];
};

export type BatchDetailItem = {
  id: string;
  time: string;
  kycId: string | null;
  investorName: string;
  investorCode: string;
  type: "buy" | "sell" | "transfer" | string;
  soToken: number;
  vnd: number;
  txHash: string;
};

export type GetTransactionStatsParams = {
  from?: string;
  to?: string;
  categoryId?: string;
};

export type GetBatchDetailParams = {
  date: string;
  categoryId: string;
};
