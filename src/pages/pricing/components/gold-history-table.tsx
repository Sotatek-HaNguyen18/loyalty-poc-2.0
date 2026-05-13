import { StatusBadge } from "@/components/shared";

import { GOLD_HISTORY } from "../constants";
import { formatVnd, getDeviation } from "../utils";

export const GoldHistoryTable = () => {
  return (
    <>
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-3">
        Lịch sử cập nhật giá BGT
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse text-left">
          <thead>
            <tr className="border-b border-app-border bg-bg-alt text-[11.5px] font-semibold uppercase tracking-[0.04em] text-text-3">
              <th className="px-4 py-3">Thời điểm</th>
              <th className="px-4 py-3 text-right">Giá BGT</th>
              <th className="px-4 py-3 text-right">SJC tham chiếu</th>
              <th className="px-4 py-3 text-right">Độ lệch</th>
              <th className="px-4 py-3">Người cập nhật</th>
              <th className="px-4 py-3">Nguồn</th>
            </tr>
          </thead>
          <tbody>
            {GOLD_HISTORY.map((row) => {
              const rowDeviation = getDeviation(row.price, row.sjc);
              const isAlert = Math.abs(rowDeviation) > 2;

              return (
                <tr
                  className="border-b border-border-soft transition-colors hover:bg-bg-alt last:border-b-0"
                  key={`${row.time}-${row.by}`}
                >
                  <td className="px-4 py-3 text-[12.5px]">{row.time}</td>
                  <td className="px-4 py-3 text-right text-[12.5px]">
                    {formatVnd(row.price)} đ
                  </td>
                  <td className="px-4 py-3 text-right text-[12.5px] text-bidv-gold">
                    {formatVnd(row.sjc)} đ
                  </td>
                  <td className="px-4 py-3 text-right text-[12px] font-semibold">
                    <span className={isAlert ? "text-warn" : "text-success"}>
                      {rowDeviation >= 0 ? "+" : ""}
                      {rowDeviation.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11.5px] text-text-2">
                    {row.by}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      value={row.onChain ? "On-chain" : "Off-chain"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
