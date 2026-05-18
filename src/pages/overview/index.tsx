import { useMemo } from "react";
import { Button } from "antd";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { KindChip } from "@/components/shared/kind-chip";
import { StatCard } from "@/components/shared/stat-card";
import { paths } from "@/routes/paths";
import { getOverviewSummary, type OverviewSummary } from "@/services";

const numberFormatter = new Intl.NumberFormat("vi-VN");
const decimalFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 1,
});
const millionFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 0,
});

const categoryColorMap: Record<
  OverviewSummary["allocation"][number]["categoryType"],
  string
> = {
  gold: "#735c00",
  real_estate: "#1e5cb3",
  carbon: "#1c7c4c",
};

const toSignedPercentText = (value: number | null) => {
  if (value == null) return "— so với hôm qua";
  if (value > 0) return `+${decimalFormatter.format(value)}% so với hôm qua`;
  return `${decimalFormatter.format(value)}% so với hôm qua`;
};

export const OverviewPage = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryFn: getOverviewSummary,
    queryKey: ["overview-summary"],
    staleTime: 60_000,
  });

  const listedAssetsValue = data?.cards.listedAssets.value ?? 0;
  const listedAssetsDelta = data?.cards.listedAssets.deltaLast7Days ?? 0;
  const totalOnChainValueVnd = data?.cards.totalOnChainValueVnd ?? 0;
  const txTodayValue = data?.cards.transactionsToday.value ?? 0;
  const txDelta = data?.cards.transactionsToday.deltaPercentVsYesterday ?? null;
  const unreconciledBatches = data?.cards.unreconciledBatches ?? 0;

  const totalOnChainInBillion = totalOnChainValueVnd / 1_000_000_000;

  const allocationRows = useMemo(
    () =>
      (data?.allocation ?? []).map((row) => ({
        color: categoryColorMap[row.categoryType],
        count: row.count,
        kind: row.categoryName,
        share: row.sharePercent,
        type: row.categoryType,
        valueInMillions: row.valueVnd / 1_000_000,
      })),
    [data?.allocation],
  );

  const txSubClassName =
    txDelta == null
      ? undefined
      : txDelta >= 0
        ? "font-medium text-success"
        : "font-medium text-danger";

  return (
    <section className="mx-auto">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="font-display text-[22px] font-bold! mb-1! tracking-[-0.01em] text-text">
            Tổng quan
          </h1>
          <p className="mt-1 text-xsm mb-0! text-text-3">
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
            className="w-full text-xsm! sm:w-auto sm:shrink-0"
            htmlType="button"
            icon={<Plus size={14} />}
            onClick={() => navigate(paths.listedProperty)}
            type="primary"
          >
            <span className="font-medium">Tạo niêm yết mới</span>
          </Button>
        </div>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Tài sản đang niêm yết"
          subClassName="font-medium text-success"
          subValue={`+${numberFormatter.format(listedAssetsDelta)} trong 7 ngày`}
          value={numberFormatter.format(listedAssetsValue)}
        />
        <StatCard
          label="Tổng giá trị on-chain"
          subValue="VND · Quy đổi theo giá Oracle"
          value={`${decimalFormatter.format(totalOnChainInBillion)} tỷ`}
        />
        <StatCard
          label="Giao dịch hôm nay"
          subClassName={txSubClassName}
          subValue={toSignedPercentText(txDelta)}
          value={numberFormatter.format(txTodayValue)}
        />
        <StatCard
          label="Batch chưa đối soát"
          subClassName="font-medium text-danger"
          subValue=""
          value={numberFormatter.format(unreconciledBatches)}
          variant="warning"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-1">
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
                      {millionFormatter.format(row.valueInMillions)} tr
                    </span>
                    <span className="col-span-2 text-right text-sm font-semibold text-text sm:col-span-1 sm:min-w-[50px]">
                      {decimalFormatter.format(row.share)}%
                    </span>
                  </div>
                </div>

                <div className="h-1.5 overflow-hidden rounded-sm bg-app-border">
                  <div
                    className="h-full rounded-sm"
                    style={{
                      backgroundColor: row.color,
                      width: `${Math.min(Math.max(row.share, 0), 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};
