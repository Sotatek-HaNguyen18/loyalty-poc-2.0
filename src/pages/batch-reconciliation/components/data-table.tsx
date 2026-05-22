import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ChevronRight } from "lucide-react";
import type { AssetType, BatchRecord } from "../types";
import { AssetIcon } from "@/components/shared";
import { formatCompactVnd, formatNumber } from "@/utils";

const columns: ColumnsType<BatchRecord> = [
  {
    title: "NGÀY BATCH",
    dataIndex: "date",
    key: "date",
    render: (text) => (
      <span className="text-[12.5px] font-semibold text-text">{text}</span>
    ),
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
    render: (val) => (
      <span className="text-xsm font-normal text-text">
        {formatNumber(val)}
      </span>
    ),
  },
  {
    title: "MINT",
    dataIndex: "mint",
    key: "mint",
    align: "right",
    render: (val) => (
      <span className="text-xsm font-normal text-success">
        {val > 0
          ? `+${formatNumber(val)}`
          : val === 0
            ? "—"
            : formatNumber(val)}
      </span>
    ),
  },
  {
    title: "BURN",
    dataIndex: "burn",
    key: "burn",
    align: "right",
    render: (val) => (
      <span className="text-xsm font-normal text-danger">
        {val > 0
          ? `-${formatNumber(val)}`
          : val === 0
            ? "—"
            : formatNumber(val)}
      </span>
    ),
  },
  {
    title: "TRANSFER",
    dataIndex: "transfer",
    key: "transfer",
    align: "right",
    render: (val) => (
      <span className="text-xsm font-normal text-text">
        {formatNumber(val)}
      </span>
    ),
  },
  {
    title: "TỔNG VND",
    dataIndex: "totalVnd",
    key: "totalVnd",
    align: "right",
    render: (val) => (
      <span className="text-xsm font-semibold text-text">
        {formatCompactVnd(val)}
      </span>
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
  data: BatchRecord[];
  loading?: boolean;
  onRowClick: (record: BatchRecord) => void;
}

export function DataTable({ data, loading, onRowClick }: DataTableProps) {
  return (
    <div className="bg-white rounded-b-xl border border-app-border overflow-hidden custom-antd-table">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
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
