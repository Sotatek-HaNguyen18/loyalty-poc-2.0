import { Button } from "antd";

interface FilterSectionProps {
  assetFilter: string;
  setAssetFilter: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  filteredCount: number;
}

export function FilterSection({ assetFilter, setAssetFilter, statusFilter, setStatusFilter, filteredCount }: FilterSectionProps) {
  return (
    <div className="flex items-center justify-between mb-0 border border-app-border border-b-0  bg-white p-4 rounded-t-xl">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-text-3">Loại tài sản:</span>
          <div className="flex rounded-lg gap-1.5">
            {["Tất cả", "Vàng", "BĐS", "Carbon"].map((tab) => (
              <Button
                color="default"
                variant="filled"
                key={tab}
                onClick={() => setAssetFilter(tab)}
                className={`px-2.5! py-1.25! rounded-md text-xs! h-7! font-bold transition-all ${
                  assetFilter === tab ? "bg-bidv-green! text-white!" : "text-gray-500 hover:text-gray-900"
                }`}>
                {tab}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-text-3">Trạng thái:</span>
          <div className="flex rounded-lg gap-1.5">
            {["Tất cả", "Khớp", "Lệch", "Đang xử lý"].map((tab) => (
              <Button
                color="default"
                variant="filled"
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-2.5! py-1.25! rounded-md text-xs! h-7! font-bold transition-all ${
                  statusFilter === tab ? "bg-bidv-green! text-white!" : "text-gray-500 hover:text-gray-900"
                }`}>
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="text-xs font-medium text-text-3 mr-2">{filteredCount} batch</div>
    </div>
  );
}
