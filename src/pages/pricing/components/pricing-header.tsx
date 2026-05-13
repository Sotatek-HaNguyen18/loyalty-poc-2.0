import { Button } from "antd";
import { Check, RefreshCw } from "lucide-react";

export const PricingHeader = () => {
  return (
    <div className="mb-4 flex flex-col gap-4 sm:mb-5 xl:flex-row xl:items-end xl:justify-between">
      <div className="min-w-0">
        <h1 className="mb-1! font-display text-xl font-bold! tracking-[-0.01em] text-text sm:text-[22px]">
          Cập nhật giá tham chiếu
        </h1>
        <p className="mb-0! text-[12.5px] leading-snug text-text-3 sm:text-[13px]">
          Module C · Cập nhật giá Oracle on-chain cho BGT / BRT / BCT
        </p>
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-2 xl:justify-end">
        <div className="inline-flex min-w-0 flex-wrap items-center gap-1.5 text-xs text-text-3 sm:flex-nowrap">
          <Check className="h-3.5 w-3.5 shrink-0 text-success" />
          <span className="min-w-0 leading-snug">
            Cập nhật lần cuối: <strong>13/05/2026 09:00</strong>
          </span>
        </div>
        <Button
          className="w-full text-[13px]! sm:w-auto sm:shrink-0"
          htmlType="button"
          icon={<RefreshCw size={14} />}
          onClick={() => console.log("sync oracle")}
        >
          <span className="font-medium">Đồng bộ Oracle</span>
        </Button>
      </div>
    </div>
  );
};
