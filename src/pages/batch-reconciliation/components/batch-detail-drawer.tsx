import { Button, Card, Drawer, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Download, X } from "lucide-react";
import type { BatchRecord, Transaction } from "../types";
import { MOCK_TRANSACTIONS } from "../constants/mock-data";
import { AssetIcon, StatusBadge } from "@/components/shared";
import { useEffect, useState } from "react";
import { getStatusVariant } from "@/utils";

interface BatchDetailDrawerProps {
  batch: BatchRecord | null;
  onClose: () => void;
}

export function BatchDetailDrawer({ batch, onClose }: BatchDetailDrawerProps) {
  const [width, setWidth] = useState(window.innerWidth < 768 ? "100%" : 700);

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
      render: (text) => <span className="text-xs text-text font-mono">{text}</span>,
    },
    {
      title: "NHÀ ĐẦU TƯ",
      key: "investor",
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="text-xs font-medium text-text">{record.investorName}</span>
          <span className="text-[11px] text-text-3 font-mono">{record.investorId}</span>
        </div>
      ),
    },
    {
      title: "LOẠI",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        return <StatusBadge label={type} variant={getStatusVariant(type)} showDot />;
      },
    },
    {
      title: "SỐ TOKEN",
      dataIndex: "tokenCount",
      key: "tokenCount",
      align: "right",
      render: (val) => <span className="text-xs font-medium text-text font-mono">{val.toLocaleString()}</span>,
    },
    {
      title: "VND",
      dataIndex: "vndValue",
      key: "vndValue",
      align: "right",
      render: (val) => <span className="text-xs font-medium text-text">{val.toLocaleString("vi-VN")} đ</span>,
    },
    {
      title: "TX HASH",
      dataIndex: "txHash",
      key: "txHash",
      render: (text) => (
        <div className="flex items-center gap-1 text-xs font-mono text-bidv-green underline decoration-dotted cursor-pointer">{text}</div>
      ),
    },
  ];

  return (
    <Drawer title={null} placement="right" onClose={onClose} open={!!batch} size={width} closable={false} styles={{ body: { padding: 0 } }}>
      {batch && (
        <div className="flex flex-col h-full bg-white">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-text-3 uppercase tracking-widest">CHI TIẾT BATCH</span>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold! text-text mb-0!">Batch {batch.date}</h3>
                <AssetIcon type={batch.assetType} />

                <StatusBadge label={batch.status} variant={getStatusVariant(batch.status)} showDot />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button icon={<Download size={14} />}>
                <span>CSV</span>
              </Button>

              <Button type="primary">
                <span> So sánh với Core</span>
              </Button>

              <button onClick={onClose} className="p-1.5 text-gray-400 cursor-pointer hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Card
                styles={{
                  body: {
                    padding: "12px 14px",
                  },
                }}>
                <span className="text-[11.5px] font-medium text-text-3 uppercase tracking-wider block mb-1.5">SỐ GD</span>
                <span className="text-xl font-bold text-text font-mono leading-7.5!">{batch.txCount}</span>
              </Card>

              <Card
                styles={{
                  body: {
                    padding: "12px 14px",
                  },
                }}>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-2">TỔNG VND</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-text leading-7.5!">{Math.round(batch.totalVnd / 1000000).toLocaleString("vi-VN")}</span>
                  <span className="text-xs font-bold text-gray-500">tr</span>
                </div>
              </Card>

              <Card
                styles={{
                  body: {
                    padding: "12px 14px",
                  },
                }}>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-2">ĐỐI SOÁT CORE</span>
                <span className={`text-xl font-bold font-mono leading-7.5! ${batch.coreBanking === "OK" ? "text-success" : "text-danger"}`}>
                  {batch.coreBanking === "OK" ? "OK" : "DIFF"}
                </span>
              </Card>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[11px] font-semibold text-text-3 uppercase tracking-widest">
                  GIAO DỊCH TRONG BATCH ({MOCK_TRANSACTIONS.length})
                </h4>
              </div>
              <Table
                columns={columns}
                dataSource={MOCK_TRANSACTIONS}
                rowKey="id"
                pagination={false}
                size="small"
                className="[&_.ant-table-thead_th]:bg-gray-50/50 [&_.ant-table-thead_th]:text-[11.5px] [&_.ant-table-thead_th]:text-text-3! [&_.ant-table-thead_th]:font-bold [&_.ant-table-thead_th]:uppercase [&_.ant-table-thead_th]:tracking-widest [&_.ant-table-thead_th]:border-b-gray-100"
              />
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
