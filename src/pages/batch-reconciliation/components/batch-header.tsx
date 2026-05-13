import { Button } from "antd";
import { StatCard } from "./stat-card";

import { Filter, Download, RefreshCw } from "lucide-react";

interface BatchHeaderProps {
  stats: {
    totalTx: number;
    totalVnd: number;
    processingCount: number;
    diffCount: number;
    batchCount: number;
  };
}

export function BatchHeader({ stats }: BatchHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div>
          <h2 className="text-[22px] font-black text-gray-900 tracking-tight mb-1!">Đối soát batch</h2>
          <p className="text-[13px] text-text-3 font-normal">
            Module B · So sánh giao dịch on-chain với hệ thống Core Banking BIDV theo ngày & theo loại tài sản
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button icon={<Filter size={16} />}>
            <span className="font-medium">Bộ lọc nâng cao</span>
          </Button>
          <Button icon={<Download size={16} />}>
            <span className="font-medium">Xuất Excel</span>
          </Button>
          <Button color="primary" variant="solid" className="" icon={<RefreshCw size={16} />}>
            <span className="font-medium">Chạy đối soát ngày 12/05</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="TỔNG GIAO DỊCH" value={stats.totalTx.toLocaleString()} subValue={`${stats.batchCount} batch`} />
        <StatCard
          label="TỔNG GIÁ TRỊ VND"
          value={stats.totalVnd >= 1000000000 ? `${(stats.totalVnd / 1000000000).toFixed(1)} tỷ` : `${(stats.totalVnd / 1000000).toFixed(1)} tr`}
          subValue="Dựa trên bộ lọc"
        />
        <StatCard label="ĐANG XỬ LÝ" value={stats.processingCount.toString()} subValue="Chưa hoàn tất đối soát" variant="warning" />
        <StatCard label="LỆCH VỚI CORE" value={stats.diffCount.toString()} subValue="Cần xử lý ngay" variant="danger" />
      </div>
    </div>
  );
}
