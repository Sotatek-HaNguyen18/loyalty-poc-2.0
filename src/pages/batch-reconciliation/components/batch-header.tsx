import { Button } from "antd";
import { StatCard } from "@/components/shared";

import { Filter, RefreshCw } from "lucide-react";

interface BatchHeaderProps {
  stats: {
    totalTx: number;
    totalVnd: number;
    processingCount: number;
    batchCount: number;
  };
  dateRangeLabel: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function BatchHeader({
  stats,
  dateRangeLabel,
  onRefresh,
  isRefreshing,
}: BatchHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div>
          <h2 className="text-[22px] font-black text-gray-900 tracking-tight mb-1!">
            Đối soát batch
          </h2>
          <p className="text-xsm text-text-3 font-normal mb-0!">
            Module B · So sánh giao dịch on-chain với hệ thống Core Banking BIDV
            theo ngày & theo loại tài sản
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button icon={<Filter size={16} />}>
            <span className="font-medium">Bộ lọc nâng cao</span>
          </Button>
          <Button
            color="default"
            variant="filled"
            className="bg-bidv-green! text-white! hover:bg-bidv-green-700!"
            icon={
              <RefreshCw
                size={16}
                className={isRefreshing ? "animate-spin" : ""}
              />
            }
            onClick={onRefresh}
            loading={isRefreshing}
          >
            <span className="font-medium">Làm mới dữ liệu</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="TỔNG GIAO DỊCH"
          value={stats.totalTx.toLocaleString()}
          subValue={`${stats.batchCount} batch`}
        />
        <StatCard
          label="TỔNG GIÁ TRỊ VND"
          value={
            stats.totalVnd >= 1000000000
              ? `${(stats.totalVnd / 1000000000).toFixed(1)} tỷ`
              : `${(stats.totalVnd / 1000000).toFixed(1)} tr`
          }
          subValue={dateRangeLabel}
        />
        <StatCard
          label="ĐANG XỬ LÝ"
          value={stats.processingCount.toString()}
          subValue="Chưa hoàn tất đối soát"
          variant="warning"
        />
      </div>
    </div>
  );
}
