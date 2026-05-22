import { Button } from "antd";
import { StatCard } from "@/components/shared";
import { formatNumber } from "@/utils";
import { RefreshCw } from "lucide-react";

interface KycHeaderProps {
  isRefreshing?: boolean;
  stats: {
    total: number;
    level2Plus: number;
    pending: number;
    frozen: number;
  };
  onRefresh: () => void;
}

export function KycHeader({ isRefreshing, stats, onRefresh }: KycHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div>
          <h2 className="text-[22px] font-black text-gray-900 tracking-tight mb-1!">
            Quản lý KYC nhà đầu tư
          </h2>
          <p className="text-xsm text-text-3 font-normal mb-0!">
            Module A · Duyệt KYC, freeze/unfreeze ví, quản lý whitelist
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {/* <Button icon={<Download size={16} />}>
            <span className="font-medium">Xuất Excel</span>
          </Button> */}
          <Button
            aria-label="Làm mới danh sách KYC"
            icon={<RefreshCw size={16} />}
            loading={isRefreshing}
            onClick={onRefresh}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="TỔNG NHÀ ĐẦU TƯ"
          value={formatNumber(stats.total)}
          subValue={`Từ 01/01/2026`}
        />
        <StatCard
          label="KYC LEVEL 2+"
          value={formatNumber(stats.level2Plus)}
          subValue="Giao dịch không giới hạn"
        />
        <StatCard
          label="CHỜ DUYỆT"
          value={formatNumber(stats.pending)}
          subValue="Cần xử lý trong 24h"
          variant="warning"
        />
        <StatCard
          label="ĐÓNG BĂNG"
          value={formatNumber(stats.frozen)}
          subValue="Tạm dừng on-chain"
          variant="danger"
        />
      </div>
    </div>
  );
}
