import { RE_PROJECTS_PRICE } from "../constants";
import { ReUpdateRow } from "./re-update-row";

export const ReTab = () => {
  return (
    <>
      <p className="mb-4 text-[13px] text-text-3">
        Giá BRT cập nhật theo chu kỳ (tháng/quý) dựa trên báo cáo định giá độc
        lập từ Savills, CBRE, JLL. Không cần gọi Oracle on-chain.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left">
          <thead>
            <tr className="border-b border-app-border bg-bg-alt text-[11.5px] font-semibold uppercase tracking-[0.04em] text-text-3">
              <th className="px-4 py-3">Dự án</th>
              <th className="px-4 py-3">Loại</th>
              <th className="px-4 py-3 text-right">Giá hiện tại</th>
              <th className="px-4 py-3">Cập nhật gần nhất</th>
              <th className="px-4 py-3">Chu kỳ</th>
              <th className="px-4 py-3">Tiếp theo</th>
              <th className="px-4 py-3 text-right" />
            </tr>
          </thead>
          <tbody>
            {RE_PROJECTS_PRICE.map((project) => (
              <ReUpdateRow key={project.id} project={project} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
