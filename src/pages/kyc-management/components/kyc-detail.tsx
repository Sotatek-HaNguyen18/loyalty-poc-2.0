import { useQuery } from "@tanstack/react-query";
import { Drawer, Tabs } from "antd";

import type { KYCRecord } from "../types";
import { mapKYCRecord } from "../utils/kyc-record";

import { DrawerHeader } from "./kyc-drawer-header";
import { useResponsiveDrawer } from "@/hooks";
import { getKYCDetail } from "@/services";
import { ActionsTab, KYCInfoTab, PortfolioTab, TransactionHistoryTab } from "./tabs";

interface KYCDetailDrawerProps {
  record: KYCRecord | null;
  onClose: () => void;
}

export function KYCDetailDrawer({ record, onClose }: KYCDetailDrawerProps) {
  const width = useResponsiveDrawer();
  const idOrAddress = record?.detailId ?? record?.id;
  const { data: detailResponse } = useQuery({
    enabled: !!idOrAddress,
    queryFn: () => getKYCDetail(idOrAddress!),
    queryKey: ["kyc-detail", idOrAddress],
  });

  if (!record) return null;

  const detailRecord = detailResponse ? mapKYCRecord(detailResponse) : record;

  const items = [
    {
      key: "info",
      label: "KYC Info",
      children: <KYCInfoTab record={detailRecord} />,
    },
    {
      key: "portfolio",
      label: "Danh mục",
      children: <PortfolioTab portfolio={detailResponse?.portfolio} />,
    },
    {
      key: "history",
      label: "Lịch sử GD",
      children: <TransactionHistoryTab transactions={detailResponse?.transactions} />,
    },
    {
      key: "actions",
      label: "Thao tác",
      children: <ActionsTab key={`${detailRecord.detailId ?? detailRecord.id}-${detailRecord.level}`} record={detailRecord} />,
    },
  ];

  return (
    <Drawer title={null} placement="right" onClose={onClose} open={!!record} size={width} closable={false} styles={{ body: { padding: 0 } }}>
      <DrawerHeader record={detailRecord} onClose={onClose} />

      <Tabs
        defaultActiveKey="info"
        items={items}
        className="[&_.ant-tabs-nav]:px-6 [&_.ant-tabs-nav]:mb-0 [&_.ant-tabs-tab]:text-xsm! [&_.ant-tabs-tab]:font-semibold! [&_.ant-tabs-tab-btn]:text-text-3!  [&_.ant-tabs-tab:hover_.ant-tabs-tab-btn]:text-bidv-green! [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:text-bidv-green! [&_.ant-tabs-ink-bar]:text-bidv-green!"
      />
    </Drawer>
  );
}
