import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ChevronRight } from "lucide-react";
import type { AssetType, BatchRecord } from "../types";
import { MOCK_DATA } from "../constants/mock-data";
import { AssetIcon, StatusBadge } from "@/components/shared";
import { getStatusVariant } from "@/utils";

const columns: ColumnsType<BatchRecord> = [
  {
    title: "NGÀY BATCH",
    dataIndex: "date",
    key: "date",
    render: (text) => <span className="text-[12.5px] font-semibold text-text">{text}</span>,
  },
  {
    title: "LOẠI TÀI SẢN",
    dataIndex: "assetType",
    key: "assetType",
    render: (type: AssetType) => (
      <div className="flex items-center gap-2">
        <AssetIcon type={type} />
      </div>
    ),
  },
  {
    title: "SỐ GD",
    dataIndex: "txCount",
    key: "txCount",
    align: "right",
    render: (val) => <span className="text-[13px] font-normal text-text">{val.toLocaleString()}</span>,
  },
  {
    title: "MINT",
    dataIndex: "mint",
    key: "mint",
    align: "right",
    render: (val) => (
      <span className="text-[13px] font-normal text-success">{val > 0 ? `+${val.toLocaleString()}` : val === 0 ? "—" : val.toLocaleString()}</span>
    ),
  },
  {
    title: "BURN",
    dataIndex: "burn",
    key: "burn",
    align: "right",
    render: (val) => (
      <span className="text-[13px] font-normal text-danger">
        {val < 0 ? `${val.toLocaleString()}` : val === 0 ? "—" : `+${val.toLocaleString()}`}
      </span>
    ),
  },
  {
    title: "TRANSFER",
    dataIndex: "transfer",
    key: "transfer",
    align: "right",
    render: (val) => <span className="text-[13px] font-normal text-text">{val.toLocaleString()}</span>,
  },
  {
    title: "TỔNG VND",
    dataIndex: "totalVnd",
    key: "totalVnd",
    align: "right",
    render: (val) => <span className="text-[13px] font-semibold text-text">{val.toLocaleString()} đ</span>,
  },
  {
    title: "TRẠNG THÁI",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const variant = getStatusVariant(status);
      return <StatusBadge label={status} variant={variant} showDot />;
    },
  },
  {
    title: "CORE BANKING",
    dataIndex: "coreBanking",
    key: "coreBanking",
    render: (val) => (
      <>
        {val === "OK" && <span className="text-xs font-semibold text-success">OK</span>}
        {val === "Diff" && <span className="text-xs font-semibold text-danger">Diff: 1</span>}
        {val === "Pending" && <span className="text-xs font-semibold">—</span>}
      </>
    ),
  },
  {
    key: "action",
    align: "right",
    render: () => (
      <button className="p-1 text-gray-300 group-hover:text-emerald-600 rounded transition-colors">
        <ChevronRight size={18} />
      </button>
    ),
  },
];
interface DataTableProps {
  assetFilter: string;
  statusFilter: string;
  onRowClick: (record: BatchRecord) => void;
}

export function DataTable({ assetFilter, statusFilter, onRowClick }: DataTableProps) {
  const filteredData = MOCK_DATA.filter((item) => {
    const matchesAsset =
      assetFilter === "Tất cả" ||
      (assetFilter === "Vàng" && item.assetType === "Gold") ||
      (assetFilter === "BĐS" && item.assetType === "RealEstate") ||
      (assetFilter === "Carbon" && item.assetType === "Carbon");

    const matchesStatus = statusFilter === "Tất cả" || item.status === statusFilter;

    return matchesAsset && matchesStatus;
  });

  return (
    <div className="bg-white rounded-b-xl border border-app-border overflow-hidden custom-antd-table">
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={false}
        scroll={{ x: "max-content" }}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
          className: "cursor-pointer group",
        })}
        className="[&_.ant-table-thead_th]:bg-bg-alt [&_.ant-table-thead_th]:text-[11.5px] [&_.ant-table-thead_th]:text-text-3! [&_.ant-table-thead_th]:uppercase [&_.ant-table-thead_th]:tracking-widest [&_.ant-table-thead_th]:font-semibold [&_.ant-table-thead_th]:border-b-gray-100 [&_.ant-table-tbody_tr:hover_td]:bg-gray-50/80 [&_.ant-table-tbody_td]:border-b-gray-50 [&_.ant-table-tbody_td]:py-4 [&_.ant-table-tbody_td]:px-6 [&_.ant-table-thead_th]:py-3! [&_.ant-table-thead_th]:px-4!"
      />
    </div>
  );
}
