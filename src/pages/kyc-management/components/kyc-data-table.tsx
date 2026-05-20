import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App, Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Eye } from "lucide-react";

import type { KYCLevel, KYCRecord, KYCStatus, RiskAppetite } from "../types";

import { StatusBadge } from "@/components/shared";
import { approveKYC } from "@/services";
import { getStatusVariant } from "@/utils";

interface KYCDataTableProps {
  data: KYCRecord[];
  currentPage: number;
  isError?: boolean;
  isLoading?: boolean;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSelectRecord: (record: KYCRecord) => void;
}

export function KYCDataTable({
  data,
  currentPage,
  isError,
  isLoading,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onSelectRecord,
}: KYCDataTableProps) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const approveKYCMutation = useMutation({
    mutationFn: (id: string) => approveKYC(id),
    onSuccess: async (_, id) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["kyc-list"] }),
        queryClient.invalidateQueries({ queryKey: ["kyc-list-stats"] }),
        queryClient.invalidateQueries({ queryKey: ["kyc-detail", id] }),
      ]);
      message.success("Đã duyệt KYC.");
    },
    onError: () => {
      message.error("Không thể duyệt KYC.");
    },
  });

  const columns: ColumnsType<KYCRecord> = [
    {
      title: "NHÀ ĐẦU TƯ",
      key: "investor",
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="mb-0.5 font-mono text-xs text-text-2">{record.id}</span>

          <span className="text-xsm font-semibold text-text">{record.name}</span>

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
      render: (text) => (
        <span className={`font-mono text-[11.5px] ${text === "Chưa cấp" ? "text-text-3" : "text-bidv-green"}`}>
          {text}
        </span>
      ),
    },

    {
      title: "DANH MỤC",
      dataIndex: "totalValue",
      key: "totalValue",
      align: "right",
      render: (text) => <span className="font-mono text-xsm font-normal text-text">{text}</span>,
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
            className="cursor-pointer rounded p-1.5 text-gray-400 transition-colors hover:text-emerald-600"
          >
            <Eye size={16} />
          </button>

          {record.status === "Đang xử lý" && (
            <Button
              color="default"
              variant="filled"
              loading={approveKYCMutation.isPending && approveKYCMutation.variables === (record.detailId ?? record.id)}
              disabled={approveKYCMutation.isPending}
              onClick={(e) => {
                e.stopPropagation();
                approveKYCMutation.mutate(record.detailId ?? record.id);
              }}
              className="bg-bidv-green! text-white! text-xs! h-6.75! px-2.5! py-1.25!"
            >
              Duyệt
            </Button>
          )}
        </div>
      ),
    },
  ];

  const rangeStart = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, total);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="overflow-hidden rounded-b-xl border border-app-border bg-white custom-antd-table">
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        locale={{
          emptyText: isError ? "Không tải được dữ liệu KYC." : "Không có dữ liệu KYC.",
        }}
        rowKey={(record) => `${record.id}-${record.walletAddress}`}
        pagination={false}
        scroll={{ x: "max-content" }}
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
          Hiển thị {rangeStart}-{rangeEnd} / {total} nhà đầu tư
        </span>

        <div className="flex gap-2">
          <Button
            className="h-8! rounded-md! border-gray-200! text-xs!"
            disabled={!canGoPrev || isLoading}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          >
            Trang trước
          </Button>

          <Button
            className="h-8! rounded-md! border-gray-200! text-xs!"
            disabled={!canGoNext || isLoading}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Trang sau
          </Button>
        </div>
      </div>
    </div>
  );
}
