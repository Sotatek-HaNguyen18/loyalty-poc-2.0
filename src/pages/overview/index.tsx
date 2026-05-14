import { Button } from "antd";
import { Download, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { KindChip } from "@/components/shared/kind-chip";
import { StatCard } from "@/components/shared/stat-card";
import { paths } from "@/routes/paths";
import { allocationRows, recentActivities } from "./constants";

export const OverviewPage = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="font-display text-[22px] font-bold! mb-1! tracking-[-0.01em] text-text">
            Tổng quan
          </h1>
          <p className="mt-1 text-[13px] mb-0! text-text-3">
            BIDV RWA Admin Console · PoC v2.0 · Cập nhật{" "}
            {new Date().toLocaleString("vi-VN", {
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-2">
          <Button
            className="w-full text-[13px]! sm:w-auto sm:shrink-0"
            htmlType="button"
            icon={<Download size={14} />}
          >
            <span className="font-medium">Xuất báo cáo</span>
          </Button>
          <Button
            className="w-full text-[13px]! sm:w-auto sm:shrink-0"
            htmlType="button"
            icon={<Plus size={14} />}
            onClick={() => navigate(paths.listedProperty)}
            type="primary"
          >
            <span className="font-medium">Tạo niêm yết mới</span>
          </Button>
        </div>
      </div>

      <div className="mb-4 rounded-r-md border-l-[3px] border-bidv-gold bg-linear-to-r from-primary-50 to-transparent px-3.5 py-2 text-xs text-text-2">
        <strong>PoC v2.0</strong> · Pass này tập trung vào{" "}
        <strong>Module E (Niêm yết tài sản)</strong> và{" "}
        <strong>Module B (Đối soát batch)</strong>. Các module khác sẽ được phát
        triển ở pass tiếp theo.
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Tài sản đang niêm yết"
          subClassName="font-medium text-success"
          subValue="+2 trong 7 ngày"
          value="14"
        />
        <StatCard
          label="Tổng giá trị on-chain"
          subValue="VND · Quy đổi theo giá Oracle"
          value="412,8 tỷ"
        />
        <StatCard
          label="Giao dịch hôm nay"
          subClassName="font-medium text-success"
          subValue="+18% so với hôm qua"
          value="149"
        />
        <StatCard
          label="Batch chưa đối soát"
          subClassName="font-medium text-danger"
          subValue="1 lệch với Core"
          value="3"
          variant="warning"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <article className="overflow-hidden rounded-lg border border-app-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-soft px-4 py-4 sm:px-5">
            <h2 className="text-sm! font-semibold! text-text! mb-0!">
              Phân bổ theo loại tài sản
            </h2>
            <span className="inline-flex items-center rounded-sm border border-border-strong px-2 py-0.5 text-[11px] font-semibold text-text-2">
              7 ngày qua
            </span>
          </div>

          <div className="p-4 sm:p-5">
            {allocationRows.map((row) => (
              <div className="mb-3.5 last:mb-0" key={row.kind}>
                <div className="mb-1.5 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <KindChip label={row.kind} type={row.type} />

                  <div className="grid w-full grid-cols-[1fr_auto] gap-x-3 gap-y-1 sm:ml-auto sm:flex sm:w-auto sm:items-center sm:gap-x-3">
                    <span className="font-mono text-xs text-text-3 sm:whitespace-nowrap">
                      {row.count} tài sản
                    </span>
                    <span className="text-right font-mono text-sm font-semibold text-text sm:min-w-20">
                      {row.value} tr
                    </span>
                    <span className="col-span-2 text-right text-sm font-semibold text-text sm:col-span-1 sm:min-w-[50px]">
                      {row.share}%
                    </span>
                  </div>
                </div>

                <div className="h-1.5 overflow-hidden rounded-sm bg-app-border">
                  <div
                    className="h-full rounded-sm"
                    style={{
                      backgroundColor: row.color,
                      width: `${row.share}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="overflow-hidden rounded-lg border border-app-border bg-card">
          <div className="border-b border-border-soft px-5 py-4">
            <h2 className="text-sm! font-semibold! text-text! mb-0!">
              Hoạt động gần đây
            </h2>
          </div>

          <div className="py-2">
            {recentActivities.map((activity, index) => (
              <div
                className="px-5 py-2.5"
                key={`${activity.who}-${activity.what}-${activity.time}`}
                style={{
                  borderBottom:
                    index < recentActivities.length - 1
                      ? "1px solid var(--border-soft)"
                      : "none",
                }}
              >
                <div className="mb-0.5 text-[12.5px] text-text">
                  <strong>{activity.who}</strong> · {activity.what}
                </div>
                <div className="font-mono text-[11.5px] text-text-3">
                  {activity.target}
                </div>
                <div className="mt-0.5 text-[11px] text-text-disabled">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};
