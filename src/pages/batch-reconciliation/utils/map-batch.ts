import type { CategoryType } from "@/types/assets";
import type {
  DailyBatchRow,
  BatchDetailItem,
} from "@/services/transactions/types";
import type { AssetType, BatchRecord, Transaction } from "../types";

const CATEGORY_TYPE_TO_ASSET: Record<CategoryType, AssetType> = {
  gold: "Gold",
  real_estate: "RealEstate",
  carbon: "Carbon",
};

const CATEGORY_NAME_TO_ASSET: Record<string, AssetType> = {
  Vàng: "Gold",
  "Bất động sản": "RealEstate",
  Carbon: "Carbon",
};

export function formatDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

export function resolveAssetType(
  categoryName: string,
  categoryType?: CategoryType,
): AssetType {
  if (categoryType) {
    return CATEGORY_TYPE_TO_ASSET[categoryType];
  }
  return CATEGORY_NAME_TO_ASSET[categoryName] ?? "Gold";
}

export function mapDailyBatchToRecord(
  row: DailyBatchRow,
  categoryType?: CategoryType,
): BatchRecord {
  return {
    id: `${row.date}-${row.categoryId}`,
    date: formatDisplayDate(row.date),
    rawDate: row.date,
    categoryId: row.categoryId,
    categoryName: row.categoryName,
    assetType: resolveAssetType(row.categoryName, categoryType),
    txCount: row.soGD,
    mint: row.mint,
    burn: row.burn,
    transfer: row.transfer,
    totalVnd: row.totalVND,
    status: "Đang xử lý",
    coreBanking: "OK",
  };
}

function mapTransactionType(type: string): Transaction["type"] {
  switch (type) {
    case "buy":
      return "Mint";
    case "sell":
      return "Burn";
    case "transfer":
      return "Transfer";
    default:
      return "Transfer";
  }
}

export function mapBatchDetailItem(item: BatchDetailItem): Transaction {
  return {
    id: item.id,
    time: item.time,
    investorName: item.investorName,
    investorId: item.investorCode,
    type: mapTransactionType(item.type),
    tokenCount: item.soToken,
    vndValue: item.vnd,
    txHash: item.txHash || "",
  };
}

export function getDefaultStatsDateRange() {
  const year = new Date().getFullYear();
  return {
    from: `${year}-01-01`,
    to: `${year}-12-31`,
  };
}
