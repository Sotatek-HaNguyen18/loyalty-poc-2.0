import type { Asset, CategoryType } from "@/types/assets";
import { formatNumber } from "@/utils";
import { isAxiosError } from "axios";

const CREATE_ASSET_ERROR_FALLBACK = "Tạo niêm yết thất bại, vui lòng thử lại";

const normalizeApiMessage = (value: unknown): string | null => {
  if (value == null) return null;
  if (Array.isArray(value)) {
    const joined = value.filter(Boolean).map(String).join(", ");
    return joined.trim() || null;
  }
  if (typeof value === "string" && value.trim()) return value.trim();
  return null;
};

export function getCreateAssetErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: unknown } | undefined;
    const fromBody = normalizeApiMessage(data?.message);
    if (fromBody) return fromBody;
    const fromAxios = normalizeApiMessage(error.message);
    if (fromAxios) return fromAxios;
  } else if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  return CREATE_ASSET_ERROR_FALLBACK;
}

export type ListedMetricCard = {
  label: string;
  value: string;
  subValue: string;
  unit?: string;
};

const toNumber = (value: unknown): number => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

const sumMetadata = (
  items: Asset[],
  field: "backing_ratio" | "converted_ratio",
): number =>
  items.reduce((sum, asset) => sum + toNumber(asset.metadata?.[field]), 0);

const filterByCategory = (assets: Asset[], category: CategoryType) =>
  assets.filter((asset) => asset.category.category === category);

export function computeListedMetrics(assets: Asset[]): ListedMetricCard[] {
  const activeCount = assets.filter((a) => a.status === "active").length;
  const pendingCount = assets.filter((a) => a.status === "coming_soon").length;
  const totalCount = assets.length;

  const goldAssets = filterByCategory(assets, "gold");
  const realEstateAssets = filterByCategory(assets, "real_estate");
  const carbonAssets = filterByCategory(assets, "carbon");

  const goldGrams = sumMetadata(goldAssets, "backing_ratio");
  const goldChi = sumMetadata(goldAssets, "converted_ratio");
  const realEstateValue = sumMetadata(realEstateAssets, "converted_ratio");
  const carbonCredits = sumMetadata(carbonAssets, "converted_ratio");

  return [
    {
      label: "Tổng niêm yết",
      value: String(totalCount),
      subValue: `${activeCount} active · ${pendingCount} pending`,
    },
    {
      label: "Vàng (BGT)",
      value: String(goldAssets.length),
      unit: "lô",
      subValue: `Tổng: ${formatNumber(goldGrams)}g · ${formatNumber(goldChi, 2)} chỉ`,
    },
    {
      label: "BĐS (BRT)",
      value: String(realEstateAssets.length),
      unit: "dự án",
      subValue: `Tổng giá trị: ${formatNumber(realEstateValue, 2)} tỷ VND`,
    },
    {
      label: "Carbon (BCT)",
      value: String(carbonAssets.length),
      unit: "đợt",
      subValue: `${formatNumber(carbonCredits)} tCO₂e · Vintage 2025`,
    },
  ];
}
