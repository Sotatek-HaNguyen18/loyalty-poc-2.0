import type { KYCRecord } from "./types";
import { MOCK_KYC_DATA } from "./constants/mock-kyc-data";

import { KYCDetailDrawer, KycHeader, KYCDataTable, KycFilterSection } from "./components";
import { useMemo, useState } from "react";

export function KYCPage() {
  const [kycFilter, setKycFilter] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [searchText, setSearchText] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<KYCRecord | null>(null);

  const filteredData = MOCK_KYC_DATA.filter((item) => {
    const matchesKyc = kycFilter === "Tất cả" || item.level === kycFilter;
    const matchesStatus = statusFilter === "Tất cả" || item.status === statusFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase()) || item.id.toLowerCase().includes(searchText.toLowerCase());
    return matchesKyc && matchesStatus && matchesSearch;
  });

  const stats = useMemo(() => {
    return {
      total: filteredData.length,
      level2Plus: filteredData.filter((item) => item.level === "Level 2" || item.level === "VIP").length,
      pending: filteredData.filter((item) => item.status === "Đang xử lý").length,
      frozen: filteredData.filter((item) => item.status === "Frozen").length,
    };
  }, [filteredData]);

  return (
    <div>
      <KycHeader stats={stats} />

      <div className="relative">
        <KycFilterSection
          searchText={searchText}
          setSearchText={setSearchText}
          setKycFilter={setKycFilter}
          kycFilter={kycFilter}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          filteredData={filteredData}
        />

        <KYCDataTable data={filteredData} onSelectRecord={setSelectedRecord} />
      </div>

      <KYCDetailDrawer record={selectedRecord} onClose={() => setSelectedRecord(null)} />
    </div>
  );
}
