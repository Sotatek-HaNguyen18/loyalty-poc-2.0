import { CC_PROJECTS_PRICE } from "../constants";
import { CarbonMarketRefs } from "./carbon-market-refs";
import { CarbonUpdateRow } from "./carbon-update-row";

export const CarbonTab = () => {
  return (
    <>
      <p className="mb-4 text-[13px] text-text-3">
        Giá BCT tham chiếu theo thị trường tín chỉ carbon tự nguyện quốc tế
        (XPANSIV/ACX). Cập nhật hàng tuần — đẩy on-chain qua Oracle contract.
      </p>

      <CarbonMarketRefs />

      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-3">
        Giá từng dự án trên sàn
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1020px] border-collapse text-left">
          <thead>
            <tr className="border-b border-app-border bg-bg-alt text-[11.5px] font-semibold uppercase tracking-[0.04em] text-text-3">
              <th className="px-4 py-3">Dự án</th>
              <th className="px-4 py-3">Registry</th>
              <th className="px-4 py-3 text-right">Giá BCT</th>
              <th className="px-4 py-3 text-right">Tham chiếu TT</th>
              <th className="px-4 py-3 text-right">Độ lệch</th>
              <th className="px-4 py-3">Cập nhật gần nhất</th>
              <th className="px-4 py-3 text-right" />
            </tr>
          </thead>
          <tbody>
            {CC_PROJECTS_PRICE.map((project) => (
              <CarbonUpdateRow key={project.id} project={project} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
