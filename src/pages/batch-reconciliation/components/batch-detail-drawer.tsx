import { useQuery } from "@tanstack/react-query";
import { Card, Drawer, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { X } from "lucide-react";
import type { BatchRecord, Transaction } from "../types";
import { AssetIcon, StatusBadge } from "@/components/shared";
import { useEffect, useMemo, useState } from "react";
import { formatCompactVnd, formatNumber, getStatusVariant } from "@/utils";
import { getBatchDetail } from "@/services";
import { mapBatchDetailItem } from "../utils/map-batch";

interface BatchDetailDrawerProps {
  batch: BatchRecord | null;
  onClose: () => void;
}

export function BatchDetailDrawer({ batch, onClose }: BatchDetailDrawerProps) {
  const [width, setWidth] = useState(window.innerWidth < 768 ? "100%" : 700);

  const {
    data: detailItems,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["batch-detail", batch?.rawDate, batch?.categoryId],
    queryFn: () =>
      getBatchDetail({
        date: batch!.rawDate,
        categoryId: batch!.categoryId,
      }),
    enabled: !!batch,
  });

  const transactions = useMemo(
    () => (detailItems ?? []).map(mapBatchDetailItem),
    [detailItems],
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth < 768 ? "100%" : 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns: ColumnsType<Transaction> = [
    {
      title: "THỜI GIAN",
      dataIndex: "time",
      key: "time",
      render: (text) => (
        <span className="text-xs text-text font-mono">{text}</span>
      ),
    },
    {
      title: "NHÀ ĐẦU TƯ",
      key: "investor",
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="text-xs font-medium text-text">
            {record.investorName}
          </span>
          <span className="text-[11px] text-text-3 font-mono">
            {record.investorId}
          </span>
        </div>
      ),
    },
    {
      title: "LOẠI",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        return (
          <StatusBadge label={type} variant={getStatusVariant(type)} showDot />
        );
      },
    },
    {
      title: "SỐ TOKEN",
      dataIndex: "tokenCount",
      key: "tokenCount",
      align: "right",
      render: (val) => (
        <span className="text-xs font-medium text-text font-mono">
          {formatNumber(val)}
        </span>
      ),
    },
    {
      title: "VND",
      dataIndex: "vndValue",
      key: "vndValue",
      align: "right",
      render: (val) => (
        <span className="text-xs font-medium text-text">
          {formatCompactVnd(val)}
        </span>
      ),
    },
    {
      title: "TX HASH",
      dataIndex: "txHash",
      key: "txHash",
      render: (text) =>
        text ? (
          <div className="flex items-center gap-1 text-xs font-mono text-bidv-green underline decoration-dotted cursor-pointer">
            {text}
          </div>
        ) : (
          <span className="text-xs font-mono text-text">—</span>
        ),
    },
  ];

  return (
    <Drawer
      title={null}
      placement="right"
      onClose={onClose}
      open={!!batch}
      size={width}
      closable={false}
      styles={{ body: { padding: 0 } }}
    >
      {batch && (
        <div className="flex flex-col h-full bg-white">
          <div className="p-6 border-b border-app-border flex sm:flex-row sm:items-center sm:justify-between flex-col gap-2 sticky top-0 bg-white/80 backdrop-blur-md z-10">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-text-3 uppercase tracking-widest">
                CHI TIẾT BATCH
              </span>
              <div className="flex items-center gap-3">
                <h3 className="2xl:text-lg! md:text-[16px]! font-bold! text-text mb-0!">
                  Batch {batch.date}
                </h3>
                <AssetIcon type={batch.assetType} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 cursor-pointer hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <Card
                styles={{
                  body: {
                    padding: "12px 14px",
                  },
                }}
              >
                <span className="text-[11.5px] font-medium text-text-3 uppercase tracking-wider block mb-1.5">
                  SỐ GD
                </span>
                <span className="text-xl font-bold text-text font-mono leading-7.5!">
                  {batch.txCount}
                </span>
              </Card>

              <Card
                styles={{
                  body: {
                    padding: "12px 14px",
                  },
                }}
              >
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  TỔNG VND
                </span>
                <span className="text-xl font-bold text-text leading-7.5!">
                  {formatCompactVnd(batch.totalVnd)}
                </span>
              </Card>

              <Card
                styles={{
                  body: {
                    padding: "12px 14px",
                  },
                }}
              >
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  LOẠI TÀI SẢN
                </span>
                <span className="text-sm font-bold text-text leading-7.5!">
                  {batch.categoryName}
                </span>
              </Card>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[11px] font-semibold text-text-3 uppercase tracking-widest">
                  GIAO DỊCH TRONG BATCH ({transactions.length})
                </h4>
              </div>
              <Spin spinning={isLoading || isFetching}>
                <Table
                  columns={columns}
                  dataSource={transactions}
                  rowKey="id"
                  pagination={false}
                  scroll={{ x: "max-content" }}
                  size="small"
                  className="[&_.ant-table-thead_th]:bg-gray-50/50 [&_.ant-table-thead_th]:text-[11.5px] [&_.ant-table-thead_th]:text-text-3! [&_.ant-table-thead_th]:font-bold [&_.ant-table-thead_th]:uppercase [&_.ant-table-thead_th]:tracking-widest [&_.ant-table-thead_th]:border-b-gray-100"
                />
              </Spin>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
