import { BatchHeader } from "./components/batch-header";
import { FilterSection } from "./components/filter-section";
import { DataTable } from "./components/data-table";
import { useMemo, useState } from "react";
import type { BatchRecord } from "./types";
import { BatchDetailDrawer } from "./components/batch-detail-drawer";
import { MOCK_DATA } from "./constants/mock-data";

export const BatchReconciliationPage = () => {
  const [assetFilter, setAssetFilter] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [selectedBatch, setSelectedBatch] = useState<BatchRecord | null>(null);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter((item) => {
      const matchesAsset =
        assetFilter === "Tất cả" ||
        (assetFilter === "Vàng" && item.assetType === "Gold") ||
        (assetFilter === "BĐS" && item.assetType === "RealEstate") ||
        (assetFilter === "Carbon" && item.assetType === "Carbon");

      const matchesStatus = statusFilter === "Tất cả" || item.status === statusFilter;

      return matchesAsset && matchesStatus;
    });
  }, [assetFilter, statusFilter]);

  const stats = useMemo(() => {
    return filteredData.reduce(
      (acc, curr) => {
        acc.totalTx += curr.txCount;
        acc.totalVnd += curr.totalVnd;
        if (curr.status === "Đang xử lý") acc.processingCount++;
        if (curr.coreBanking === "Diff") acc.diffCount++;
        return acc;
      },
      {
        totalTx: 0,
        totalVnd: 0,
        processingCount: 0,
        diffCount: 0,
        batchCount: filteredData.length,
      },
    );
  }, [filteredData]);

  return (
    <div>
      <BatchHeader stats={stats} />

      <div className="relative">
        <FilterSection
          assetFilter={assetFilter}
          setAssetFilter={setAssetFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          filteredCount={12}
        />
        <DataTable assetFilter={assetFilter} statusFilter={statusFilter} onRowClick={setSelectedBatch} />
      </div>

      <BatchDetailDrawer batch={selectedBatch} onClose={() => setSelectedBatch(null)} />
    </div>
  );
};
