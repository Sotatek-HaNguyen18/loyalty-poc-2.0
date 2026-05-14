import { Table, Tag } from "antd";
import { dataSource } from "../../constants/mock-kyc-data";
import { StatusBadge } from "@/components/shared";
import { getStatusVariant } from "@/utils";

const columns = [
  {
    title: "THỜI GIAN",
    dataIndex: "time",
    key: "time",
    render: (t: string) => <span className="text-xs font-normal text-text-2">{t}</span>,
  },

  {
    title: "LOẠI GD",
    dataIndex: "type",
    key: "type",
    render: (t: string) => {
      return <StatusBadge label={t} variant={getStatusVariant(t)} showDot />;
    },
  },

  {
    title: "TÀI SẢN",
    dataIndex: "asset",
    key: "asset",
    render: (t: string) => <span className="text-xs font-normal text-text">{t}</span>,
  },

  {
    title: "SỐ LƯỢNG",
    dataIndex: "amount",
    key: "amount",
    align: "right" as const,
    render: (t: string) => <span className="text-[13px] font-normal text-text">{t}</span>,
  },

  {
    title: "VND",
    dataIndex: "vnd",
    key: "vnd",
    align: "right" as const,
    render: (t: string) => <span className="text-xs font-normal text-text">{t}</span>,
  },

  {
    title: "TX HASH",
    dataIndex: "hash",
    key: "hash",
    render: (t: string) => <span className="text-[11.5px] font-mono text-bidv-green">{t}</span>,
  },
];

export function TransactionHistoryTab() {
  return (
    <div className="py-5 px-6">
      <Table
        size="small"
        pagination={false}
        columns={columns}
        scroll={{ x: "max-content" }}
        dataSource={dataSource}
        className="
          [&_.ant-table-thead_th]:bg-bg-alt
          [&_.ant-table-thead_th]:text-[11.5px]
          [&_.ant-table-thead_th]:py-3!
          [&_.ant-table-thead_th]:px-4!
          [&_.ant-table-thead_th]:text-text-3!
          [&_.ant-table-thead_th]:font-bold
          [&_.ant-table-thead_th]:uppercase
          [&_.ant-table-thead_th]:tracking-widest
        "
      />
    </div>
  );
}
