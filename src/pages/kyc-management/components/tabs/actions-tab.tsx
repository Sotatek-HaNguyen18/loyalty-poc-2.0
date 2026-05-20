import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App, Button, Select, Tag } from "antd";
import { Wallet } from "lucide-react";
import { useState } from "react";

import type { KYCRecord } from "../../types";

import { freezeWallet, unfreezeWallet, updateKYCLevel, type KYCLevel } from "@/services";

interface Props {
  record: KYCRecord;
}

const kycLevelOptions: Array<{ label: string; value: KYCLevel }> = [
  { label: "Level 1 - Cơ bản", value: "LEVEL_1" },
  { label: "Level 2 - Đầy đủ", value: "LEVEL_2" },
  { label: "VIP Nội bộ", value: "VIP" },
];

const getKYCLevelValue = (level: KYCRecord["level"]): KYCLevel => {
  if (level === "Level 2") return "LEVEL_2";
  if (level === "VIP") return "VIP";

  return "LEVEL_1";
};

function ActionCard({
  title,
  description,
  children,
}: React.PropsWithChildren<{
  title: string;
  description: string;
}>) {
  return (
    <div className="bg-app-bg p-4.5 rounded-[10px]">
      <h4 className="text-sm font-semibold! text-text mb-1!">{title}</h4>

      <p className="text-xs text-text-3 mb-4">{description}</p>

      {children}
    </div>
  );
}

export function ActionsTab({ record }: Props) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const isFrozen = record.status === "Frozen";
  const isPending = record.status === "Đang xử lý";
  const idOrAddress = record.detailId ?? record.id;
  const currentKYCLevel = getKYCLevelValue(record.level);
  const [selectedKYCLevel, setSelectedKYCLevel] = useState<KYCLevel>(currentKYCLevel);

  const invalidateKYCQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["kyc-list"] }),
      queryClient.invalidateQueries({ queryKey: ["kyc-list-stats"] }),
      queryClient.invalidateQueries({ queryKey: ["kyc-detail", idOrAddress] }),
    ]);
  };

  const walletMutation = useMutation({
    mutationFn: () => (isFrozen ? unfreezeWallet(idOrAddress) : freezeWallet(idOrAddress)),
    onSuccess: async () => {
      await invalidateKYCQueries();
      message.success(isFrozen ? "Đã mở băng ví." : "Đã đóng băng ví.");
    },
    onError: () => {
      message.error("Không thể cập nhật trạng thái ví.");
    },
  });

  const kycLevelMutation = useMutation({
    mutationFn: () => updateKYCLevel(idOrAddress, { kycLevel: selectedKYCLevel }),
    onSuccess: async () => {
      await invalidateKYCQueries();
      message.success("Đã cập nhật cấp KYC.");
    },
    onError: () => {
      message.error("Không thể cập nhật cấp KYC.");
    },
  });

  return (
    <div className="p-6 space-y-3">
      <ActionCard
        title="Nâng cấp cấp KYC"
        description={`Hiện tại: ${record.level}. Nâng cấp để tăng hạn mức giao dịch.`}
      >
        <div className="flex gap-2">
          <Select
            className="flex-1"
            options={kycLevelOptions}
            value={selectedKYCLevel}
            onChange={setSelectedKYCLevel}
          />

          <Button
            className="flex-1 border-0! text-xs h-9.5! bg-bidv-green! text-white! disabled:opacity-55! disabled:cursor-not-allowed!"
            disabled={selectedKYCLevel === currentKYCLevel || isPending}
            loading={kycLevelMutation.isPending}
            onClick={() => kycLevelMutation.mutate()}
          >
            Cập nhật KYC
          </Button>
        </div>
      </ActionCard>

      <ActionCard
        title="Đóng băng / Mở băng ví on-chain"
        description="Đóng băng ví sẽ ngăn tất cả giao dịch on-chain của nhà đầu tư này."
      >
        <Button
          icon={<Wallet size={12} />}
          loading={walletMutation.isPending}
          onClick={() => walletMutation.mutate()}
          disabled={isPending}
          className={`flex items-center gap-2 font-medium! text-xs! text-white! border-0! px-2.5! py-1.25! h-6.75! ${
            isFrozen ? "bg-bidv-green!" : "bg-danger!"
          } disabled:opacity-55! disabled:cursor-not-allowed!`}
        >
          {isFrozen ? "Mở băng ví (on-chain)" : "Đóng băng ví (on-chain)"}
        </Button>
      </ActionCard>

      <ActionCard
        title="Quản lý whitelist tài sản"
        description="Cho phép hoặc chặn nhà đầu tư này giao dịch các tài sản đặc biệt."
      >
        <div className="flex flex-wrap gap-2">
          {["BGT-202605", "BRT-0PK3-T15", "BCT-CP-2026", "RE-2026-001"].map((tag, idx) => (
            <Tag
              key={tag}
              closable={false}
              className={`
                flex items-center gap-1.5
                px-2.5! py-1! rounded-full!
                text-[11.5px]! font-semibold!
                ${idx < 2 ? "bg-primary-50! text-bidv-green! border-bidv-green!" : "bg-bg-alt! text-text-3! border-border-strong!"}
              `}
            >
              {tag} {idx < 2 ? "✓" : "+"}
            </Tag>
          ))}
        </div>
      </ActionCard>
    </div>
  );
}
