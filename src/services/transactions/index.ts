import type { ResponseEnvelope } from "@/types/assets";
import { httpClient } from "../http-client";
import type {
  BatchDetailItem,
  GetBatchDetailParams,
  GetTransactionStatsParams,
  TransactionStats,
} from "./types";

const TRANSACTIONS_BASE = "/transactions";

export async function getTransactionStats(
  params: GetTransactionStatsParams = {},
): Promise<TransactionStats> {
  const { data } = await httpClient.get<ResponseEnvelope<TransactionStats>>(
    `${TRANSACTIONS_BASE}/stats`,
    { params },
  );

  return data.data;
}

export async function getBatchDetail(
  params: GetBatchDetailParams,
): Promise<BatchDetailItem[]> {
  const { data } = await httpClient.get<ResponseEnvelope<BatchDetailItem[]>>(
    `${TRANSACTIONS_BASE}/batch-detail`,
    { params },
  );

  return data.data;
}
