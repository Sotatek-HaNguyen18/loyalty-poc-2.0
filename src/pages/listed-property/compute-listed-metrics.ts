import type { Asset, CategoryType } from "@/types/assets";

export type ListedMetricCard = {
  label: string;
  value: string;
  subValue: string;
  unit?: string;
};

const numberFormatter = new Intl.NumberFormat("vi-VN");
const decimalFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 2,
});

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
  const inactiveCount = assets.filter((a) => a.status === "inactive").length;
  const draftCount = assets.filter((a) => a.status === "coming_soon").length;

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
      value: String(assets.length),
      subValue: `${activeCount} active · ${inactiveCount} paused · ${draftCount} draft`,
    },
    {
      label: "Vàng (BGT)",
      value: String(goldAssets.length),
      unit: "lô",
      subValue: `Tổng: ${numberFormatter.format(goldGrams)}g · ${decimalFormatter.format(goldChi)} chỉ`,
    },
    {
      label: "BĐS (BRT)",
      value: String(realEstateAssets.length),
      unit: "dự án",
      subValue: `Tổng giá trị: ${decimalFormatter.format(realEstateValue)} tỷ VND`,
    },
    {
      label: "Carbon (BCT)",
      value: String(carbonAssets.length),
      unit: "đợt",
      subValue: `${numberFormatter.format(carbonCredits)} tCO₂e · Vintage 2025`,
    },
  ];
}
