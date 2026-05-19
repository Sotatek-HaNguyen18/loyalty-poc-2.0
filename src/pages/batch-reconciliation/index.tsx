import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Alert } from "antd";
import { BatchHeader } from "./components/batch-header";
import { FilterSection } from "./components/filter-section";
import { DataTable } from "./components/data-table";
import type { BatchRecord } from "./types";
import { BatchDetailDrawer } from "./components/batch-detail-drawer";
import { resolveCategoryId } from "./utils/category-filter";
import {
  getDefaultStatsDateRange,
  mapDailyBatchToRecord,
} from "./utils/map-batch";
import { getAssetCategories, getTransactionStats } from "@/services";
import type { CategoryType } from "@/types/assets";

const STATS_DATE_RANGE = getDefaultStatsDateRange();

export const BatchReconciliationPage = () => {
  const [assetFilter, setAssetFilter] = useState("Tất cả");
  const [selectedBatch, setSelectedBatch] = useState<BatchRecord | null>(null);

  const { data: categories } = useQuery({
    queryKey: ["asset-categories"],
    queryFn: getAssetCategories,
    staleTime: 5 * 60_000,
  });

  const categoryId = useMemo(
    () => resolveCategoryId(assetFilter, categories),
    [assetFilter, categories],
  );

  const {
    data: statsData,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "transaction-stats",
      STATS_DATE_RANGE.from,
      STATS_DATE_RANGE.to,
      categoryId,
    ],
    queryFn: () =>
      getTransactionStats({
        from: STATS_DATE_RANGE.from,
        to: STATS_DATE_RANGE.to,
        categoryId,
      }),
    placeholderData: keepPreviousData,
  });

  const categoryTypeById = useMemo(() => {
    const map = new Map<string, CategoryType>();
    for (const category of categories ?? []) {
      map.set(category.id, category.category);
    }
    return map;
  }, [categories]);

  const batchData = useMemo(
    () =>
      (statsData?.dailyBatch ?? []).map((row) =>
        mapDailyBatchToRecord(row, categoryTypeById.get(row.categoryId)),
      ),
    [statsData?.dailyBatch, categoryTypeById],
  );

  const stats = useMemo(() => {
    return {
      totalTx: batchData.reduce((sum, batch) => sum + batch.txCount, 0),
      totalVnd: batchData.reduce((sum, batch) => sum + batch.totalVnd, 0),
      processingCount: batchData.filter(
        (batch) => batch.status === "Đang xử lý",
      ).length,
      batchCount: batchData.length,
    };
  }, [batchData]);

  return (
    <div>
      <BatchHeader
        stats={stats}
        dateRangeLabel={`${STATS_DATE_RANGE.from} → ${STATS_DATE_RANGE.to}`}
        onRefresh={() => void refetch()}
        isRefreshing={isFetching}
      />

      {isError && (
        <Alert
          type="error"
          showIcon
          className="mb-4"
          message="Không tải được dữ liệu đối soát batch"
          action={
            <button
              type="button"
              onClick={() => void refetch()}
              className="text-sm font-medium text-bidv-green"
            >
              Thử lại
            </button>
          }
        />
      )}

      <div className="relative">
        <FilterSection
          assetFilter={assetFilter}
          setAssetFilter={setAssetFilter}
          filteredCount={batchData.length}
        />
        <DataTable
          data={batchData}
          loading={isLoading || isFetching}
          onRowClick={setSelectedBatch}
        />
      </div>

      <BatchDetailDrawer
        batch={selectedBatch}
        onClose={() => setSelectedBatch(null)}
      />
    </div>
  );
};
