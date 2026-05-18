import { Search } from "lucide-react";
import { Button, Input } from "antd";

import type { KYCRecord } from "../types";

interface KycFilterSectionProps {
  searchText: string;
  setSearchText: (v: string) => void;
  setKycFilter: (v: string) => void;
  kycFilter: string;
  setStatusFilter: (v: string) => void;
  statusFilter: string;
  filteredData: KYCRecord[];
}

const kycFilters = ["Tất cả", "Level 1", "Level 2", "VIP"];

const statusFilters = [
  { label: "Tất cả", value: "Tất cả" },
  { label: "Hoạt động", value: "Đang giao dịch" },
  // { label: "Chờ duyệt", value: "Đang xử lý" },
  { label: "Đóng băng", value: "Frozen" },
];

export function KycFilterSection({
  searchText,
  setSearchText,
  setKycFilter,
  kycFilter,
  setStatusFilter,
  statusFilter,
  filteredData,
}: KycFilterSectionProps) {
  return (
    <div className="bg-white rounded-t-xl border-x border-t border-app-border p-4 flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-4">
      <div className="flex flex-col 2xl:flex-row 2xl:items-center gap-4 lg:gap-6">
        <div className="relative w-full 2xl:w-64">
          <Input
            placeholder="Tìm tên, ID, SĐT..."
            prefix={<Search size={14} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-app-border! text-xs"
          />
        </div>

        <div className="flex sm:flex-row sm:items-center flex-col items-start gap-3">
          <span className="text-[11.5px] font-bold text-text-3 uppercase">KYC:</span>
          <div className="flex flex-wrap rounded-lg gap-1.5">
            {kycFilters.map((tab) => (
              <Button
                color="default"
                variant="filled"
                key={tab}
                onClick={() => setKycFilter(tab)}
                className={`px-2.5! py-1.25! rounded-md text-xs! h-7! font-bold transition-all ${
                  kycFilter === tab ? "bg-bidv-green! text-white!" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex sm:flex-row sm:items-center flex-col items-start gap-3">
          <span className="text-[11.5px] font-bold text-text-3 uppercase">Trạng thái:</span>
          <div className="flex flex-wrap rounded-lg gap-1.5">
            {statusFilters.map((tab) => (
              <Button
                color="default"
                variant="filled"
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`px-2.5! py-1.25! rounded-md text-xs! h-7! font-bold transition-all ${
                  statusFilter === tab.value ? "bg-bidv-green! text-white!" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs font-normal text-text-3 self-start 2xl:self-center">{filteredData.length} kết quả</div>
    </div>
  );
}
