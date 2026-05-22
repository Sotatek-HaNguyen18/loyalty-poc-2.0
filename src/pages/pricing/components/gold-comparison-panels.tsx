import { formatCompactVnd } from "@/utils";

const SJC_REF = 948500;
const GOLD_DEVIATION_THRESHOLD = 2;

type GoldComparisonPanelsProps = {
  deviation: number;
  goldBuy: number;
};

export const GoldComparisonPanels = ({
  deviation,
  goldBuy,
}: GoldComparisonPanelsProps) => {
  const isDeviationOverThreshold =
    Math.abs(deviation) > GOLD_DEVIATION_THRESHOLD;

  return (
    <div className="mb-6 grid gap-3 md:grid-cols-3">
      <div
        className="rounded-[10px] px-3 py-3 sm:px-4 sm:py-[14px]"
        style={{ background: "var(--primary-50)" }}
      >
        <div className="mb-1 text-[11px] text-text-3">Giá BGT trên sàn</div>
        <div className="font-display text-[18px] font-bold! text-bidv-green sm:text-[20px]">
          {formatCompactVnd(goldBuy)}
        </div>
        <div className="mt-0.5 text-[11px] text-text-3">/ BGT (= 0,01 chỉ)</div>
      </div>

      <div
        className="rounded-[10px] px-3 py-3 sm:px-4 sm:py-[14px]"
        style={{ background: "var(--gold-50)" }}
      >
        <div className="mb-1 text-[11px] text-text-3">Giá SJC tham chiếu</div>
        <div className="font-display text-[18px] font-bold! text-bidv-gold sm:text-[20px]">
          {formatCompactVnd(SJC_REF)}
        </div>
        <div className="mt-0.5 text-[11px] text-text-3">
          Cập nhật 09:00 hôm nay
        </div>
      </div>

      <div
        className="rounded-[10px] px-3 py-3 sm:px-4 sm:py-[14px]"
        style={{
          background: isDeviationOverThreshold
            ? "var(--warn-bg)"
            : "var(--success-bg)",
        }}
      >
        <div className="mb-1 text-[11px] text-text-3">Độ lệch so với SJC</div>
        <div
          className="font-display text-[18px] font-bold! sm:text-[20px]"
          style={{
            color: isDeviationOverThreshold ? "var(--warn)" : "var(--success)",
          }}
        >
          {deviation >= 0 ? "+" : ""}
          {deviation.toFixed(2)}%
        </div>
        <div
          className="mt-0.5 text-[11px] font-semibold"
          style={{
            color: isDeviationOverThreshold ? "var(--warn)" : "var(--success)",
          }}
        >
          {isDeviationOverThreshold
            ? "⚠ Vượt ngưỡng 2% — cần phê duyệt"
            : "✓ Trong ngưỡng cho phép"}
        </div>
      </div>
    </div>
  );
};
