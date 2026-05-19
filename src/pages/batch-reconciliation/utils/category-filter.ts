import type { AssetCategory, CategoryType } from "@/types/assets";

const FILTER_TO_CATEGORY_TYPE: Record<string, CategoryType | undefined> = {
  "Tất cả": undefined,
  Vàng: "gold",
  BĐS: "real_estate",
  Carbon: "carbon",
};

export function resolveCategoryId(
  assetFilter: string,
  categories: AssetCategory[] | undefined,
): string | undefined {
  const categoryType = FILTER_TO_CATEGORY_TYPE[assetFilter];
  if (!categoryType || !categories?.length) {
    return undefined;
  }

  return categories.find((item) => item.category === categoryType)?.id;
}
