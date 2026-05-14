import { Button, Select, Tag } from "antd";
import { Wallet } from "lucide-react";

interface Props {
  record: any;
}

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
  return (
    <div className="p-6 space-y-3">
      <ActionCard title="Nâng cấp cấp KYC" description={`Hiện tại: ${record.level}. Nâng cấp để tăng hạn mức giao dịch.`}>
        <div className="flex gap-2">
          <Select
            defaultValue="Level 1"
            className="flex-1"
            options={[
              { label: "Level 1 - Cơ bản", value: "level1" },
              { label: "Level 2 - Đẩy đủ", value: "level2" },
              { label: "VIP Nội bộ", value: "vip" },
            ]}
          />

          <Button className="flex-1 border-0! text-xs h-9.5! bg-bidv-green! text-white!">Cập nhật KYC</Button>
        </div>
      </ActionCard>

      <ActionCard title="Đóng băng / Mở băng ví on-chain" description="Đóng băng ví sẽ ngăn tất cả giao dịch on-chain của nhà đầu tư này.">
        <Button icon={<Wallet size={12} />} className="flex items-center gap-2 font-medium! text-xs! bg-danger! text-white! border-0! px-2.5! py-1.25! h-6.75!">
          Đóng băng ví (on-chain)
        </Button>
      </ActionCard>

      <ActionCard title="Quản lý whitelist tài sản" description="Cho phép hoặc chặn nhà đầu tư này giao dịch các tài sản đặc biệt.">
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
              `}>
              {tag} {idx < 2 ? "✓" : "+"}
            </Tag>
          ))}
        </div>
      </ActionCard>
    </div>
  );
}
