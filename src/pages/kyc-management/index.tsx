import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { KYCDetailDrawer, KycHeader, KYCDataTable, KycFilterSection } from "./components";
import { kycLevelParams, statusParams, type KYCRecord } from "./types";
import { mapKYCRecord } from "./utils/kyc-record";

import { useDebounce } from "@/hooks";
import { getKYCList } from "@/services";

const PAGE_SIZE = 10;
const STATS_PAGE_SIZE = 100;

export function KYCPage() {
  const [kycFilter, setKycFilter] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText.trim(), 400);
  const [page, setPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<KYCRecord | null>(null);
  const [detailRequestKey, setDetailRequestKey] = useState(0);

  const {
    data: kycResponse,
    isError,
    isFetching,
    isLoading,
    refetch: refetchKYCList,
  } = useQuery({
    queryFn: () =>
      getKYCList({
        search: debouncedSearchText || undefined,
        status: statusParams[statusFilter],
        kycLevel: kycLevelParams[kycFilter],
        page,
        limit: PAGE_SIZE,
      }),
    queryKey: ["kyc-list", kycFilter, statusFilter, debouncedSearchText, page],
    placeholderData: keepPreviousData,
  });

  const { data: statsResponse, refetch: refetchKYCStats } = useQuery({
    queryFn: () => getKYCList({ page: 1, limit: STATS_PAGE_SIZE }),
    queryKey: ["kyc-list-stats"],
    staleTime: 60_000,
  });

  const kycData = useMemo(() => (kycResponse?.items ?? []).map(mapKYCRecord), [kycResponse?.items]);

  const stats = useMemo(() => {
    const statsData = (statsResponse?.items ?? []).map(mapKYCRecord);

    return {
      total: statsResponse?.meta.total ?? statsData.length,
      level2Plus: statsData.filter((item) => item.level === "Level 2" || item.level === "VIP").length,
      pending: statsData.filter((item) => item.status === "Đang xử lý").length,
      frozen: statsData.filter((item) => item.status === "Frozen").length,
    };
  }, [statsResponse?.items, statsResponse?.meta]);

  const paginationMeta = kycResponse?.meta;
  const currentPage = paginationMeta?.page ?? page;
  const pageSize = paginationMeta?.limit ?? PAGE_SIZE;
  const totalResults = paginationMeta?.total ?? 0;
  const totalPages = paginationMeta?.totalPages ?? 1;

  const handleKycFilterChange = (value: string) => {
    setPage(1);
    setKycFilter(value);
  };

  const handleStatusFilterChange = (value: string) => {
    setPage(1);
    setStatusFilter(value);
  };

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearchText(value);
  };

  const handleRefresh = () => {
    void Promise.all([refetchKYCList(), refetchKYCStats()]);
  };

  const handleSelectRecord = (record: KYCRecord) => {
    setSelectedRecord(record);
    setDetailRequestKey((current) => current + 1);
  };

  return (
    <div>
      <KycHeader isRefreshing={isFetching} stats={stats} onRefresh={handleRefresh} />

      <div className="relative">
        <KycFilterSection
          searchText={searchText}
          setSearchText={handleSearchChange}
          setKycFilter={handleKycFilterChange}
          kycFilter={kycFilter}
          setStatusFilter={handleStatusFilterChange}
          statusFilter={statusFilter}
          filteredData={kycData}
        />

        <KYCDataTable
          currentPage={currentPage}
          data={kycData}
          isError={isError}
          isLoading={isLoading}
          pageSize={pageSize}
          total={totalResults}
          totalPages={totalPages}
          onPageChange={setPage}
          onSelectRecord={handleSelectRecord}
        />
      </div>

      <KYCDetailDrawer
        record={selectedRecord}
        requestKey={detailRequestKey}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
}
