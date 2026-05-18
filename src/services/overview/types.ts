export type OverviewCategoryType = "gold" | "real_estate" | "carbon";

export type OverviewSummary = {
  cards: {
    listedAssets: {
      value: number;
      deltaLast7Days: number;
    };
    totalOnChainValueVnd: number;
    transactionsToday: {
      value: number;
      deltaPercentVsYesterday: number | null;
    };
    unreconciledBatches: number;
  };
  allocation: Array<{
    categoryId: string;
    categoryType: OverviewCategoryType;
    categoryName: string;
    count: number;
    valueVnd: number;
    sharePercent: number;
  }>;
  generatedAt: string;
};
