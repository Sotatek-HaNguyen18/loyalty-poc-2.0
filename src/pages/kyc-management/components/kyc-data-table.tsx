import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Eye } from "lucide-react";

import type { KYCLevel, KYCRecord, KYCStatus, RiskAppetite } from "../types";

import { StatusBadge } from "@/components/shared";
import { getStatusVariant } from "@/utils";

interface KYCDataTableProps {
  data: KYCRecord[];
  onSelectRecord: (record: KYCRecord) => void;
}

export function KYCDataTable({ data, onSelectRecord }: KYCDataTableProps) {
  const columns: ColumnsType<KYCRecord> = [
    {
      title: "NHÀ ĐẦU TƯ",
      key: "investor",
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="mb-0.5 font-mono text-xs text-text-2">{record.id}</span>

          <span className="text-[13px] font-semibold text-text">{record.name}</span>

          <span className="text-[11px] text-text-3">{record.phone}</span>
        </div>
      ),
    },

    {
      title: "CCCD",
      dataIndex: "cccd",
      key: "cccd",
      render: (text) => <span className="font-mono text-xs font-medium text-text">{text}</span>,
    },

    {
      title: "CẤP KYC",
      dataIndex: "level",
      key: "level",
      render: (level: KYCLevel) => {
        const variant = getStatusVariant(level);

        return <StatusBadge label={level} variant={variant} className="font-bold" />;
      },
    },

    {
      title: "KHẨU VỊ RR",
      dataIndex: "riskAppetite",
      key: "riskAppetite",
      render: (risk: RiskAppetite) => {
        const variant = getStatusVariant(risk);

        return <StatusBadge label={risk} variant={variant} className="font-semibold" />;
      },
    },

    {
      title: "ĐỊA CHỈ VÍ",
      dataIndex: "walletAddress",
      key: "walletAddress",
      render: (text) => <span className={`font-mono text-[11.5px] ${text === "Chưa cấp" ? "text-text-3" : "text-bidv-green"}`}>{text}</span>,
    },

    {
      title: "DANH MỤC",
      dataIndex: "limit",
      key: "limit",
      align: "right",
      render: (text) => <span className="font-mono text-[13px] font-normal text-text">{text}</span>,
    },

    {
      title: "TRẠNG THÁI",
      dataIndex: "status",
      key: "status",
      render: (status: KYCStatus) => {
        const variant = getStatusVariant(status);

        return <StatusBadge label={status} variant={variant} showDot />;
      },
    },

    {
      title: "ĐĂNG KÝ",
      dataIndex: "registrationDate",
      key: "registrationDate",
      render: (text) => <span className="text-xs text-text-2">{text}</span>,
    },

    {
      key: "action",
      align: "right",
      render: (_, record) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectRecord(record);
            }}
            className="cursor-pointer rounded p-1.5 text-gray-400 transition-colors hover:text-emerald-600">
            <Eye size={16} />
          </button>

          {record.status === "Đang xử lý" && (
            <Button color="default" variant="filled" className="bg-bidv-green! h-7! px-2.5! py-1.25! text-xs! text-white! hover:bg-bidv-green-700!">
              Duyệt
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-b-xl border border-app-border bg-white custom-antd-table">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        scroll={{ x: 'max-content' }}
        onRow={(record) => ({
          onClick: () => onSelectRecord(record),
          className: "group cursor-pointer",
        })}
        className="
          [&_.ant-table-tbody_td]:border-b-gray-50
          [&_.ant-table-tbody_td]:px-6
          [&_.ant-table-tbody_td]:py-4
          [&_.ant-table-tbody_tr:hover_td]:bg-gray-50/80
          [&_.ant-table-thead_th]:border-b-gray-100
          [&_.ant-table-thead_th]:bg-bg-alt
          [&_.ant-table-thead_th]:px-4!
          [&_.ant-table-thead_th]:py-3!
          [&_.ant-table-thead_th]:text-[11.5px]
          [&_.ant-table-thead_th]:font-semibold
          [&_.ant-table-thead_th]:tracking-widest
          [&_.ant-table-thead_th]:uppercase
          [&_.ant-table-thead_th]:text-text-3!
        "
      />

      <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-50 p-4 text-[11px] text-gray-500 sm:flex-row">
        <span>
          Hiển thị 1-{data.length} / {data.length} nhà đầu tư
        </span>

        <div className="flex gap-2">
          <button className="rounded border border-gray-200 bg-white px-3 py-1 hover:bg-gray-50 disabled:opacity-50">Trang trước</button>

          <button className="rounded border border-gray-200 bg-white px-3 py-1 hover:bg-gray-50 disabled:opacity-50">Trang sau</button>
        </div>
      </div>
    </div>
  );
}
